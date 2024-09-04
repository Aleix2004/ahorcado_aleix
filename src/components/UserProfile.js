// src/components/UserProfile.js

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateProfile, updatePassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = () => {
  const { currentUser } = useAuth();
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPhotoURL, setNewPhotoURL] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login', { replace: true });
    }
  }, [currentUser, navigate]);

  const handleUpdateProfile = async () => {
    setError('');
    try {
      await updateProfile(auth.currentUser, {
        displayName: newUsername || currentUser.displayName,
        photoURL: newPhotoURL || currentUser.photoURL,
      });

      const userDocRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userDocRef, {
        username: newUsername || currentUser.displayName,
        photoURL: newPhotoURL || currentUser.photoURL,
      });

      alert('Profile updated successfully!');
    } catch (error) {
      setError('Failed to update profile');
    }
  };

  const handleChangePassword = async () => {
    setError('');
    try {
      await updatePassword(auth.currentUser, newPassword);
      alert('Password changed successfully!');
    } catch (error) {
      setError('Failed to change password');
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      setError('Failed to log out');
    }
  };

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      {error && <p className="error">{error}</p>}
      
      <div className="profile-item">
        <label>Username: </label>
        <input 
          type="text" 
          value={newUsername} 
          onChange={(e) => setNewUsername(e.target.value)} 
          placeholder={currentUser?.displayName || 'Enter new username'} 
        />
      </div>

      <div className="profile-item">
        <label>Profile Picture URL: </label>
        <input 
          type="text" 
          value={newPhotoURL} 
          onChange={(e) => setNewPhotoURL(e.target.value)} 
          placeholder="Enter new photo URL" 
        />
      </div>

      <button onClick={handleUpdateProfile} className="update-btn">Update Profile</button>

      <div className="profile-item">
        <label>New Password: </label>
        <input 
          type="password" 
          value={newPassword} 
          onChange={(e) => setNewPassword(e.target.value)} 
          placeholder="Enter new password" 
        />
      </div>

      <button onClick={handleChangePassword} className="password-btn">Change Password</button>

      <button onClick={handleLogout} className="logout-btn">Log Out</button>
    </div>
  );
};

export default UserProfile;
