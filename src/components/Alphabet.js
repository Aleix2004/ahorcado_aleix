// src/components/Alphabet.js

import React from 'react';

const Alphabet = ({ onGuess }) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="alphabet">
      {letters.map(letter => (
        <button key={letter} onClick={() => onGuess(letter)}>
          {letter}
        </button>
      ))}
    </div>
  );
};

export default Alphabet;
