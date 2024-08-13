// src/Word.js

import React from 'react';

function Word({ word, guessedLetters }) {
  const displayWord = word.split('').map(letter => (
    guessedLetters.includes(letter) ? letter : '_'
  )).join(' ');

  return <div>{displayWord}</div>;
}

export default Word;
