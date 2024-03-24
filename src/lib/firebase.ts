import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_KCYiZkP7hxHOZJxZ906TAwn47v8yWqs",
  authDomain: "eonshift-562d1.firebaseapp.com",
  projectId: "eonshift-562d1",
  storageBucket: "eonshift-562d1.appspot.com",
  messagingSenderId: "511989834545",
  appId: "1:511989834545:web:b4e66e3e9f380f77344610",
  measurementId: "G-CE280PTTNQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
