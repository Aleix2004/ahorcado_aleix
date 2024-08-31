// src/components/Alphabet.js

import React from 'react';

const Alphabet = ({ onGuess, guesses }) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="alphabet">
      {letters.map(letter => (
        <button
          key={letter}
          onClick={() => onGuess(letter)}
          disabled={guesses.includes(letter)} // Deshabilita el botón si la letra ya ha sido adivinada
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default Alphabet;
