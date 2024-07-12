import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignInAlt, faUserPlus, faListAlt, faInfoCircle, faBell, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import placeholderAvatar from '../assets/abstract-user-flat-4.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/Navbar.css';

const CustomNavbar = () => {
  const { isLoggedIn, logout, user } = useContext(AuthContext);
  const [avatar, setAvatar] = useState(placeholderAvatar);

  useEffect(() => {
    if (user?.avatar) {
      setAvatar(`http://localhost:5000${user.avatar}`);
    } else {
      setAvatar(placeholderAvatar);
    }
  }, [user]);

  const categories = [
    'Relaxing Waves', 'Gentle Rain', 'Forest Sounds', 'Mountain Stream',
    'Bird Chirping', 'Ocean Breeze', 'Thunderstorm', 'Night Sounds',
    'River Flow', 'Wind Blowing', 'Crackling Fire', 'Soft Piano',
    'Tapping', 'Whispering', 'Brushing', 'Typing',
    'Mouth Sounds', 'Hair Cutting'
  ];

  return (
    <Navbar bg="light" variant="light" expand="lg" sticky="top" className="shadow-sm">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/"><FontAwesomeIcon icon={faHome} /> Home</Nav.Link>
            <NavDropdown title={<><FontAwesomeIcon icon={faListAlt} /> Categories</>} id="basic-nav-dropdown">
              {categories.map((category, index) => (
                <NavDropdown.Item key={index} as={Link} to={`/category/${category}`}>
                  {category}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <Nav.Link as={Link} to="/about-asmr"><FontAwesomeIcon icon={faInfoCircle} /> About ASMR</Nav.Link>
            <Nav.Link as={Link} to="/privacy"><FontAwesomeIcon icon={faInfoCircle} /> Privacy</Nav.Link>
            <Nav.Link as={Link} to="/live-events"><FontAwesomeIcon icon={faCalendarAlt} /> Live Events</Nav.Link>
          </Nav>
          {isLoggedIn ? (
            <div className="NavIcons d-flex align-items-center">
              <Nav.Link as={Link} to="/news" className="NotificationIcon me-3">
                <FontAwesomeIcon icon={faBell} />
              </Nav.Link>
              <div className="UserProfile">
                <NavDropdown align="end" title={<img src={avatar} alt="User Avatar" className="UserAvatar" />} id="profile-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/account">Account</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/settings">Settings</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/" onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </div>
            </div>
          ) : (
            <Nav>
              <Nav.Link as={Link} to="/login"><FontAwesomeIcon icon={faSignInAlt} /> Login</Nav.Link>
              <Nav.Link as={Link} to="/register"><FontAwesomeIcon icon={faUserPlus} /> Register</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
