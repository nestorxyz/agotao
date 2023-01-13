import { initializeApp, FirebaseOptions, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

import { env } from "@/env/client.mjs";

class Firebase {
  private static instance: Firebase;
  private app: FirebaseApp;
  private auth: Auth;

  private constructor() {
    const firebaseConfig: FirebaseOptions = {
      apiKey: env.NEXT_PUBLIC_API_KEY,
      authDomain: env.NEXT_PUBLIC_AUTH_DOMAIN,
      projectId: env.NEXT_PUBLIC_PROJECT_ID,
      storageBucket: env.NEXT_PUBLIC_STORAGE_BUCKET,
      messagingSenderId: env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
      appId: env.NEXT_PUBLIC_APP_ID,
      measurementId: env.NEXT_PUBLIC_MEASUREMENT_ID,
    };

    this.app = initializeApp(firebaseConfig);
    this.auth = getAuth(this.app);
  }

  static getInstance(): Firebase {
    if (!Firebase.instance) {
      Firebase.instance = new Firebase();
    }
    return Firebase.instance;
  }

  getApp() {
    return this.app;
  }

  getAuth() {
    return this.auth;
  }
}

export default Firebase;
