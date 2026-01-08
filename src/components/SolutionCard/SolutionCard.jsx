import React, { useRef, useEffect, useState } from 'react';
import './SolutionCard.css';
import { useTranslation } from 'react-i18next';

const SolutionCard = ({ image, title, description, variant = 'default' }) => {
  const { t } = useTranslation();
  const cardRef = useRef(null);
  const isCustom = variant === 'custom';
  const isConveyor = variant === 'conveyor';
  const isBroker = variant === 'broker';
  
  const handleCardClick = () => {
    // Переход на отдельную страницу решения (будет реализовано позже)
    const solutionId = variant === 'custom' ? 'custom-solutions' : 
                      variant === 'conveyor' ? 'credit-conveyor' : 
                      variant === 'broker' ? 'credit-broker' : 'default';
    console.log('Navigate to:', solutionId);
  };

  const handleMouseMove = (event) => {
    if (!cardRef.current) return;
    try {
      const rect = cardRef.current.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      cardRef.current.style.setProperty('--mouse-x', x.toString());
      cardRef.current.style.setProperty('--mouse-y', y.toString());
    } catch (error) {
      console.error('Error in handleMouseMove:', error);
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty('--mouse-x', '0');
    cardRef.current.style.setProperty('--mouse-y', '0');
  };
  
  return (
    <div
      className={`solution-card ${isCustom ? 'solution-card--custom' : ''} ${isConveyor ? 'solution-card--conveyor' : ''} ${isBroker ? 'solution-card--broker' : ''}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
    >
      {isCustom ? (
        <ParticleField />
      ) : isConveyor ? (
        <ConveyorAnimation />
      ) : isBroker ? (
        <BrokerAnimation />
      ) : (
        <img src={image} alt={title} className="solution-image" />
      )}
      <h3 className="solution-title">{title}</h3>
      <p className="solution-description">{description}</p>
      <button className="success-btn">{t('podrobnee')}</button>
    </div>
  );
};

// Компонент для анимации конвейера с деньгами - улучшенная версия
const ConveyorAnimation = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Создаем больше элементов для более плавной анимации
    const newItems = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      delay: i * 0.4,
    }));
    setItems(newItems);
  }, []);

  return (
    <div className="conveyor-animation">
      <div className="conveyor-belt">
        {items.map((item) => (
          <div key={item.id} className="conveyor-item" style={{ '--delay': `${item.delay}s` }}>
            <div className="money-icon">₸</div>
          </div>
        ))}
      </div>
      <div className="conveyor-arrows">
        <div className="arrow arrow-left">→</div>
        <div className="arrow arrow-right">→</div>
      </div>
    </div>
  );
};

// Компонент для анимации брокера - улучшенная версия
const BrokerAnimation = () => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
  }, []);

  const points = [
    { x: 20, y: 100, delay: 0 },
    { x: 60, y: 85, delay: 0.3 },
    { x: 100, y: 70, delay: 0.6 },
    { x: 140, y: 55, delay: 0.9 },
    { x: 180, y: 40, delay: 1.2 },
  ];

  return (
    <div className="broker-animation">
      <div className="broker-graph">
        <svg viewBox="0 0 200 120" className="broker-svg">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-unified)" />
              <stop offset="50%" stopColor="var(--color-accent)" />
              <stop offset="100%" stopColor="var(--color-unified)" />
            </linearGradient>
            <linearGradient id="dotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-unified)" />
              <stop offset="100%" stopColor="var(--color-accent)" />
            </linearGradient>
          </defs>
          <path
            d="M 20 100 Q 60 85, 100 70 T 180 40"
            stroke="url(#lineGradient)"
            strokeWidth="4"
            fill="none"
            className="broker-line"
          />
          {points.map((point, i) => (
            <g key={i}>
              <circle
                cx={point.x}
                cy={point.y}
                r="8"
                fill="url(#dotGradient)"
                className="broker-dot"
                style={{ '--delay': `${point.delay}s` }}
              />
              <line
                x1={point.x}
                y1={point.y}
                x2={point.x}
                y2={point.y - 25}
                stroke="var(--color-accent)"
                strokeWidth="3"
                className="broker-connection"
                style={{ '--delay': `${point.delay + 0.15}s` }}
              />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};

// Компонент для частичек (Индивидуальные решения) - улучшенная версия
const ParticleField = () => {
  const containerRef = useRef(null);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Создаем больше частичек для более эффектного вида
    const count = 600;
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      speedX: (Math.random() - 0.5) * 1,
      speedY: (Math.random() - 0.5) * 1,
      delay: Math.random() * 4,
      opacity: Math.random() * 0.6 + 0.4,
    }));
    setParticles(newParticles);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    try {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      containerRef.current.style.setProperty('--mouse-x', `${x}%`);
      containerRef.current.style.setProperty('--mouse-y', `${y}%`);
    } catch (error) {
      console.error('Error in handleMouseMove:', error);
    }
  };

  return (
    <div
      className="particle-field"
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            '--delay': `${particle.delay}s`,
            '--speed-x': `${particle.speedX}`,
            '--speed-y': `${particle.speedY}`,
            opacity: particle.opacity,
          }}
        />
      ))}
    </div>
  );
};

export default SolutionCard;
