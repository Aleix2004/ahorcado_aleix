import React, { useRef, useEffect } from 'react';

const HangmanDrawing = ({ wrongGuesses }) => {
  const canvasRef = useRef(null);

  // Función que dibuja el muñeco del ahorcado en función de los errores
  const drawHangman = (ctx, wrongGuesses) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Limpiar el canvas

    // Dibuja partes según la cantidad de errores
    if (wrongGuesses > 0) {
      // Base
      ctx.beginPath();
      ctx.moveTo(10, 250);
      ctx.lineTo(150, 250);
      ctx.stroke();
    }
    if (wrongGuesses > 1) {
      // Poste
      ctx.beginPath();
      ctx.moveTo(50, 250);
      ctx.lineTo(50, 20);
      ctx.stroke();
    }
    if (wrongGuesses > 2) {
      // Viga
      ctx.beginPath();
      ctx.moveTo(50, 20);
      ctx.lineTo(100, 20);
      ctx.stroke();
    }
    if (wrongGuesses > 3) {
      // Cuerda
      ctx.beginPath();
      ctx.moveTo(100, 20);
      ctx.lineTo(100, 40);
      ctx.stroke();
    }
    if (wrongGuesses > 4) {
      // Cabeza
      ctx.beginPath();
      ctx.arc(100, 60, 10, 0, Math.PI * 2);
      ctx.stroke();
    }
    if (wrongGuesses > 5) {
      // Cuerpo
      ctx.beginPath();
      ctx.moveTo(100, 70);
      ctx.lineTo(100, 120);
      ctx.stroke();
    }
    if (wrongGuesses > 6) {
      // Brazo izquierdo
      ctx.beginPath();
      ctx.moveTo(100, 80);
      ctx.lineTo(80, 100);
      ctx.stroke();
    }
    if (wrongGuesses > 7) {
      // Brazo derecho
      ctx.beginPath();
      ctx.moveTo(100, 80);
      ctx.lineTo(120, 100);
      ctx.stroke();
    }
    if (wrongGuesses > 8) {
      // Pierna izquierda
      ctx.beginPath();
      ctx.moveTo(100, 120);
      ctx.lineTo(80, 160);
      ctx.stroke();
    }
    if (wrongGuesses > 9) {
      // Pierna derecha
      ctx.beginPath();
      ctx.moveTo(100, 120);
      ctx.lineTo(120, 160);
      ctx.stroke();
    }
  };

  // Hook useEffect para dibujar cada vez que el número de errores cambie
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    drawHangman(ctx, wrongGuesses);
  }, [wrongGuesses]); // El efecto se dispara cada vez que cambian los errores

  return <canvas ref={canvasRef} width="200" height="300" />;
};

export default HangmanDrawing;
