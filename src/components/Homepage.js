import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Hangman from './Hangman';
import UserProfile from './UserProfile';
import './HomePage.css';

const HomePage = () => {
  const { currentUser } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  useEffect(() => {
    // Crear el fondo difuminado cuando se muestra el menú de perfil
    if (showProfileMenu) {
      const blurBackground = document.createElement('div');
      blurBackground.className = 'blur-background';
      document.body.appendChild(blurBackground);

      // Cierra el menú de perfil cuando se hace clic en el fondo difuminado
      blurBackground.addEventListener('click', () => {
        setShowProfileMenu(false);
      });

      // Limpiar el efecto cuando el componente se desmonte o el estado cambie
      return () => {
        blurBackground.removeEventListener('click', () => setShowProfileMenu(false));
        document.body.removeChild(blurBackground);
      };
    }
  }, [showProfileMenu]);

  return (
    <div className="container">
      <header className="header">
        <h1>Bienvenido, {currentUser?.displayName || "usuario"}!</h1> {/* Verificamos que el displayName esté presente */}
        <div className="profile-container">
          {currentUser?.photoURL && (
            <img
              src={currentUser.photoURL}
              alt="Profile"
              className="profile-picture"
              onClick={toggleProfileMenu}
            />
          )}
          {showProfileMenu && (
            <div className="profile-menu">
              <UserProfile />
            </div>
          )}
        </div>
      </header>
      <main className="main-content">
        <div className="hangman-container">
          <Hangman />
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2024 Ahorcado Game</p>
      </footer>
    </div>
  );
};

export default HomePage;
