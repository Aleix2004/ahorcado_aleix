// src/components/HangmanDrawing.js

import React from 'react';

const HangmanDrawing = ({ wrongGuesses, maxWrongGuesses }) => {
  const stages = [
    <line x1="10" y1="140" x2="100" y2="140" />,
    <line x1="50" y1="140" x2="50" y2="20" />,
    <line x1="50" y1="20" x2="100" y2="20" />,
    <line x1="100" y1="20" x2="100" y2="40" />,
    <circle cx="100" cy="50" r="10" />,
    <line x1="100" y1="60" x2="100" y2="90" />,
    <line x1="100" y1="70" x2="90" y2="80" />,
    <line x1="100" y1="70" x2="110" y2="80" />,
    <line x1="100" y1="90" x2="90" y2="110" />,
    <line x1="100" y1="90" x2="110" y2="110" />
  ];

  // Calcula cuántas partes del muñeco deben mostrarse según el número de intentos fallidos
  const drawSteps = Math.floor((wrongGuesses / maxWrongGuesses) * stages.length);

  return (
    <svg height="150" width="120" style={{ marginLeft: '20px' }}>
      {stages.slice(0, drawSteps)}
    </svg>
  );
};

export default HangmanDrawing;
