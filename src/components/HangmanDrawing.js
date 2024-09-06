import React, { useEffect, useRef } from 'react';

const HangmanDrawing = ({ wrongGuesses, maxWrongGuesses }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Función para saber cuántas partes del ahorcado dibujar en función de los errores cometidos
    const getPartsToDraw = () => {
      const totalParts = 10;
      const partFactor = (wrongGuesses / maxWrongGuesses) * totalParts;
      return Math.ceil(partFactor);
    };

    // Limpiar el canvas antes de redibujar
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 3;
    const partsToDraw = getPartsToDraw();

    // Dibujar las partes del ahorcado según el número de partes a mostrar
    if (partsToDraw > 0) {
      ctx.beginPath();
      ctx.moveTo(10, 250);
      ctx.lineTo(150, 250); // Base
      ctx.stroke();
    }
    if (partsToDraw > 1) {
      ctx.beginPath();
      ctx.moveTo(50, 250);
      ctx.lineTo(50, 20); // Poste
      ctx.stroke();
    }
    if (partsToDraw > 2) {
      ctx.beginPath();
      ctx.moveTo(50, 20);
      ctx.lineTo(100, 20); // Viga
      ctx.stroke();
    }
    if (partsToDraw > 3) {
      ctx.beginPath();
      ctx.moveTo(100, 20);
      ctx.lineTo(100, 40); // Cuerda
      ctx.stroke();
    }
    if (partsToDraw > 4) {
      ctx.beginPath();
      ctx.arc(100, 50, 10, 0, Math.PI * 2); // Cabeza
      ctx.stroke();
    }
    if (partsToDraw > 5) {
      ctx.beginPath();
      ctx.moveTo(100, 60);
      ctx.lineTo(100, 120); // Cuerpo
      ctx.stroke();
    }
    if (partsToDraw > 6) {
      ctx.beginPath();
      ctx.moveTo(100, 70);
      ctx.lineTo(80, 100); // Brazo izquierdo
      ctx.stroke();
    }
    if (partsToDraw > 7) {
      ctx.beginPath();
      ctx.moveTo(100, 70);
      ctx.lineTo(120, 100); // Brazo derecho
      ctx.stroke();
    }
    if (partsToDraw > 8) {
      ctx.beginPath();
      ctx.moveTo(100, 120);
      ctx.lineTo(80, 160); // Pierna izquierda
      ctx.stroke();
    }
    if (partsToDraw > 9) {
      ctx.beginPath();
      ctx.moveTo(100, 120);
      ctx.lineTo(120, 160); // Pierna derecha
      ctx.stroke();
    }
  }, [wrongGuesses, maxWrongGuesses]);

  return <canvas ref={canvasRef} width="150" height="270"></canvas>; // Reducir el tamaño del canvas
};

export default HangmanDrawing;
