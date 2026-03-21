"use client";
import { useNotifications } from "@/hooks/use-notification";
import { useSession } from "@/hooks/use-session";
import { type ReactNode } from "react";

export default function AuthProvider({ children }: { children: ReactNode }) {
  useSession();
  useNotifications();
  return <>{children}</>;
}
