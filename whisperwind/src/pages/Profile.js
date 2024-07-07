import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import '../Profile.css';
import placeholderAvatar from '../assets/abstract-user-flat-4.svg';

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:5000/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    if (!user) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [user, setUser]);

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
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Profile updated:', response.data);
      setUser(response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      {user ? (
        <div className="profile-details">
          <img
            src={user.avatar || placeholderAvatar}
            alt="Avatar"
            className="profile-avatar"
          />
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Joined:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
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
