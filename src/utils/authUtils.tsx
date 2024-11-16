// authUtils.ts
import { auth } from "@/firebase/firebaseConfig"; // Import your Firebase auth instance
import { onAuthStateChanged } from "firebase/auth";

export const isAuth = (): Promise<{
  isLoggedIn: boolean;
  user: { name: string; avatarUrl: string } | null;
}> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        resolve({
          isLoggedIn: true,
          user: {
            name: firebaseUser.displayName || "User",
            avatarUrl: firebaseUser.photoURL || "",
          },
        });
      } else {
        resolve({ isLoggedIn: false, user: null });
      }
      unsubscribe(); // Unsubscribe immediately after fetching the state
    });
  });
};
