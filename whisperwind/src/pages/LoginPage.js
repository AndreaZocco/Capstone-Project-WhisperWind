import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import '../Login.css';

const LoginPage = () => {
  const { login, setIsLoggedIn } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('https://capstone-project-whisper-wind.vercel.app/api/users/login', {
        params: { username, password },
        withCredentials: true
      });
      login(response.data.token);
      setIsLoggedIn(true);
      navigate('/');
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed. Please check your username and password.');
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      const res = await axios.get('https://capstone-project-whisper-wind.vercel.app/api/users/google-login', {
        params: { token: response.credential },
        withCredentials: true
      });
      login(res.data.token);
      setIsLoggedIn(true);
      navigate('/');
    } catch (error) {
      console.error('Error during Google login:', error);
      alert('Google login failed.');
    }
  };

  const handleFacebookResponse = async (response) => {
    try {
      const res = await axios.get('https://capstone-project-whisper-wind.vercel.app/api/users/facebook-login', {
        params: { token: response.accessToken },
        withCredentials: true
      });
      login(res.data.token);
      setIsLoggedIn(true);
      navigate('/');
    } catch (error) {
      console.error('Error during Facebook login:', error);
      alert('Facebook login failed.');
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
        <div className="social-login">
          <GoogleOAuthProvider clientId="521727197386-p7pf3229i1ddjjdj99kcrrlkvsjep920.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => console.log('Login Failed')}
            />
          </GoogleOAuthProvider>
          <FacebookLogin
            appId="25781547288159192"
            autoLoad={false}
            fields="name,email,picture"
            callback={handleFacebookResponse}
            render={({ onClick }) => (
              <button type="button" onClick={onClick} className="facebook-login-button">
                Login with Facebook
              </button>
            )}
          />
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
