// Setup the firebase admin setup.
import { credential } from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

//Generate Random id for the firebase.
const randomId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

const app = initializeApp(
  {
    credential: credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
    }),
  },
  randomId(),
);

export const dbAdmin = getFirestore(app);

export default app;
