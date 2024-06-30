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
          <button onClick={() => window.location.href = "#"}>Audiodescrizione</button>
          <button onClick={() => window.location.href = "#"}>Rapporti con gli investitori</button>
          <button onClick={() => window.location.href = "#"}>Note legali</button>
          <button onClick={() => window.location.href = "#"}>Preferenze per la pubblicità</button>
        </div>
        <div>
          <button onClick={() => window.location.href = "#"}>Centro assistenza</button>
          <button onClick={() => window.location.href = "#"}>Opportunità di lavoro</button>
          <button onClick={() => window.location.href = "#"}>Preferenze per i cookie</button>
        </div>
        <div>
          <button onClick={() => window.location.href = "#"}>Carte regalo</button>
          <button onClick={() => window.location.href = "#"}>Condizioni di utilizzo</button>
          <button onClick={() => window.location.href = "#"}>Informazioni sull'azienda</button>
        </div>
        <div>
          <button onClick={() => window.location.href = "#"}>Media Center</button>
          <button onClick={() => window.location.href = "#"}>Privacy</button>
          <button onClick={() => window.location.href = "#"}>Contattaci</button>
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
