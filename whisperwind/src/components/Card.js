import React from 'react';
import '../App.css';

const Card = ({ title, imageUrl }) => {
  return (
    <div className="card-container">
      <img className="card-image" src={imageUrl} alt={title} />
      <div className="card-title">{title}</div>
    </div>
  );
};

export default Card;
