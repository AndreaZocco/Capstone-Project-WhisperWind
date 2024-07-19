import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleEnterClick = () => {
    navigate('/home');
  };

  return (
    <div className="landing-page">
      <div className="overlay"></div>
      <div className="landing-header">
        <div className="content">
          <h1>
            This is a site for <span className="strikethrough">adults only</span> chill-out champions!
          </h1>
          <p>This site contains extremely relaxing ASMR content. By entering, you confirm that you're ready to unwind and chill out like never before! Once you enter, there's no turning back!</p>
          <div className="button-container">
            <button className="enter-button" onClick={handleEnterClick}>I'm Ready to Relax - Enter</button>
            <button className="exit-button">I'm Not Ready :( </button>
          </div>
          <p className="footer-text">Our <a href="/parental-controls">parental controls page</a> explains how to easily block access to this site.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
