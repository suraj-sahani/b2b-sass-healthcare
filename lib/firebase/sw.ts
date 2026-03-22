export async function registerFirebaseServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === "undefined") return null;

  if (!("serviceWorker" in navigator)) {
    console.warn("Service workers not supported in this browser.");
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register("/api/sw", {
      scope: "/",
    });

    return registration;
  } catch (err) {
    console.error("Firebase SW registration failed:", err);
    return null;
  }
}
