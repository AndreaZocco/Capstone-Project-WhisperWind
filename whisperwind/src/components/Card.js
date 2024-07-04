import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Card = ({ title, imageUrl }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/category/${title}`);
  };

  return (
    <div className="card-container" onClick={handleClick}>
      <img className="card-image" src={imageUrl} alt={title} />
      <div className="card-title">{title}</div>
    </div>
  );
};

export default Card;
