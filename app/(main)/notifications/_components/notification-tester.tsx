"use client";

import { Button } from "@/components/ui/button";
import { useNotifications } from "@/hooks/use-notification";
import { Activity, useEffect, useState } from "react";
import NotificationPermissionBadge from "./notification-permissions-badge";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

const DEMO_NOTIFICATIONS = [
  {
    title: "New message",
    body: "You have a new message from Alex.",
    data: { url: "/messages" },
  },
  {
    title: "Deployment complete",
    body: "Production deployment finished successfully.",
    data: { url: "/deployments" },
  },
  {
    title: "Weekly summary",
    body: "Your weekly report is ready to view.",
    data: { url: "/reports" },
  },
];

export default function NotificationTester() {
  const {
    permission,
    fcmToken,
    notifications,
    unreadCount,
    requestPermission,
    showLocalNotification,
    markAsRead,
    markAllAsRead,
    isLoading,
  } = useNotifications();

  const [requesting, setRequesting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRequestPermission = async () => {
    setRequesting(true);
    setError(null);
    try {
      const granted = await requestPermission();
      if (!granted)
        setError("Permission denied or service worker failed to register.");
    } catch (err) {
      setError("Something went wrong requesting permission.");
      console.error(err);
    } finally {
      setRequesting(false);
    }
  };

  const handleSendTest = (n: (typeof DEMO_NOTIFICATIONS)[number]) => {
    showLocalNotification(n.title, n.body, n.data);
  };

  return (
    <main className="container">
      <h1>Push notifications</h1>

      {/* Permission status */}
      <section style={{ marginTop: "1.5rem" }}>
        <Activity mode={isLoading ? "visible" : "hidden"}>
          <div className="flex items-center gap-2">
            Loading
            <Spinner />
          </div>
        </Activity>

        <Activity mode={!isLoading ? "visible" : "hidden"}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <NotificationPermissionBadge permission={permission} />
            {permission !== "granted" && (
              <Button onClick={handleRequestPermission} disabled={requesting}>
                {requesting ? "Requesting..." : "Enable notifications"}
              </Button>
            )}
          </div>

          {error && <p className="mt-4 font-bold text-red-600">{error}</p>}

          <Activity
            mode={permission === "granted" && fcmToken ? "visible" : "hidden"}
          >
            <p className="text-xs mt-2 break-all">FCM token: {fcmToken}</p>
          </Activity>

          <Activity
            mode={permission === "granted" && !fcmToken ? "visible" : "hidden"}
          >
            <p className="mt-2 text-red-600 font-bold">
              FCM Token not found. Sending notifications will not do anything.
            </p>
          </Activity>
        </Activity>
      </section>

      {/* Fire test notifications */}
      <Activity
        mode={permission === "granted" && !isLoading ? "visible" : "hidden"}
      >
        <section style={{ marginTop: "2rem" }}>
          <h2 className="font-semibold mb-2">Send a test notification</h2>
          <p className="text-xs mb-4">
            These fire instantly in the foreground. To test background delivery,
            switch to another tab then click.
          </p>
          <div className="flex flex-col gap-2 max-w-xl">
            {DEMO_NOTIFICATIONS.map((n) => (
              <Button
                key={n.title}
                onClick={() => handleSendTest(n)}
                className="text-left"
              >
                <span className="font-semibold block">{n.title}</span>
                <span className="text-xs">{n.body}</span>
              </Button>
            ))}
          </div>
        </section>
      </Activity>

      <Activity mode={notifications.length > 0 ? "visible" : "hidden"}>
        <section className="mt-5">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold text-md">
              Inbox
              <Activity mode={unreadCount > 0 ? "visible" : "hidden"}>
                <span className="text-xs border px-2 py-1 bg-slate-100 ml-4 rounded-md">
                  {unreadCount} new
                </span>
              </Activity>
            </h2>

            <Activity mode={unreadCount > 0 ? "visible" : "hidden"}>
              <Button
                variant={"outline"}
                onClick={markAllAsRead}
                className="text-xs"
              >
                Mark all read
              </Button>
            </Activity>
          </div>

          <div className="flex flex-col gap-6">
            {notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => markAsRead(n.id)}
                className={cn(
                  "p-2 rounded-lg bg-stone-100 border-2 cursor-pointer",
                  {
                    "border-green-300": !n.read,
                  },
                )}
              >
                <div className="flex justify-between items-baseline">
                  <span
                    style={{ fontWeight: n.read ? 400 : 500, fontSize: 14 }}
                  >
                    {n.title}
                  </span>
                  <span className="text-xs">
                    {new Date(n.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-xs mt-1">{n.body}</p>
              </div>
            ))}
          </div>
        </section>
      </Activity>
    </main>
  );
}
