import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import '../Profile.css';
import placeholderAvatar from '../assets/abstract-user-flat-4.svg';

const Profile = () => {
  const { updateAvatar } = useContext(AuthContext);
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
        const response = await axios.get('https://whisperwind1.netlify.app/api/users/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log("Profile data fetched:", response.data);
        setProfileData(response.data);
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
      const response = await axios.post('https://whisperwind1.netlify.app/api/users/me', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      updateAvatar(response.data.avatar);
      setLoading(false);
      console.log("Profile updated:", response.data);
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
          src={profileData.avatar ? `https://whisperwind1.netlify.app${profileData.avatar}` : placeholderAvatar}
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
