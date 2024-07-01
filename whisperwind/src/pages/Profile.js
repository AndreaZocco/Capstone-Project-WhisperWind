import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../Profile.css';
import placeholderAvatar from '../assets/abstract-user-flat-4.svg';

const Profile = () => {
  const { updateAvatar } = useContext(AuthContext); // Rimosse le variabili non utilizzate
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }
      console.log("Fetching profile data with token:", token);
      try {
        const response = await fetch('/api/users/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("Profile data fetched:", data);
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!avatar) return;

    const formData = new FormData();
    formData.append('avatar', avatar);

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }
    try {
      setLoading(true);
      const response = await fetch('/api/users/me', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      updateAvatar(data.avatar);
      setLoading(false);
      console.log("Profile updated:", data);
    } catch (error) {
      console.error('Error updating profile:', error);
      setLoading(false);
    }
  };

  if (!profileData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-details">
        <img
          src={profileData.avatar ? profileData.avatar : placeholderAvatar} // Assicurati che l'URL dell'avatar sia corretto
          alt="Avatar"
          className="profile-avatar"
        />
        <p><strong>Username:</strong> {profileData.username}</p>
        <p><strong>Email:</strong> {profileData.email}</p>
        <p><strong>Joined:</strong> {new Date(profileData.created_at).toLocaleDateString()}</p>
        <p><strong>Preferences:</strong> {profileData.preferences || 'No preferences set'}</p>
        <form onSubmit={handleSubmit}>
          <label>
            Avatar:
            <input type="file" onChange={handleAvatarChange} />
          </label>
          <button type="submit" disabled={loading}>{loading ? 'Updating...' : 'Update Avatar'}</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
