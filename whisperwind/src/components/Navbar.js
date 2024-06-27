import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignInAlt, faUserPlus, faListAlt, faInfoCircle, faBell } from '@fortawesome/free-solid-svg-icons';
import '../App.css';
import placeholderAvatar from '../assets/abstract-user-flat-4.svg';

const Navbar = () => {
  const { isLoggedIn, logout, user } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [avatar, setAvatar] = useState(placeholderAvatar);

  useEffect(() => {
    if (user?.avatar) {
      setAvatar(`http://localhost:5000${user.avatar}`);
    } else {
      setAvatar(placeholderAvatar);
    }
  }, [user]);

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  const handleProfileMouseEnter = () => {
    setShowProfileDropdown(true);
  };

  const handleProfileMouseLeave = () => {
    setShowProfileDropdown(false);
  };

  const categories = [
    'Relaxing Waves', 'Gentle Rain', 'Forest Sounds', 'Mountain Stream',
    'Bird Chirping', 'Ocean Breeze', 'Thunderstorm', 'Night Sounds',
    'River Flow', 'Wind Blowing', 'Crackling Fire', 'Soft Piano',
    'Tapping', 'Whispering', 'Brushing', 'Typing',
    'Mouth Sounds', 'Hair Cutting'
  ];

  return (
    <div className="NavbarContainer">
      <div className="NavLinks">
        <Link className="NavLink" to="/">
          <FontAwesomeIcon icon={faHome} /> Home
        </Link>
        <div
          className="NavLink"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <FontAwesomeIcon icon={faListAlt} /> Categories
          {showDropdown && (
            <div className="DropdownMenu">
              {categories.map((category, index) => (
                <Link key={index} className="DropdownItem" to={`/category/${category}`}>
                  {category}
                </Link>
              ))}
            </div>
          )}
        </div>
        <Link className="NavLink" to="/about-asmr">
          <FontAwesomeIcon icon={faInfoCircle} /> About ASMR
        </Link>
        <Link className="NavLink" to="/privacy">
          <FontAwesomeIcon icon={faInfoCircle} /> Privacy
        </Link>
      </div>
      {isLoggedIn ? (
        <div className="NavIcons">
          <Link to="/news" className="NotificationIcon">
            <FontAwesomeIcon icon={faBell} />
          </Link>
          <div
            className="UserProfile"
            onMouseEnter={handleProfileMouseEnter}
            onMouseLeave={handleProfileMouseLeave}
          >
            <img
              src={avatar}
              alt="User Avatar"
              className="UserAvatar"
            />
            {showProfileDropdown && (
              <div className="ProfileDropdownMenu">
                <Link className="DropdownItem" to="/account">Account</Link>
                <Link className="DropdownItem" to="/profile">Profile</Link>
                <Link className="DropdownItem" to="/settings">Settings</Link>
                <Link className="DropdownItem" to="/" onClick={logout}>Logout</Link>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="NavLinks">
          <Link className="NavLink" to="/login">
            <FontAwesomeIcon icon={faSignInAlt} /> Login
          </Link>
          <Link className="NavLink" to="/register">
            <FontAwesomeIcon icon={faUserPlus} /> Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
