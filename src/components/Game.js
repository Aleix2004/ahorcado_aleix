// src/components/Game.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Game = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    // Si el usuario no está autenticado, redirigir al login
    if (isLoggedIn !== 'true') {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      {/* Contenido del juego aquí */}
      <h1>Bienvenido al Juego del Ahorcado</h1>
      {/* Resto del contenido */}
    </div>
  );
};

export default Game;
