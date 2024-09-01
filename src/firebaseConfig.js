// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
//import { auth } from '../firebaseConfig';


const firebaseConfig = {
  apiKey: "AIzaSyCb1zvDF53O3fusKObC3v9XFjCml3DP4R0",
  authDomain: "ahorcadoaleix.firebaseapp.com",
  projectId: "ahorcadoaleix",
  storageBucket: "ahorcadoaleix.appspot.com",
  messagingSenderId: "941994939582",
  appId: "1:941994939582:web:8519ac7faf0ae81bd77aef",
  measurementId: "G-TQXTJF9EM1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

