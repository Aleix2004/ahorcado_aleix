// src/components/DifficultySelector.js

import React from 'react';

const DifficultySelector = ({ setDifficulty }) => {
  return (
    <div className="difficulty-selector">
      <h2>Select Difficulty</h2>
      <button onClick={() => setDifficulty('easy')}>Easy (10 attempts)</button>
      <button onClick={() => setDifficulty('medium')}>Medium (7 attempts)</button>
      <button onClick={() => setDifficulty('hard')}>Hard (5 attempts)</button>
    </div>
  );
};

export default DifficultySelector;
