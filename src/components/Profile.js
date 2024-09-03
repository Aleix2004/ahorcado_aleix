// src/components/Profile.js

const handleLogout = () => {
    // Realizar logout usando Firebase
    auth.signOut();
  
    // Eliminar la sesión del localStorage
    localStorage.removeItem('isLoggedIn');
  
    // Redirigir al usuario al login
    navigate('/login');
  };
  