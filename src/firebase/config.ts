// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA76y7FS5f8LumtvP0LyIPRwcC_mOJtlxE",
  authDomain: "journal-app-f5adb.firebaseapp.com",
  projectId: "journal-app-f5adb",
  storageBucket: "journal-app-f5adb.firebasestorage.app",
  messagingSenderId: "320842341584",
  appId: "1:320842341584:web:40abe6467d6c92c4ea92d5"
};

//Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
//Funcionalidades de autenticacion
export const FirebaseAuth = getAuth(FirebaseApp);
//Configuracion BD y accesos a la misma
export const FirebaseDB = getFirestore(FirebaseApp);