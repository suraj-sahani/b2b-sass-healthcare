"use client";

import { useEffect, useState } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { getFirebaseMessaging } from "@/lib/firebase/client";
import { registerFirebaseServiceWorker } from "@/lib/firebase/sw";
import { useNotificationStore } from "@/lib/store/use-notification-store";
import { useAuthStore } from "@/lib/store/use-auth-store";
import { toast } from "sonner";

export function useNotifications() {
  const {
    permission,
    fcmToken,
    notifications,
    unreadCount,
    setPermission,
    setFcmToken,
    addNotification,
    markAsRead,
    markAllAsRead,
    loading,
    setLoading,
    error,
    setError,
  } = useNotificationStore();
  const { isAuthenticated } = useAuthStore();

  // useEffect(() => {
  //   if (!isAuthenticated) return;
  //   if ("Notification" in window) {
  //     setPermission(Notification.permission);
  //   }
  // }, [isAuthenticated, setPermission]);

  // Listen for foreground messages
  useEffect(() => {
    if (!isAuthenticated || !fcmToken) return;
    let unsubscribe: (() => void) | undefined;

    if ("Notification" in window) {
      setPermission(Notification.permission);
    }

    (async () => {
      try {
        const messaging = await getFirebaseMessaging();
        if (!messaging) return;

        // Register SW first — FCM needs it to deliver background messages
        const swRegistration = await registerFirebaseServiceWorker();
        if (!swRegistration) {
          console.error("[FCM] Service worker registration failed");
          return false;
        }

        await navigator.serviceWorker.ready;

        const currentToken = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
          serviceWorkerRegistration: swRegistration,
        });

        console.dir({ currentToken, fcmToken });

        if (currentToken && currentToken !== fcmToken) {
          console.log("[FCM] Token rotated — updating...");

          // Delete old token from Firestore
          await fetch("/api/notifications/unsubscribe", {
            method: "POST",
            credentials: "same-origin",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: fcmToken }),
          });

          // Save new token
          setFcmToken(currentToken);
          await fetch("/api/notifications/subscribe", {
            method: "POST",
            credentials: "same-origin",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: currentToken }),
          });
        }

        unsubscribe = onMessage(messaging, (payload) => {
          addNotification({
            title: payload.notification?.title ?? "New notification",
            body: payload.notification?.body ?? "",
            data: payload.data,
          });
        });
      } catch (error) {
        console.error("[FCM] Error listening for messages:", error);
      } finally {
        // setLoading(false);
      }
    })();
  }, [isAuthenticated, fcmToken, addNotification, setPermission]);

  const requestPermission = async (): Promise<boolean> => {
    try {
      setLoading(true);
      if (!("Notification" in window)) return false;

      const result = await Notification.requestPermission();
      setPermission(result);
      if (result !== "granted") {
        console.warn("[FCM] Permission not granted:", result);
        return false;
      }

      // Register SW first — FCM needs it to deliver background messages
      const swRegistration = await registerFirebaseServiceWorker();
      if (!swRegistration) {
        console.error("[FCM] Service worker registration failed");
        return false;
      }

      await navigator.serviceWorker.ready;

      const messaging = await getFirebaseMessaging();
      console.dir({ messaging });
      if (!messaging) {
        console.error("[FCM] Firebase messaging not supported");
        return false;
      }

      const fcmToken = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
        serviceWorkerRegistration: swRegistration,
      });

      if (!fcmToken) {
        console.error(
          "[FCM] getToken returned empty — VAPID key mismatch or SW not activated yet",
        );
        return false;
      }

      setFcmToken(fcmToken);

      await fetch("/api/notifications/subscribe", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: fcmToken }),
      });

      setLoading(false);
      return true;
    } catch (err) {
      console.error("Failed to get FCM token:", err);
    }

    return false;
  };

  // Trigger a local foreground notification directly (no FCM round-trip)
  const showLocalNotification = (
    title: string,
    body: string,
    data?: Record<string, string>,
  ) => {
    if (Notification.permission !== "granted") return;

    // Add to Zustand store (in-app)
    addNotification({ title, body, data });

    // Also show as a native browser notification
    navigator.serviceWorker.ready.then((reg) => {
      console.dir({
        message: `[FCM] Showing local notification`,
        title,
        body,
        data,
      });
      reg.showNotification(title, {
        body,
        icon: "/favicon.ico",
        data: { url: data?.url ?? "/" },
      });
    });
  };

  return {
    permission,
    fcmToken,
    notifications,
    unreadCount,
    requestPermission,
    showLocalNotification,
    markAsRead,
    markAllAsRead,
    loading,
    error,
    setLoading,
    setError,
  };
}
