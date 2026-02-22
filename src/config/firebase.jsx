// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCH_c8lMVIDRe3n0vV6rRmdcNkglvEW9x4",
  authDomain: "job-tracker-e48ea.firebaseapp.com",
  projectId: "job-tracker-e48ea",
  storageBucket: "job-tracker-e48ea.firebasestorage.app",
  messagingSenderId: "551126356879",
  appId: "1:551126356879:web:cc209da6562377ed2ff1fa",
  measurementId: "G-NEZJYQ373T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); //connects all the firebase services to the project
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
