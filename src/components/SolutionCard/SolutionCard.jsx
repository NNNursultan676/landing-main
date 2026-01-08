import React, { useRef } from 'react';
import './SolutionCard.css';
import { useTranslation } from 'react-i18next';

const SolutionCard = ({ image, title, description, variant = 'default' }) => {
  const { t } = useTranslation();
  const cardRef = useRef(null);
  const isCustom = variant === 'custom';
  
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

  const handleMouseMove = (event) => {
    if (!isCustom || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    cardRef.current.style.setProperty('--mouse-x', x.toString());
    cardRef.current.style.setProperty('--mouse-y', y.toString());
  };

  const handleMouseLeave = () => {
    if (!isCustom || !cardRef.current) return;
    cardRef.current.style.setProperty('--mouse-x', '0');
    cardRef.current.style.setProperty('--mouse-y', '0');
  };
  
  return (
    <div
      className={`solution-card ${isCustom ? 'solution-card--custom' : ''}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {isCustom ? (
        <div className="solution-orbits">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className={`solution-orbit-dot dot-${index + 1}`} />
          ))}
        </div>
      ) : (
        <img src={image} alt={title} className="solution-image" />
      )}
      <h3 className="solution-title">{title}</h3>
      <p className="solution-description">{description}</p>
      <button onClick={scrollToProducts} className="success-btn">{t('podrobnee')}</button>
    </div>
  );
};

export default SolutionCard;
