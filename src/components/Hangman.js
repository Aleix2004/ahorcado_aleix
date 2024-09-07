import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Word from './Word';
import Alphabet from './Alphabet';
import HangmanDrawing from './HangmanDrawing';
import DifficultySelector from './DifficultySelector';
import { db, auth } from '../firebaseConfig'; // Importa Firebase Firestore y Auth
import { doc, getDoc, setDoc } from 'firebase/firestore'; // Importa funciones de Firestore
import { onAuthStateChanged } from 'firebase/auth'; // Importa onAuthStateChanged para escuchar la autenticación
import './Hangman.css';

const Hangman = () => {
  const [difficulty, setDifficulty] = useState('');
  const [word, setWord] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [maxWrongGuesses, setMaxWrongGuesses] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [timerDuration, setTimerDuration] = useState(90);
  const [timeLeft, setTimeLeft] = useState(0);

  // Guarda el estado del juego en Firestore
  const saveGameState = async (userId, state) => {
    try {
      const gameRef = doc(db, 'games', userId);
      await setDoc(gameRef, state);
      console.log("Estado del juego guardado:", state);
    } catch (error) {
      console.error("Error al guardar el estado del juego:", error);
    }
  };

  // Cargar el estado del juego desde Firestore
  const loadGameState = async (userId) => {
    try {
      const gameRef = doc(db, 'games', userId);
      const gameSnapshot = await getDoc(gameRef);

      if (gameSnapshot.exists()) {
        const savedState = gameSnapshot.data();
        setDifficulty(savedState.difficulty);
        setWord(savedState.word);
        setGuesses(savedState.guesses);
        setWrongGuesses(savedState.wrongGuesses);
        setMaxWrongGuesses(savedState.maxWrongGuesses);
        setGameOver(savedState.gameOver);
        setVictory(savedState.victory);
        setTimerEnabled(savedState.timerEnabled);
        setTimerDuration(savedState.timerDuration);
        setTimeLeft(savedState.timeLeft);
        console.log("Estado del juego cargado desde Firestore:", savedState);
      } else {
        console.log("No se encontró un estado guardado.");
      }
    } catch (error) {
      console.error("Error al cargar el estado del juego:", error);
    }
  };

  // Escuchar cambios de autenticación y cargar el estado del juego
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Usuario autenticado:", user.uid);
        loadGameState(user.uid);
      } else {
        console.log("No hay usuario autenticado.");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!difficulty) return;

    switch (difficulty) {
      case 'easy':
        setMaxWrongGuesses(10);
        break;
      case 'medium':
        setMaxWrongGuesses(7);
        break;
      case 'hard':
        setMaxWrongGuesses(5);
        break;
      default:
        setMaxWrongGuesses(7);
    }

    const fetchWord = async () => {
      try {
        const response = await axios.get('https://random-word-api.vercel.app/api?number=1');
        setWord(response.data[0].toUpperCase());
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch word from API');
        setLoading(false);
      }
    };

    fetchWord();
  }, [difficulty]);

  useEffect(() => {
    if (timerEnabled && !gameOver) {
      setTimeLeft(timerDuration);
      const timer = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setGameOver(true);
            clearInterval(timer);
          }
          return time - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timerEnabled, gameOver, timerDuration]);

  const handleGuess = (letter) => {
    if (gameOver) return;
  
    // Definimos remainingLetters antes de los condicionales
    const remainingLetters = word.split('').filter(l => !guesses.includes(l));
  
    if (word.includes(letter)) {
      setGuesses([...guesses, letter]);
  
      if (remainingLetters.length === 1 && remainingLetters[0] === letter) {
        setVictory(true);
        setGameOver(true);
      }
    } else {
      setGuesses([...guesses, letter]);
      setWrongGuesses(wrongGuesses + 1);
  
      if (wrongGuesses + 1 === maxWrongGuesses) {
        setGameOver(true);
      }
    }
  
    // Guardar el estado del juego después de cada cambio
    const userId = auth.currentUser?.uid;
    if (userId) {
      saveGameState(userId, {
        difficulty,
        word,
        guesses: [...guesses, letter],
        wrongGuesses: wrongGuesses + 1,
        maxWrongGuesses,
        gameOver: gameOver || wrongGuesses + 1 === maxWrongGuesses,
        victory: victory || (remainingLetters.length === 1 && remainingLetters[0] === letter),
        timerEnabled,
        timerDuration,
        timeLeft
      });
    }
  };
  

  const resetGame = () => {
    setGuesses([]);
    setWrongGuesses(0);
    setLoading(true);
    setError('');
    setGameOver(false);
    setVictory(false);
    setDifficulty('');

    const fetchWord = async () => {
      try {
        const response = await axios.get('https://random-word-api.vercel.app/api?number=1');
        setWord(response.data[0].toUpperCase());
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch word from API');
        setLoading(false);
      }
    };

    fetchWord();
  };

  if (!difficulty) {
    return (
      <DifficultySelector
        setDifficulty={setDifficulty}
        setTimerEnabled={setTimerEnabled}
        setTimerDuration={setTimerDuration}
      />
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="hangman">
      <h1>Juego del ahorcado</h1>
      <div className="word-and-drawing">
        <Word word={word} guesses={guesses} />
        <HangmanDrawing wrongGuesses={wrongGuesses} maxWrongGuesses={maxWrongGuesses} />
      </div>
      <Alphabet onGuess={handleGuess} guesses={guesses} />
      <p>Wrong Guesses: {wrongGuesses}/{maxWrongGuesses}</p>
      {timerEnabled && (
        <p className="timer-info">
          Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </p>
      )}
      {gameOver && (
        <div className="game-over">
          {victory ? <p>¡Felicidades, ganaste!</p> : <p>¡Perdiste! La palabra era {word}.</p>}
          <button onClick={resetGame}>Jugar de nuevo</button>
        </div>
      )}
    </div>
  );
};

export default Hangman;
