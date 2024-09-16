import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateProfile, updatePassword } from 'firebase/auth';
import { auth, db, storage } from '../firebaseConfig'; // Importa 'storage'
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Para Firebase Storage
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = () => {
  const { currentUser } = useAuth();
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPhotoURL, setNewPhotoURL] = useState('');
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false); // Estado para la carga de archivos
  const [selectedFile, setSelectedFile] = useState(null); // Estado para el archivo seleccionado
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login', { replace: true });
    }
  }, [currentUser, navigate]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadPhoto = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const storageRef = ref(storage, `profilePictures/${currentUser.uid}`);
    setUploading(true);

    try {
      // Sube el archivo a Firebase Storage
      await uploadBytes(storageRef, selectedFile);
      
      // Obtén la URL de descarga del archivo subido
      const downloadURL = await getDownloadURL(storageRef);
      setNewPhotoURL(downloadURL); // Establece la URL de la foto subida
      setUploading(false);
      return downloadURL;
    } catch (error) {
      setUploading(false);
      setError("Failed to upload photo");
    }
  };

  const handleUpdateProfile = async () => {
    setError('');
    let photoURL = newPhotoURL || currentUser.photoURL;
    
    // Si se ha seleccionado un nuevo archivo, sube la imagen y usa la URL generada
    if (selectedFile) {
      photoURL = await uploadPhoto();
    }

    try {
      await updateProfile(auth.currentUser, {
        displayName: newUsername || currentUser.displayName,
        photoURL: photoURL,
      });

      const userDocRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userDocRef, {
        username: newUsername || currentUser.displayName,
        photoURL: photoURL,
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
        <label>Profile Picture: </label>
        <input 
          type="file" 
          onChange={handleFileChange} 
          accept="image/*" // Acepta solo imágenes
        />
      </div>

      <button onClick={handleUpdateProfile} className="update-btn" disabled={uploading}>
        {uploading ? 'Uploading...' : 'Update Profile'}
      </button>

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



