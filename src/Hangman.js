// Importación de React y el hook useState desde el módulo 'react'
import React, { useState } from 'react';

// Importación de los componentes Word y Alphabet
import Word from './Word';
import Alphabet from './Alphabet';

// Definición de una constante que almacena un array de palabras posibles para el juego
const words = ['react', 'javascript', 'openai', 'programacion', 'computadora'];

// Definición del componente funcional Hangman
function Hangman() {
  // useState para gestionar la palabra seleccionada, inicializada de manera aleatoria
  const [selectedWord, setSelectedWord] = useState(randomWord());
  
  // useState para gestionar las letras adivinadas por el usuario, inicializado como un array vacío
  const [guessedLetters, setGuessedLetters] = useState([]);
  
  // useState para gestionar los intentos fallidos, inicializado en 0
  const [attempts, setAttempts] = useState(0);
  
  // Número máximo de intentos fallidos permitidos antes de perder el juego
  const maxAttempts = 6;

  // Función para seleccionar una palabra aleatoria del array 'words'
  function randomWord() {
    return words[Math.floor(Math.random() * words.length)];
  }

  // Función para manejar el evento de clic en una letra
  const handleLetterClick = (letter) => {
    // Verifica si la letra ya fue adivinada, para no contarla de nuevo
    if (!guessedLetters.includes(letter)) {
      // Actualiza el estado de las letras adivinadas, añadiendo la nueva letra
      setGuessedLetters(prevGuesses => [...prevGuesses, letter]);

      // Si la letra no está en la palabra seleccionada, incrementa el contador de intentos fallidos
      if (!selectedWord.includes(letter)) {
        setAttempts(prev => prev + 1);
      }
    }
  };

  const resetGame = () => {
    setSelectedWord(randomWord());
    setGuessedLetters([]);
    setAttempts(0);
  };

  // Comprueba si el jugador ha adivinado todas las letras de la palabra
  const hasWon = selectedWord.split('').every(letter => guessedLetters.includes(letter));

  // Comprueba si el jugador ha superado el número máximo de intentos fallidos
  const hasLost = attempts >= maxAttempts;

  // Renderización condicional dependiendo del estado del juego
  return (
    <div>
      {hasWon ? (
        // Si el jugador ha ganado, muestra un mensaje de victoria
        <div>
          <h1>¡Enhorabuena, has ganado!</h1>
          <p>La palabra era: {selectedWord}</p>
          <button onClick={resetGame}>Jugar de nuevo</button>
        </div>
      ) : hasLost ? (
        // Si el jugador ha perdido, muestra un mensaje de derrota
        <div>
          <h1>Game Over</h1>
          <p>La palabra era: {selectedWord}</p>
          <button onClick={resetGame}>Jugar de nuevo</button>
        </div>
      ) : (
        // Si el juego está en curso, muestra los componentes Word, Alphabet y el número de intentos fallidos
        <div>
          <Word word={selectedWord} guessedLetters={guessedLetters} />
          <Alphabet guessedLetters={guessedLetters} onLetterClick={handleLetterClick} />
          <p>Intentos fallidos: {attempts}</p>
        </div>
      )}
    </div>
  );
}

// Exportación del componente Hangman para su uso en otros archivos
export default Hangman;

