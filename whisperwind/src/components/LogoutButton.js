import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { AuthContext } from '../context/AuthContext'; // Importa il contesto di autenticazione

const Button = styled.button`
  background-color: #000;
  color: #fff;
  border: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const LogoutButton = () => {
  const { logout } = useContext(AuthContext); // Usa il contesto di autenticazione
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout(); // Chiama la funzione di logout dal contesto
    navigate('/login');
  };

  return (
    <Button onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
