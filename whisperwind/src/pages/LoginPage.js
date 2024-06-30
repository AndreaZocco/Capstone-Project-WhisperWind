import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { FacebookProvider, LoginButton } from 'react-facebook';
import '../Login.css';

const LoginPage = () => {
  const { login, setIsLoggedIn } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://whisperwind1.netlify.app/.netlify/functions/api/users/login', {
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
      const res = await axios.post('https://whisperwind1.netlify.app/api/users/google-login', {
        token: response.credential
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
    if (response.status !== 'connected') {
      alert('Facebook login failed.');
      return;
    }
    try {
      const res = await axios.post('https://whisperwind1.netlify.app/api/users/facebook-login', {
        token: response.authResponse.accessToken
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
          <FacebookProvider appId="25781547288159192">
            <LoginButton
              scope="email"
              onCompleted={handleFacebookResponse}
              onError={(error) => console.error('Facebook login failed:', error)}
            >
              <button type="button" className="facebook-login-button">
                Login with Facebook
              </button>
            </LoginButton>
          </FacebookProvider>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
