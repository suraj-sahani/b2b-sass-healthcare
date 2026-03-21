import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  timestamp: number;
  read: boolean;
  data?: Record<string, string>;
}

interface NotificationState {
  permission: NotificationPermission | "unknown";
  fcmToken: string | null;
  notifications: AppNotification[];
  unreadCount: number;
  setPermission: (permission: NotificationPermission) => void;
  setFcmToken: (token: string | null) => void;
  addNotification: (
    notification: Omit<AppNotification, "id" | "timestamp" | "read">,
  ) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  loading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useNotificationStore = create<NotificationState>()(
  devtools(
    persist(
      (set, get) => ({
        permission: "unknown",
        fcmToken: null,
        notifications: [],
        unreadCount: 0,

        setPermission: (permission) => set({ permission }),

        setFcmToken: (fcmToken) => set({ fcmToken }),

        addNotification: (notification) => {
          const newNotification: AppNotification = {
            ...notification,
            id: crypto.randomUUID(),
            timestamp: Date.now(),
            read: false,
          };
          set((state) => ({
            notifications: [newNotification, ...state.notifications].slice(
              0,
              50,
            ), // keep last 50
            unreadCount: state.unreadCount + 1,
          }));
        },

        markAsRead: (id) =>
          set((state) => ({
            notifications: state.notifications.map((n) =>
              n.id === id ? { ...n, read: true } : n,
            ),
            unreadCount: Math.max(0, state.unreadCount - 1),
          })),

        markAllAsRead: () =>
          set((state) => ({
            notifications: state.notifications.map((n) => ({
              ...n,
              read: true,
            })),
            unreadCount: 0,
          })),

        clearNotifications: () => set({ notifications: [], unreadCount: 0 }),
        loading: false,
        error: null,
        setLoading: (loading) => set({ loading }),
        setError: (error) => set({ error }),
      }),
      { name: "notification-store" },
    ),
    { name: "notification-store" },
  ),
);
