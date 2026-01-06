import React from 'react';
import './SolutionCard.css';
import {  useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SolutionCard = ({ image, title, description }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="solution-card">
      <img src={image} alt={title} className="solution-image" />
      <h3 className="solution-title">{title}</h3>
      <p className="solution-description">{description}</p>
      <button onClick={
        () => {
          navigate('/products');
        }
      } className="success-btn">{t('podrobnee')}</button>
    </div>
  );
};

export default SolutionCard;
