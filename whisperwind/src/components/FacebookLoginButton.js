import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

const FacebookLoginButton = ({ onLoginSuccess }) => {
  const handleResponse = (response) => {
    console.log('Facebook login successful:', response);
    onLoginSuccess(response);
  };

  const handleError = (response) => {
    console.error('Facebook login failed:', response);
  };

  return (
    <FacebookLogin
      appId="25781547288159192"
      autoLoad={false}
      fields="name,email,picture"
      callback={handleResponse}
      onFailure={handleError}
      render={(renderProps) => (
        <button type="button" onClick={renderProps.onClick} className="facebook-login-button">
          Login with Facebook
        </button>
      )}
    />
  );
};

export default FacebookLoginButton;
