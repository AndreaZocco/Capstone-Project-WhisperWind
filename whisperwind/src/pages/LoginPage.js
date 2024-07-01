import React, { useState, useContext } from 'react';
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
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      login(data.token);
      setIsLoggedIn(true);
      navigate('/');
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed. Please check your username and password.');
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      const res = await fetch('/api/users/google-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: response.credential }),
      });
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      login(data.token);
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
      const res = await fetch('/api/users/facebook-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: response.authResponse.accessToken }),
      });
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      login(data.token);
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
