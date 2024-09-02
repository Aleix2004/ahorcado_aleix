// src/components/HomePage.js

import React, { useState } from 'react';
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
