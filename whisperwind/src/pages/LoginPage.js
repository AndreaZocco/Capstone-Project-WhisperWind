import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../Login.css';

const LoginPage = () => {
  const { login, setIsLoggedIn } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { username, password });
      login(response.data.token);
      setIsLoggedIn(true);
      navigate('/');
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed. Please check your username and password.');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div>
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            id="username"
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Username" 
            required 
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
            required 
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
