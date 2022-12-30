import firebaseAdmin from "firebase-admin";

const firebaseConfig = {
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
};

// Initialize Firebase
let adminApp: firebaseAdmin.app.App;

if (firebaseAdmin.apps.length === 0) {
  adminApp = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(firebaseConfig),
    databaseURL: `https://${process.env.NEXT_PUBLIC_PROJECT_ID}.firebaseio.com`,
  });
} else {
  adminApp = firebaseAdmin.app();
}

export const adminAuth = adminApp.auth();

export type { DecodedIdToken } from "firebase-admin/auth";
