import { NextResponse } from "next/server";

export async function GET() {
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  const sw = `
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp(${JSON.stringify(config)});

const messaging = firebase.messaging();

// Handles background push messages (app not in focus)
messaging.onBackgroundMessage((payload) => {
  const { title = "Notification", body = "", image } = payload.notification ?? {};
  
  self.registration.showNotification(title, {
    body,
    icon: image ?? "/favicon.ico",
    data: {
      url: payload.data?.url ?? "/",
      ...payload.data,
    },
    // Actions shown on the notification itself (desktop)
    actions: [
      { action: "open", title: "Open app" },
      { action: "dismiss", title: "Dismiss" },
    ],
  });
});

// Handle notification click — focus or open the app
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "dismiss") return;

  const url = event.notification.data?.url ?? "/";
  
  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        const existing = clientList.find((c) => c.url.includes(url));
        if (existing && "focus" in existing) return existing.focus();
        return clients.openWindow(url);
      })
  );
});
`;

  return new NextResponse(sw, {
    headers: {
      "Content-Type": "application/javascript",
      // Must NOT be cached — SW updates need to be picked up immediately
      "Cache-Control": "no-cache, no-store, must-revalidate",
      // SW scope — covers the entire app
      "Service-Worker-Allowed": "/",
    },
  });
}
