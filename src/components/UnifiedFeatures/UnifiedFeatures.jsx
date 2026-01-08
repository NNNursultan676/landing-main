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
        const elementHeight = Math.max(rect.height, windowHeight * 3);
        
        // Вычисляем прогресс прокрутки
        const startOffset = windowHeight * 0.5;
        const endOffset = elementHeight - windowHeight * 0.5;
        const scrollRange = endOffset - startOffset;
        
        if (elementTop <= startOffset && elementTop + elementHeight >= -windowHeight) {
          setIsVisible(true);
          const scrolled = Math.max(0, Math.min(scrollRange, startOffset - elementTop));
          const progress = scrollRange > 0 ? Math.min(1, scrolled / scrollRange) : 0;
          setScrollProgress(progress);
        } else if (elementTop < startOffset) {
          setIsVisible(true);
          setScrollProgress(1);
        } else {
          setIsVisible(false);
          setScrollProgress(0);
        }
      } catch (error) {
        console.error('Error in handleScroll:', error);
      }
    };

    // Начальное состояние
    const timeoutId = setTimeout(() => {
      handleScroll();
    }, 200);

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
          // Каждая секция занимает 1/3 прогресса
          const sectionStart = index / 3;
          const sectionEnd = (index + 1) / 3;
          
          // Нормализуем прогресс для текущей секции
          let sectionProgress = 0;
          if (scrollProgress >= sectionStart && scrollProgress < sectionEnd) {
            sectionProgress = (scrollProgress - sectionStart) / (sectionEnd - sectionStart);
          } else if (scrollProgress >= sectionEnd) {
            sectionProgress = 1;
          } else if (index === 0 && scrollProgress < sectionStart) {
            sectionProgress = Math.max(0, scrollProgress * 3);
          }
          
          // Горизонтальное смещение
          const totalOffset = scrollProgress * 100;
          const sectionOffset = (index * 100) - totalOffset;
          
          const showSection = isVisible && (scrollProgress >= sectionStart - 0.1 || index === 0);
          
          return (
            <div 
              key={`section-${index}`}
              className="unified-features-section"
              style={{
                transform: `translateX(${sectionOffset}%)`,
                opacity: showSection ? Math.max(0.1, Math.min(1, sectionProgress * 2.5 + 0.1)) : 0,
                visibility: showSection ? 'visible' : 'hidden',
              }}
            >
              {/* Теги слева */}
              <div 
                className="unified-features-tags"
                style={{
                  transform: `translateX(${showSection ? -(1 - sectionProgress) * 150 : -150}px)`,
                  opacity: Math.max(0.3, sectionProgress),
                }}
              >
                {tagGroups[index] && tagGroups[index].map((tag, tagIndex) => (
                  <TagItem 
                    key={`tag-${index}-${tagIndex}`} 
                    text={tag || ''} 
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
                  transform: `translateX(${showSection ? (1 - sectionProgress) * 150 : 150}px) rotateY(${sectionProgress * 90}deg)`,
                  opacity: Math.max(0.3, sectionProgress),
                }}
              >
                <StatCard
                  value={stat.value || ''}
                  label={stat.label || ''}
                  description={stat.description || ''}
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
          opacity: scrollProgress > 0.85 ? Math.min(1, (scrollProgress - 0.85) * 6.67) : 0,
          transform: `translateY(${(1 - Math.max(0, (scrollProgress - 0.85) * 6.67)) * 30}px)`,
        }}
      >
        <CustomButton
          title={t('contactButton') || 'Связаться с нами'}
          styleName="success-btn call-btn"
          onClick={() => modalService.openModal(contactText)}
        />
      </div>
    </div>
  );
};

export default UnifiedFeatures;
