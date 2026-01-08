import React, { useEffect, useRef, useState } from 'react';
import './UnifiedFeatures.css';
import { useTranslation } from 'react-i18next';
import StatCard from '../StatCard/StatCard';
import TagItem from '../TagLayout/TagItem';
import CustomButton from '../CustomButton';
import modalService from '../../services/modalService';

const UnifiedFeatures = () => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const tags = [
    t('tag1'),
    t('tag2'),
    t('tag3'),
    t('tag4'),
    t('tag5'),
    t('tag6'),
    t('tag7'),
    t('tag8'),
    t('tag9'),
    t('tag10'),
  ];

  const stats = [
    {
      value: t('statsValue1'),
      label: t('statslabel1'),
      description: t('statsDesc1'),
    },
    {
      value: t('statsValue2'),
      label: t('statslabel2'),
      description: t('statsDesc2'),
    },
    {
      value: t('statsValue3'),
      label: t('statslabel3'),
      description: t('statsDesc3'),
    },
  ];

  // Разделяем теги на группы для каждого кубика
  const tagGroups = [
    tags.slice(0, 3),
    tags.slice(3, 6),
    tags.slice(6, 10),
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementTop = rect.top;
      const elementHeight = rect.height;
      
      if (elementTop < windowHeight && elementTop + elementHeight > -windowHeight) {
        setIsVisible(true);
        // Вычисляем прогресс прокрутки (0-1)
        // Когда элемент вверху экрана - прогресс 0, когда внизу - прогресс 1
        const scrollRange = elementHeight - windowHeight;
        const scrolled = Math.max(0, Math.min(scrollRange, windowHeight - elementTop));
        const progress = scrollRange > 0 ? scrolled / scrollRange : 0;
        setScrollProgress(progress);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const contactText = t('contactButtonText');

  return (
    <div className="unified-features-container" ref={containerRef}>
      <div className="unified-features-scroll-wrapper" ref={wrapperRef}>
        {stats.map((stat, index) => {
          // Каждая секция занимает 1/3 прогресса
          const sectionStart = index / 3;
          const sectionEnd = (index + 1) / 3;
          
          // Нормализуем прогресс для текущей секции
          let sectionProgress = 0;
          if (scrollProgress >= sectionStart && scrollProgress <= sectionEnd) {
            sectionProgress = (scrollProgress - sectionStart) / (sectionEnd - sectionStart);
          } else if (scrollProgress > sectionEnd) {
            sectionProgress = 1;
          }
          
          // Горизонтальное смещение для эффекта "крутится в бок"
          const totalOffset = scrollProgress * 100;
          const sectionOffset = (index * 100) - totalOffset;
          
          return (
            <div 
              key={index}
              className="unified-features-section"
              style={{
                transform: `translateX(${sectionOffset}%)`,
                opacity: isVisible ? Math.min(1, sectionProgress * 3) : 0,
              }}
            >
              {/* Теги слева */}
              <div 
                className="unified-features-tags"
                style={{
                  transform: `translateX(${isVisible ? -(1 - sectionProgress) * 150 : -150}px)`,
                  opacity: sectionProgress,
                }}
              >
                {tagGroups[index].map((tag, tagIndex) => (
                  <TagItem 
                    key={tagIndex} 
                    text={tag} 
                    variant="star"
                    style={{
                      animationDelay: `${tagIndex * 0.15}s`,
                    }}
                  />
                ))}
              </div>

              {/* Кубик справа */}
              <div 
                className="unified-features-cube"
                style={{
                  transform: `translateX(${isVisible ? (1 - sectionProgress) * 150 : 150}px) rotateY(${sectionProgress * 90}deg)`,
                  opacity: sectionProgress,
                }}
              >
                <StatCard
                  value={stat.value}
                  label={stat.label}
                  description={stat.description}
                  addClass={false}
                />
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Кнопка призыва к действию внизу */}
      <div 
        className="unified-features-cta"
        style={{
          opacity: scrollProgress > 0.9 ? (scrollProgress - 0.9) * 10 : 0,
          transform: `translateY(${(1 - Math.max(0, (scrollProgress - 0.9) * 10)) * 30}px)`,
        }}
      >
        <CustomButton
          title={t('contactButton')}
          styleName="success-btn call-btn"
          onClick={() => modalService.openModal(contactText)}
        />
      </div>
    </div>
  );
};

export default UnifiedFeatures;
