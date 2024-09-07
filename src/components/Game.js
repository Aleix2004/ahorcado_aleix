// src/components/Game.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';  // Importar funciones Firestore
import { onAuthStateChanged } from 'firebase/auth';

const Game = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState({
    word: "",
    guessedLetters: [],
    wrongGuesses: 0,
    maxGuesses: 10,
    gameOver: false
  });

  // Función para cargar el estado del juego desde Firestore
  const loadGameState = async (userId) => {
    const gameRef = doc(db, "games", userId);
    const gameSnapshot = await getDoc(gameRef);
    
    if (gameSnapshot.exists()) {
      setGameState(gameSnapshot.data());
    }
  };

  // Función para guardar el estado del juego en Firestore
  const saveGameState = async (userId, state) => {
    const gameRef = doc(db, "games", userId);
    await setDoc(gameRef, state);
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    // Si el usuario no está autenticado, redirigir al login
    if (isLoggedIn !== 'true') {
      navigate('/login');
    }

    // Escuchar cambios de autenticación para cargar el estado del juego cuando el usuario está autenticado
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        loadGameState(user.uid);  // Cargar el estado del juego desde Firestore
      }
    });

    return () => unsubscribe();  // Limpiar el listener al desmontar el componente
  }, [navigate]);

  // Simular que el estado cambia con cada jugada, aquí debes añadir tu lógica
  const handleGuess = (letter) => {
    const updatedGameState = {
      ...gameState,
      guessedLetters: [...gameState.guessedLetters, letter],
      wrongGuesses: gameState.wrongGuesses + 1 // Esto es solo un ejemplo, ajusta según tu lógica de juego
    };

    setGameState(updatedGameState);

    // Guardar el estado del juego en Firestore después de cada cambio
    const userId = auth.currentUser.uid;
    saveGameState(userId, updatedGameState);
  };

  return (
    <div>
      <h1>Bienvenido al Juego del Ahorcado</h1>
      {/* Mostrar el estado del juego */}
      <p>Palabra: {gameState.word}</p>
      <p>Letras adivinadas: {gameState.guessedLetters.join(", ")}</p>
      <p>Errores: {gameState.wrongGuesses} / {gameState.maxGuesses}</p>
      
      {/* Botones de ejemplo para adivinar letras */}
      <button onClick={() => handleGuess("A")}>Adivinar A</button>
      <button onClick={() => handleGuess("B")}>Adivinar B</button>

      {/* Resto del contenido */}
    </div>
  );
};

export default Game;
