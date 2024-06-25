import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import '../Profile.css';
import placeholderAvatar from '../assets/abstract-user-flat-4.svg';

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [avatar, setAvatar] = useState(null);

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('avatar', avatar);

    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('http://localhost:5000/api/users/me', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': token
        }
      });
      console.log('Profile updated:', response.data);
      setUser({ ...user, avatar: response.data.avatar });
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      {user ? (
        <div className="profile-details">
          <img
            src={user.avatar ? `http://localhost:5000${user.avatar}` : placeholderAvatar}
            alt="Avatar"
            className="profile-avatar"
          />
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Joined:</strong> {user.created_at}</p>
          <p><strong>Preferences:</strong> {user.preferences || 'No preferences set'}</p>
          <form onSubmit={handleSubmit}>
            <label>
              Avatar:
              <input type="file" onChange={handleAvatarChange} />
            </label>
            <button type="submit">Update Avatar</button>
          </form>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
