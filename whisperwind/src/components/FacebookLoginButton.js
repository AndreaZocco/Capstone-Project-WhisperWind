import React from 'react';
import FacebookLogin from '@greatsumini/react-facebook-login';

const appId = '25781547288159192';

const FacebookLoginButton = ({ onLoginSuccess }) => {
  const handleResponse = (response) => {
    console.log('Facebook login successful:', response);
    onLoginSuccess(response);
  };

  const handleError = (error) => {
    console.error('Facebook login failed:', error);
  };

  return (
    <FacebookLogin
      appId={appId}
      autoLoad={false}
      fields="name,email,picture"
      onSuccess={handleResponse}
      onFail={handleError}
      render={({ onClick }) => (
        <button type="button" onClick={onClick} className="facebook-login-button">
          Login with Facebook
        </button>
      )}
    />
  );
};

export default FacebookLoginButton;
