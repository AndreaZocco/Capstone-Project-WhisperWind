
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faSignOutAlt, faSignInAlt, faUserPlus, faListAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import '../App.css';

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <div className="NavbarContainer">
      <div className="NavLinks">
        <Link className="NavLink" to="/">
          <FontAwesomeIcon icon={faHome} /> Home
        </Link>
        <Link className="NavLink" to="/categories">
          <FontAwesomeIcon icon={faListAlt} /> Categories
        </Link>
        <Link className="NavLink" to="/about-asmr">
          <FontAwesomeIcon icon={faInfoCircle} /> About ASMR
        </Link>
        {isLoggedIn && (
          <Link className="NavLink" to="/profile">
            <FontAwesomeIcon icon={faUser} /> Profile
          </Link>
        )}
        {isLoggedIn ? (
          <Link className="NavLink" to="/" onClick={logout}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </Link>
        ) : (
          <>
            <Link className="NavLink" to="/login">
              <FontAwesomeIcon icon={faSignInAlt} /> Login
            </Link>
            <Link className="NavLink" to="/register">
              <FontAwesomeIcon icon={faUserPlus} /> Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
