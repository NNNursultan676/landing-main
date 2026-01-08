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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

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
      
      try {
        const rect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementTop = rect.top;
        const elementHeight = rect.height || 3000;
        
        // Проверяем видимость элемента
        if (elementTop < windowHeight * 1.5 && elementTop + elementHeight > -windowHeight) {
          setIsVisible(true);
          // Вычисляем прогресс прокрутки (0-1)
          const scrollRange = Math.max(elementHeight - windowHeight, windowHeight);
          const scrolled = Math.max(0, Math.min(scrollRange, windowHeight - elementTop));
          const progress = scrollRange > 0 ? Math.min(1, scrolled / scrollRange) : 0;
          setScrollProgress(progress);
        } else if (elementTop < windowHeight) {
          // Элемент уже прошел, показываем последнюю секцию
          setIsVisible(true);
          setScrollProgress(1);
        } else {
          setIsVisible(true);
          setScrollProgress(0);
        }
      } catch (error) {
        console.error('Error in handleScroll:', error);
      }
    };

    // Вызываем сразу для начального состояния
    const timeoutId = setTimeout(() => {
      handleScroll();
    }, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const contactText = t('contactButtonText');

  return (
    <div className="unified-features-container" ref={containerRef}>
      <div className="unified-features-scroll-wrapper">
        {stats.map((stat, index) => {
          try {
            // Каждая секция занимает 1/3 прогресса
            const sectionStart = index / 3;
            const sectionEnd = (index + 1) / 3;
            
            // Нормализуем прогресс для текущей секции
            let sectionProgress = 0;
            if (scrollProgress >= sectionStart && scrollProgress <= sectionEnd) {
              sectionProgress = (scrollProgress - sectionStart) / (sectionEnd - sectionStart);
            } else if (scrollProgress > sectionEnd) {
              sectionProgress = 1;
            } else if (scrollProgress < sectionStart && index === 0) {
              sectionProgress = Math.max(0, scrollProgress * 3);
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
                  opacity: isVisible ? Math.max(0.3, Math.min(1, sectionProgress * 2 + 0.3)) : 0.1,
                  visibility: isVisible || sectionProgress > 0 ? 'visible' : 'hidden',
                }}
              >
                {/* Теги слева */}
                <div 
                  className="unified-features-tags"
                  style={{
                    transform: `translateX(${isVisible ? -(1 - sectionProgress) * 150 : -150}px)`,
                    opacity: Math.max(0.5, sectionProgress),
                  }}
                >
                  {tagGroups[index] && tagGroups[index].map((tag, tagIndex) => (
                    <TagItem 
                      key={`tag-${index}-${tagIndex}`} 
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
                    opacity: Math.max(0.5, sectionProgress),
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
          } catch (error) {
            console.error(`Error rendering section ${index}:`, error);
            return null;
          }
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
