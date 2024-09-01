// src/components/HomePage.js

import React from 'react';
import { useAuth } from '../context/AuthContext';
import Hangman from './Hangman'; // Importa tu componente de juego del ahorcado

const HomePage = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      <h1>Bienvenido, {currentUser?.username || "usuario"}!</h1>
      <Hangman /> {/* Renderiza tu juego del ahorcado aquí */}
    </div>
  );
};

export default HomePage;
