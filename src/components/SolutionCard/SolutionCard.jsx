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
    // navigate(`/solutions/${solutionId}`);
    console.log('Navigate to:', solutionId);
  };

  const handleMouseMove = (event) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    cardRef.current.style.setProperty('--mouse-x', x.toString());
    cardRef.current.style.setProperty('--mouse-y', y.toString());
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

// Компонент для анимации конвейера с деньгами
const ConveyorAnimation = () => {
  return (
    <div className="conveyor-animation">
      <div className="conveyor-belt">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="conveyor-item" style={{ '--delay': `${i * 0.5}s` }}>
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

// Компонент для анимации брокера
const BrokerAnimation = () => {
  return (
    <div className="broker-animation">
      <div className="broker-graph">
        <svg viewBox="0 0 200 120" className="broker-svg">
          <path
            d="M 20 100 Q 60 80, 100 60 T 180 40"
            stroke="var(--color-unified)"
            strokeWidth="3"
            fill="none"
            className="broker-line"
          />
          {[20, 60, 100, 140, 180].map((x, i) => (
            <g key={i}>
              <circle
                cx={x}
                cy={i % 2 === 0 ? 100 - i * 15 : 100 - i * 12}
                r="6"
                fill="var(--color-unified)"
                className="broker-dot"
                style={{ '--delay': `${i * 0.2}s` }}
              />
              <line
                x1={x}
                y1={i % 2 === 0 ? 100 - i * 15 : 100 - i * 12}
                x2={x}
                y2={i % 2 === 0 ? 80 - i * 15 : 80 - i * 12}
                stroke="var(--color-accent)"
                strokeWidth="2"
                className="broker-connection"
                style={{ '--delay': `${i * 0.2 + 0.1}s` }}
              />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};

// Компонент для частичек (Индивидуальные решения)
const ParticleField = () => {
  const containerRef = useRef(null);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Создаем тысячи частичек цвета навбара
    const count = 500; // Увеличиваем количество частичек
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5, // Уменьшаем размер
      speedX: (Math.random() - 0.5) * 0.8,
      speedY: (Math.random() - 0.5) * 0.8,
      delay: Math.random() * 3,
      opacity: Math.random() * 0.5 + 0.3,
    }));
    setParticles(newParticles);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    containerRef.current.style.setProperty('--mouse-x', `${x}%`);
    containerRef.current.style.setProperty('--mouse-y', `${y}%`);
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
