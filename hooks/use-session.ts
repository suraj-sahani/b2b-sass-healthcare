"use client";
import { auth } from "@/lib/firebase/client";
import { getSession } from "@/lib/firebase/session";
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

        console.dir({ idToken, firebaseUser });

        // Need to verify is the session is still valid.
        const session = await getSession();
        // If it isn't, logout the user
        if (!session.success) {
          console.log("No session found, logging out user");
          // await signOut(auth);
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
    // signIn,
    // signUp,
    // signInWithGoogle,
    // signOut,
  };
}
