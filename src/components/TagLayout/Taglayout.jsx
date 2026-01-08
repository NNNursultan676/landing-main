import React, { useEffect, useRef, useState } from 'react';
import TagItem from './TagItem';
import './Taglayout.css';
import { useTranslation } from 'react-i18next';

const TagLayout = () => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
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

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementTop = rect.top;
      const elementHeight = rect.height;
      
      // Проверяем видимость элемента
      if (elementTop < windowHeight && elementTop + elementHeight > -200) {
        setIsVisible(true);
        // Вычисляем прогресс прокрутки (0-1)
        const viewportCenter = windowHeight / 2;
        const elementCenter = elementTop + elementHeight / 2;
        const distance = Math.abs(viewportCenter - elementCenter);
        const maxDistance = windowHeight;
        const progress = Math.max(0, Math.min(1, 1 - (distance / maxDistance)));
        setScrollProgress(progress);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Разделяем теги на группы для анимации
  const group1 = tags.slice(0, 3);
  const group2 = tags.slice(3, 6);
  const group3 = tags.slice(6, 10);

  return (
    <div className="tag-layout-container" ref={containerRef}>
      <div className="tag-layout-scroll-wrapper">
        {/* Группа 1 - появляется справа */}
        <div 
          className="tag-group tag-group-1"
          style={{
            transform: `translateX(${isVisible ? (1 - scrollProgress) * 150 : 150}px)`,
            opacity: isVisible ? Math.min(1, scrollProgress * 3) : 0
          }}
        >
          {group1.map((tag, index) => (
            <TagItem key={`group1-${index}`} text={tag} variant="star" />
          ))}
        </div>

        {/* Группа 2 - появляется слева */}
        <div 
          className="tag-group tag-group-2"
          style={{
            transform: `translateX(${isVisible ? -(1 - scrollProgress) * 150 : -150}px)`,
            opacity: isVisible ? Math.min(1, (scrollProgress - 0.2) * 3) : 0
          }}
        >
          {group2.map((tag, index) => (
            <TagItem key={`group2-${index}`} text={tag} variant="star" />
          ))}
        </div>

        {/* Группа 3 - появляется справа */}
        <div 
          className="tag-group tag-group-3"
          style={{
            transform: `translateX(${isVisible ? (1 - scrollProgress) * 150 : 150}px)`,
            opacity: isVisible ? Math.min(1, (scrollProgress - 0.4) * 3) : 0
          }}
        >
          {group3.map((tag, index) => (
            <TagItem key={`group3-${index}`} text={tag} variant="star" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagLayout;
