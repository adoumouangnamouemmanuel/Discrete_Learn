// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnTutTMbIerEk4I79lugmXCOsBmbj__oY",
  authDomain: "discretelearn.firebaseapp.com",
  projectId: "discretelearn",
  storageBucket: "discretelearn.firebasestorage.app",
  messagingSenderId: "723623371120",
  appId: "1:723623371120:web:20a6a505a9b3d1dbedafb5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

// Get Auth instance
export const auth = getAuth(app);
export const firestore = getFirestore(app);
