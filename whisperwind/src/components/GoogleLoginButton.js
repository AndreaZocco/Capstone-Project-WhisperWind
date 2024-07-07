import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const GoogleLoginButton = ({ onLoginSuccess }) => {
  const handleSuccess = (response) => {
    console.log('Google login successful:', response);
    onLoginSuccess(response);
  };

  const handleFailure = (error) => {
    console.error('Google login failed:', error);
    if (error.error) console.error('Error details:', error.error);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleFailure}
        useOneTap={false}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
