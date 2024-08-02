// src/components/Protected.js

import React from 'react';
import './Protected.css'; // Importar el archivo CSS

const Protected = () => {
  return (
    <div className="protectedContainer">
      <h2>Protected Page</h2>
      <p>Welcome to the protected page. You are logged in!</p>
    </div>
  );
};

export default Protected;
