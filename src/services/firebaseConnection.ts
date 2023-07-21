// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY as string,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN as string,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID as string,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET as string,
  messagingSenderId: process.env
    .NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID as string,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID as string,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
