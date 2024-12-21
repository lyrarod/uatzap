import { initializeApp } from "firebase/app";
import {
  getFirestore,
  //  connectFirestoreEmulator
} from "firebase/firestore";
// import { getAuth, connectAuthEmulator } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
// connectFirestoreEmulator(db, "192.168.1.4", 8080);

// export const auth = getAuth();
// connectAuthEmulator(auth, "http://192.168.1.4:9099", { disableWarnings: true });
