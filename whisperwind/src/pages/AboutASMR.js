
import React from 'react';
import asmrImage from '../assets/asmr.webp';
import '../AboutASMR.css';

const AboutASMR = () => {
  return (
    <div className="about-asmr-container">
      <h2>About ASMR</h2>
      <img src={asmrImage} alt="ASMR" className="asmr-image" />
      <div className="asmr-description">
        <p>
          ASMR stands for Autonomous Sensory Meridian Response. It is a tingling sensation that typically begins on the scalp and moves down the back of the neck and upper spine. ASMR is often triggered by specific auditory or visual stimuli, such as whispering, tapping, or gentle hand movements.
        </p>
        <p>
          People watch ASMR videos to relax, relieve stress, and improve sleep. The ASMR community is vast and diverse, with creators producing a wide range of content to evoke this response. From role-plays and personal attention videos to sound assortments and ambient noise recordings, there is something for everyone.
        </p>
        <p>
          Explore our categories to find your favorite ASMR triggers and start experiencing the calming effects of ASMR today.
        </p>
      </div>
    </div>
  );
};

export default AboutASMR;
