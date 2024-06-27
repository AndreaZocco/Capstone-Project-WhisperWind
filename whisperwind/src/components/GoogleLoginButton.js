// src/components/GoogleLoginButton.js
import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const clientId = 'Y521727197386-p7pf3229i1ddjjdj99kcrrlkvsjep920.apps.googleusercontent.com';

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
