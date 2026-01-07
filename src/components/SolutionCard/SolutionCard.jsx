import React from 'react';
import './SolutionCard.css';
import { useTranslation } from 'react-i18next';

const SolutionCard = ({ image, title, description }) => {
  const { t } = useTranslation();
  
  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <div className="solution-card">
      <img src={image} alt={title} className="solution-image" />
      <h3 className="solution-title">{title}</h3>
      <p className="solution-description">{description}</p>
      <button onClick={scrollToProducts} className="success-btn">{t('podrobnee')}</button>
    </div>
  );
};

export default SolutionCard;
