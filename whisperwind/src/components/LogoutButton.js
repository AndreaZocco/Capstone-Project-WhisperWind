import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from '@emotion/styled';

const Button = styled.button`
  background-color: #000;
  color: #fff;
  border: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const LogoutButton = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem('token');

    try {
      await axios.post('http://localhost:5000/api/users/logout', {}, {
        headers: {
          'Authorization': token
        }
      });
    } catch (error) {
      console.error('Error during logout:', error);
    }

    localStorage.removeItem('token');
    setIsLoggedIn(false);

    navigate('/login');
  };

  return (
    <Button onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
