import React from 'react';
import FacebookLogin from 'react-facebook-login';

const appId = '25781547288159192';

const FacebookLoginButton = ({ onLoginSuccess }) => {
  const handleResponse = (response) => {
    console.log('Facebook login successful:', response);
    onLoginSuccess(response);
  };

  return (
    <FacebookLogin
      appId={appId}
      autoLoad={false}
      fields="name,email,picture"
      callback={handleResponse}
      textButton="Login with Facebook"
    />
  );
};

export default FacebookLoginButton;
