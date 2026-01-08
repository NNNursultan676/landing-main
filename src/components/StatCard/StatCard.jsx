import React from 'react';
import './StatCard.css';

const StatCard = ({ value, label, description, addClass }) => {
  const cl = addClass ? 'stat-card stat-card-about' : 'stat-card';
  
  return (
    <div className={cl}>
      <div className='stat-card-title'>
        <p className='stat-card-title-1'>{value}</p>
        <p className='stat-card-title-2'>{label}</p>
      </div>
      <div className='stat-card-description'>
        <p className="stat-description">{description}</p>
      </div>      
    </div>
  );
};

export default StatCard;
