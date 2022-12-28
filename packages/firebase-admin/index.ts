import firebaseAdmin from "firebase-admin";

const firebaseConfig = {
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
};

// Initialize Firebase
export const adminApp = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebaseConfig),
  databaseURL: `https://${process.env.NEXT_PUBLIC_PROJECT_ID}.firebaseio.com`,
});

export const adminAuth = adminApp.auth();

export type { DecodedIdToken } from "firebase-admin/auth";
