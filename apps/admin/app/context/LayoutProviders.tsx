"use client";

import { AuthProvider } from "../utils/firebaseProviders";
import AuthChildProvider from "./AuthChildProvider";
import FirebaseAppProvider from "./FirebaseAppProvider";
import { getFirebaseAuth } from "../config/firebase";

export default function LayoutProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = getFirebaseAuth();

  return (
    <FirebaseAppProvider>
      <AuthProvider sdk={auth}>
        <AuthChildProvider>{children}</AuthChildProvider>
      </AuthProvider>
    </FirebaseAppProvider>
  );
}
