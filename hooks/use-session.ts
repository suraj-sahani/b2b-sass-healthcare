"use client";
import { auth } from "@/lib/firebase/client";
import {
  createSession,
  deleteSession,
  getSession,
} from "@/lib/firebase/session";
import { useAuthStore } from "@/lib/store/use-auth-store";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useEffect } from "react";
import { toast } from "sonner";

export function useSession() {
  const { user, isLoading, isAuthenticated, setUser, setLoading, clearAuth } =
    useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const idToken = await firebaseUser.getIdToken();

        // Need to verify is the session is still valid.
        const session = await getSession();
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

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      // Create a session cookie
      const idToken = await user.getIdToken();

      if (!idToken) return;

      await createSession(idToken);

      toast.success("Login successful!");
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    signInWithGoogle,
  };
}
