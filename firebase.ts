// firebase.ts
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCo3vh5I9eM5OjbTsH0NIW0R450-r4dzgs",
  authDomain: "traffic-density-detection.firebaseapp.com",
  projectId: "traffic-density-detection",
  storageBucket: "traffic-density-detection.firebasestorage.app",
  messagingSenderId: "53777835338",
  appId: "1:53777835338:web:2f97fa6e138fc24d180db3",
  measurementId: "G-9PYK728FJ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// ✅ Export Firestore DB
export const db = getFirestore(app)
