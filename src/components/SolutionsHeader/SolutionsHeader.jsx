import React, { useEffect, useRef, useState } from 'react';
import './SolutionsHeader.css';
import { useTranslation } from 'react-i18next';

const SolutionsHeader = () => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top < windowHeight * 0.8 && rect.top > -rect.height) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="solutions-header-wrapper" ref={containerRef}>
      <div 
        className={`solutions-header-fade ${isVisible ? 'visible' : ''}`}
      >
        <h2 className="solutions-header-title">
          {t('solutionTitle1') || 'Инновационные решения'}
        </h2>
        <p className="solutions-header-subtitle">
          {t('solutionTitle3') || 'Для вашего бизнеса'}
        </p>
      </div>
    </div>
  );
};

export default SolutionsHeader;
