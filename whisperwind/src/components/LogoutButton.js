import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button'; // Assicurati di importare il componente Button
import { AuthContext } from '../context/AuthContext'; // Importa il contesto di autenticazione

const LogoutButton = () => {
  const { logout } = useContext(AuthContext); // Usa il contesto di autenticazione
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout(); // Chiama la funzione di logout dal contesto
    navigate('/login');
  };

  return (
    <Button variant="contained" color="primary" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
