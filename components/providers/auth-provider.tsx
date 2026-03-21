"use client";
import { useSession } from "@/hooks/use-session";
import { type ReactNode } from "react";

export default function AuthProvider({ children }: { children: ReactNode }) {
  useSession();
  return <>{children}</>;
}
