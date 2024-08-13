// src/components/Word.js

import React from 'react';

const Word = ({ word, guesses }) => {
  return (
    <div className="word">
      {word.split("").map((letter, index) => (
        <span key={index} className="letter">
          {guesses.includes(letter) ? letter : "_"}
        </span>
      ))}
    </div>
  );
};

export default Word;
