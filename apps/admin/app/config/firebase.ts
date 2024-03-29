"use client";

// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
import { Auth, getAuth, GoogleAuthProvider } from "firebase/auth";
import { firebaseConfig } from "../firebase.config";
// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

type FirebaseInstance =
  // | Analytics
  // | Database
  // | Firestore
  // | FirebasePerformance
  // | FirebaseStorage
  // | Functions
  // | RemoteConfig
  FirebaseApp | Auth;

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app);
// Auth emulator - DEVELOPMENT ONLY
// REMOVE BEFORE PRODUCTION
// connectAuthEmulator(auth, "http://127.0.0.1:9099");

const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("profile");
googleProvider.addScope("email");

function getFirebaseInstance<Sdk extends FirebaseInstance>(
  sdk: Sdk,
  name: string,
) {
  if (!sdk) {
    throw new Error(`Firebase ${name} is not initialized.`);
  }
  return sdk;
}

export const getFirebaseApp = () =>
  getFirebaseInstance<FirebaseApp>(app, "App");
export const getFirebaseAuth = () => getFirebaseInstance<Auth>(auth, "Auth");

export { googleProvider };
