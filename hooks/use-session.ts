"use client";
import { auth } from "@/lib/firebase/client";
import { deleteSession, getSession } from "@/lib/firebase/session";
import { useAuthStore } from "@/lib/store/use-auth-store";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";

export function useSession() {
  const { user, isLoading, isAuthenticated, setUser, setLoading, clearAuth } =
    useAuthStore();

  useEffect(() => {
    // Sync Firebase auth state → Zustand + session cookie
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const idToken = await firebaseUser.getIdToken();

        // Need to verify is the session is still valid.
        const session = await getSession();
        // If it isn't, logout the user
        if (!session.success) {
          await deleteSession();
        }

        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          emailVerified: firebaseUser.emailVerified,
        });
      } else {
        clearAuth();
      }
    });

    return () => unsubscribe();
  }, [setUser, clearAuth]);

  return {
    user,
    isLoading,
    isAuthenticated,
  };
}
