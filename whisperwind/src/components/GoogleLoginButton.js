// src/components/GoogleLoginButton.js
import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const GoogleLoginButton = ({ onLoginSuccess }) => {
  const handleSuccess = (response) => {
    console.log('Google login successful:', response);
    onLoginSuccess(response);
  };

  const handleFailure = (response) => {
    console.error('Google login failed:', response);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onFailure={handleFailure}
        buttonText="Login with Google"
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
