import React from 'react';
import './Hangman.css';

const DifficultySelector = ({ setDifficulty }) => {
  return (
    <div className="hangman-container">
      <h2>Select Difficulty</h2>
      <button
        className="difficulty-button"
        onClick={() => setDifficulty('easy')}
      >
        Easy (10 attempts)
      </button>
      <button
        className="difficulty-button"
        onClick={() => setDifficulty('medium')}
      >
        Medium (7 attempts)
      </button>
      <button
        className="difficulty-button"
        onClick={() => setDifficulty('hard')}
      >
        Hard (5 attempts)
      </button>
      <p className="attempt-info">Choose a difficulty level to start playing</p>
    </div>
  );
};

export default DifficultySelector;
