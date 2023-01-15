import { initializeApp, FirebaseOptions, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

class Firebase {
  private static instance: Firebase;
  private app: FirebaseApp;
  private auth: Auth;

  private constructor() {
    const firebaseConfig: FirebaseOptions = {
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
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
