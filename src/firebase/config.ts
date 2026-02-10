// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite'
import { getEnvironments } from '../helpers/getEnvironments';

// Your web app's Firebase configuration
// DEV/PROD
// const firebaseConfig = {
//   apiKey: "AIzaSyA76y7FS5f8LumtvP0LyIPRwcC_mOJtlxE",
//   authDomain: "journal-app-f5adb.firebaseapp.com",
//   projectId: "journal-app-f5adb",
//   storageBucket: "journal-app-f5adb.firebasestorage.app",
//   messagingSenderId: "320842341584",
//   appId: "1:320842341584:web:40abe6467d6c92c4ea92d5"
// };

//TESTING
//const firebaseConfig = {
//  apiKey: "AIzaSyBlMTsTlQ3LLNfAqk_4Bo5L0avvY-4GNlM",
//  authDomain: "testing-dc972.firebaseapp.com",
//  projectId: "testing-dc972",
//  storageBucket: "testing-dc972.firebasestorage.app",
//  messagingSenderId: "626266137645",
//  appId: "1:626266137645:web:8f5a6be46c1b789aaac4a4",
//  measurementId: "G-0EZV5STL3B"
//};
/*
const 
  VITE_APIKEY     = 'AIzaSyBlMTsTlQ3LLNfAqk_4Bo5L0avvY-4GNlM',
  VITE_AUTHDOMAIN = 'testing-dc972.firebaseapp.com',
  VITE_PROJECTID  = 'testing-dc972',
  VITE_STORAGEBUCKET ='testing-dc972.firebasestorage.app',
  VITE_MESSAGINGSENDERID= '626266137645',
  VITE_APPID =          '1:626266137645:web:8f5a6be46c1b789aaac4a4',
  VITE_MEASUREMENTID    = 'G-0EZV5STL3B';
*/

const firebaseConfig = {
  apiKey: "AIzaSyA76y7FS5f8LumtvP0LyIPRwcC_mOJtlxE",
  authDomain: "journal-app-f5adb.firebaseapp.com",
  projectId: "journal-app-f5adb",
  storageBucket: "journal-app-f5adb.firebasestorage.app",
  messagingSenderId: "320842341584",
  appId: "1:320842341584:web:40abe6467d6c92c4ea92d5",
  //measurementId: ,
};

console.log(firebaseConfig)

//Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
//Funcionalidades de autenticacion
export const FirebaseAuth = getAuth(FirebaseApp);
//Configuracion BD y accesos a la misma
export const FirebaseDB = getFirestore(FirebaseApp);