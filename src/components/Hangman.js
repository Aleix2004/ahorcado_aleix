// src/components/Hangman.js

import React, { useState } from 'react';
import Word from './Word';
import Alphabet from './Alphabet';
import './Hangman.css';

const Hangman = () => {
  const [guesses, setGuesses] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const word = "REACT";
  

  const handleGuess = (letter) => {
    if (word.includes(letter)) {
      setGuesses([...guesses, letter]);
    } else {
      setWrongGuesses(wrongGuesses + 1);
    }
  };

  return (
    <div className="hangman">
      <h1>Hangman Game</h1>
      <Word word={word} guesses={guesses} />
      <Alphabet onGuess={handleGuess} />
      <p>Wrong Guesses: {wrongGuesses}</p>
    </div>
  );
};

export default Hangman;
