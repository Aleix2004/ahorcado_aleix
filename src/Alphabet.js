// src/Alphabet.js

import React from 'react';

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

function Alphabet({ guessedLetters, onLetterClick }) {
  return (
    <div>
      {alphabet.map(letter => (
        <button
          key={letter}
          onClick={() => onLetterClick(letter)}
          disabled={guessedLetters.includes(letter)}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}

export default Alphabet;
