import React from 'react';
import '../Footer.css';
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
          <a href="#">Audiodescrizione</a>
          <a href="#">Rapporti con gli investitori</a>
          <a href="#">Note legali</a>
          <a href="#">Preferenze per la pubblicità</a>
        </div>
        <div>
          <a href="#">Centro assistenza</a>
          <a href="#">Opportunità di lavoro</a>
          <a href="#">Preferenze per i cookie</a>
        </div>
        <div>
          <a href="#">Carte regalo</a>
          <a href="#">Condizioni di utilizzo</a>
          <a href="#">Informazioni sull'azienda</a>
        </div>
        <div>
          <a href="#">Media Center</a>
          <a href="#">Privacy</a>
          <a href="#">Contattaci</a>
        </div>
      </div>
      <div className="FooterBottom">
        <button>Codice di servizio</button>
        <p>© 2024 Whisperwind, Inc.</p>
      </div>
    </div>
  );
};

export default Footer;
