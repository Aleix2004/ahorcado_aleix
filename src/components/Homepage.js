// src/components/HomePage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const goToHangman = () => {
    navigate('/hangman');
  };

  return (
    <div>
      <h1>Welcome to the HomePage</h1>
      <button onClick={goToHangman}>Play Hangman</button> {/* Botón para acceder al juego */}
    </div>
  );
};

export default HomePage;
