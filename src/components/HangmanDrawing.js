// src/components/HangmanDrawing.js

import React from 'react';

const HangmanDrawing = ({ wrongGuesses, maxWrongGuesses }) => {
  const stages = [
    <line key="base" x1="10" y1="140" x2="100" y2="140" />,
    <line key="pole" x1="50" y1="140" x2="50" y2="20" />,
    <line key="beam" x1="50" y1="20" x2="100" y2="20" />,
    <line key="rope" x1="100" y1="20" x2="100" y2="40" />,
    <circle key="head" cx="100" cy="50" r="10" />,
    <line key="body" x1="100" y1="60" x2="100" y2="90" />,
    <line key="left-arm" x1="100" y1="70" x2="90" y2="80" />,
    <line key="right-arm" x1="100" y1="70" x2="110" y2="80" />,
    <line key="left-leg" x1="100" y1="90" x2="90" y2="110" />,
    <line key="right-leg" x1="100" y1="90" x2="110" y2="110" />
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
