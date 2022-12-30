import { signInWithRedirect } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

import Firebase from "@/shared/lib/firebase";

export const signInWithGoogle = () => {
  const auth = Firebase.getInstance().getAuth();
  const provider = new GoogleAuthProvider();

  signInWithRedirect(auth, provider);
};

export const signOut = async () => {
  const auth = Firebase.getInstance().getAuth();

  await auth.signOut();
};
