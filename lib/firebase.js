import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  serverTimestamp,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  getDocs,
  where
} from "firebase/firestore";

let db;

if (!getApps().length) {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
  };
  initializeApp(firebaseConfig);
}

db = getFirestore();

export { db, serverTimestamp, collection, addDoc, query, orderBy, limit, getDocs, where };
