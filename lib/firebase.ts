import { initializeApp } from "firebase/app";
import {
  getFirestore,
  // connectFirestoreEmulator
} from "firebase/firestore";
// import { getAuth, connectAuthEmulator } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAA6s7dCv9tZBDhLOgLAhTqTBPq6-pWhJ0",
  authDomain: "chat-f724b.firebaseapp.com",
  projectId: "chat-f724b",
  storageBucket: "chat-f724b.firebasestorage.app",
  messagingSenderId: "101760907115",
  appId: "1:101760907115:web:0154e7c169e27ed9a7fe2e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
// connectFirestoreEmulator(db, "192.168.1.4", 8080);

// export const auth = getAuth();
// connectAuthEmulator(auth, "http://192.168.1.4:9099", { disableWarnings: true });
