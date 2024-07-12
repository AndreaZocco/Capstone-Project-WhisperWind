import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import '../CSS/Register.css';

const preferencesOptions = [
  'Relaxing Waves', 'Gentle Rain', 'Forest Sounds', 'Mountain Stream',
  'Bird Chirping', 'Ocean Breeze', 'Thunderstorm', 'Night Sounds',
  'River Flow', 'Wind Blowing', 'Crackling Fire', 'Soft Piano',
  'Tapping', 'Whispering', 'Brushing', 'Typing',
  'Mouth Sounds', 'Hair Cutting'
];

const RegisterPage = () => {
  const { register } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [preferences, setPreferences] = useState([]);
  const navigate = useNavigate();

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handlePreferencesChange = (e) => {
    const value = e.target.value;
    setPreferences((prevPreferences) => {
      if (prevPreferences.includes(value)) {
        return prevPreferences.filter((preference) => preference !== value);
      } else if (prevPreferences.length < 5) {
        return [...prevPreferences, value];
      } else {
        return prevPreferences;
      }
    });
  };

  const handleRemovePreference = (preferenceToRemove) => {
    setPreferences((prevPreferences) =>
      prevPreferences.filter((preference) => preference !== preferenceToRemove)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('email', email);
    formData.append('avatar', avatar);
    formData.append('preferences', preferences.join(','));

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      register(response.data.token, response.data.user);
      toast.success('Registered successfully! You are now logged in.');
      navigate('/profile');
    } catch (error) {
      console.error('Error during registration:', error);
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        </div>
        <div className="avatar-container">
          <label className="avatar-label">Avatar:</label>
          <input type="file" onChange={handleAvatarChange} />
        </div>
        <div className="preferences-container">
          <label>ASMR Preferences (Select up to 5):</label>
          <div className="preferences-selection">
            <select onChange={handlePreferencesChange}>
              <option value="">Select a preference</option>
              {preferencesOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="selected-preferences">
            {preferences.map((preference) => (
              <div key={preference} className="preference-item">
                {preference} <button type="button" onClick={() => handleRemovePreference(preference)}>x</button>
              </div>
            ))}
          </div>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
