import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';

const Game = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState({
    word: "",
    guessedLetters: [],
    wrongGuesses: 0,
    maxGuesses: 10,
    gameOver: false,
    victory: false
  });
  const [loading, setLoading] = useState(true);

  // Función para cargar el estado del juego desde Firestore
  const loadGameState = async (userId) => {
    const gameRef = doc(db, "games", userId);
    const gameSnapshot = await getDoc(gameRef);

    if (gameSnapshot.exists()) {
      setGameState(gameSnapshot.data());
    } else {
      // Si no existe un estado guardado, obtener una nueva palabra
      await fetchNewWord();
    }

    setLoading(false);  // Marcamos que terminó de cargar
  };

  // Función para guardar el estado del juego en Firestore
  const saveGameState = async (userId, state) => {
    try {
      const gameRef = doc(db, 'games', userId);
      await setDoc(gameRef, state);
      console.log("Estado del juego guardado:", state);
    } catch (error) {
      console.error("Error al guardar el estado del juego:", error);
    }
  };
  

  // Función para obtener una nueva palabra de la API
  const fetchNewWord = async () => {
    try {
      const response = await axios.get('https://random-word-api.vercel.app/api?number=1');
      setGameState((prevState) => ({
        ...prevState,
        word: response.data[0].toUpperCase(),
      }));
    } catch (error) {
      console.error("Error fetching word: ", error);
    }
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

  // Función que maneja cuando el usuario hace una jugada
  const handleGuess = (letter) => {
    if (gameState.gameOver) return; // No hacer nada si el juego ya terminó

    const updatedGameState = {
      ...gameState,
      guessedLetters: [...gameState.guessedLetters, letter],
      wrongGuesses: gameState.word.includes(letter) ? gameState.wrongGuesses : gameState.wrongGuesses + 1
    };

    // Comprobar si el juego ha terminado
    const isVictory = updatedGameState.word.split("").every((char) => updatedGameState.guessedLetters.includes(char));
    const isGameOver = updatedGameState.wrongGuesses >= gameState.maxGuesses;

    setGameState({
      ...updatedGameState,
      gameOver: isGameOver || isVictory,
      victory: isVictory
    });

    if (!isGameOver && !isVictory) {  // Solo guardar si el juego sigue en progreso
      const userId = auth.currentUser.uid;
      saveGameState(userId, updatedGameState);
    }
  };

  // Función para reiniciar el juego (obtener nueva palabra y resetear estado)
  const resetGame = async () => {
    await fetchNewWord();  // Obtener una nueva palabra
    setGameState({
      word: "",
      guessedLetters: [],
      wrongGuesses: 0,
      maxGuesses: 10,
      gameOver: false,
      victory: false
    });
  };

  if (loading) {
    return <div>Loading...</div>;  // Mostrar mientras carga el estado del juego
  }

  return (
    <div>
      <h1>Bienvenido al Juego del Ahorcado</h1>
      {/* Mostrar el estado del juego */}
      <p>Palabra: {gameState.word}</p>
      <p>Letras adivinadas: {gameState.guessedLetters.join(", ")}</p>
      <p>Errores: {gameState.wrongGuesses} / {gameState.maxGuesses}</p>
      
      {/* Botones de ejemplo para adivinar letras */}
      {!gameState.gameOver && (
        <>
          <button onClick={() => handleGuess("A")}>Adivinar A</button>
          <button onClick={() => handleGuess("B")}>Adivinar B</button>
        </>
      )}

      {/* Mostrar mensaje de victoria o derrota */}
      {gameState.gameOver && (
        <div>
          {gameState.victory ? <p>¡Felicidades, ganaste!</p> : <p>¡Perdiste! La palabra era {gameState.word}.</p>}
          <button onClick={resetGame}>Jugar de nuevo</button>  {/* Al presionar, reinicia el juego */}
        </div>
      )}
    </div>
  );
};

export default Game;
