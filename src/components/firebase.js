// src/firebase.js

// Importa las funciones necesarias desde el SDK de Firebase
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCb1zvDF53O3fusKObC3v9XFjCml3DP4R0",
  authDomain: "ahorcadoaleix.firebaseapp.com",
  projectId: "ahorcadoaleix",
  storageBucket: "ahorcadoaleix.appspot.com",
  messagingSenderId: "941994939582",
  appId: "1:941994939582:web:8519ac7faf0ae81bd77aef",
  measurementId: "G-TQXTJF9EM1"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa y exporta Auth
const auth = getAuth(app);

// Exporta auth, signInWithEmailAndPassword y createUserWithEmailAndPassword
export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword };
