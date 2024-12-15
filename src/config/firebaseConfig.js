// src/config/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAqY8XgMILpw1uqB54j8M1NzA0StemurgE",
  authDomain: "finalpit-bbf1d.firebaseapp.com",
  projectId: "finalpit-bbf1d",
  storageBucket: "finalpit-bbf1d.firebasestorage.app",
  messagingSenderId: "152639999827",
  appId: "1:152639999827:web:635e5c157c6053d4649ba6",
  measurementId: "G-6GKV8CS890"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase Auth
export const auth = getAuth(app);

export const db = getFirestore(app);

