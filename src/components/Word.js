// src/components/Word.js

import React from 'react';

const Word = ({ word, guesses }) => {
  return (
    <div className="word">
      {word.split("").map((letter, index) => (
        <span 
          key={index} 
          className="letter"
          style={{ margin: '0 5px' }} // Agrega un margen a cada letra
        >
          {guesses.includes(letter) ? letter : "_"}
        </span>
      ))}
    </div>
  );
};

export default Word;
