import React from 'react';
import '../CSS/Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <div className="FooterContainer">
      <div className="FooterLinks">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="FooterLink">
          <FontAwesomeIcon icon={faFacebook} size="2x" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="FooterLink">
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="FooterLink">
          <FontAwesomeIcon icon={faTwitter} size="2x" />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="FooterLink">
          <FontAwesomeIcon icon={faYoutube} size="2x" />
        </a>
      </div>
      <div className="FooterSections">
        <div>
          <a href="#">Audio Description</a>
          <a href="#">Investor Relations</a>
          <a href="#">Legal Notices</a>
          <a href="#">Ad Preferences</a>
        </div>
        <div>
          <a href="#">Help Center</a>
          <a href="#">Job Opportunities</a>
          <a href="#">Cookie Preferences</a>
        </div>
        <div>
          <a href="#">Gift Cards</a>
          <a href="#">Terms of Use</a>
          <a href="#">Company Information</a>
        </div>
        <div>
          <a href="#">Media Center</a>
          <a href="#">Privacy</a>
          <a href="#">Contact Us</a>
        </div>
      </div>
      <div className="FooterBottom">
        <button>Service Code</button>
        <p>© 2024 Whisperwind, Inc.</p>
      </div>
    </div>
  );
};

export default Footer;
