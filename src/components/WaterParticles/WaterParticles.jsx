import React, { useEffect, useRef } from 'react';
import './WaterParticles.css';

const WaterParticles = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Создаем частицы
    const particleCount = 150; // Количество точек
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'water-particle';
      
      // Случайное начальное положение
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      
      // Случайный размер (1-3px)
      const size = Math.random() * 2 + 1;
      
      // Случайная задержка анимации для создания волнового эффекта
      const delay = Math.random() * 10;
      
      // Разная скорость для разных слоев
      const speed = 0.5 + Math.random() * 0.8;
      
      // Случайная глубина для 3D эффекта (z-index)
      const depth = Math.random();
      
      particle.style.left = `${x}%`;
      particle.style.top = `${y}%`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.opacity = 0.3 + depth * 0.4; // Ближе = ярче
      particle.style.setProperty('--delay', `${delay}s`);
      particle.style.setProperty('--speed', speed);
      particle.style.setProperty('--depth', depth);
      
      container.appendChild(particle);
      particles.push({ element: particle, x, y, depth });
    }

    // Анимация движения с помощью requestAnimationFrame для плавности
    let animationId;
    let time = 0;

    const animate = () => {
      time += 0.008; // Немного медленнее для более плавного движения
      
      particles.forEach((particle, index) => {
        const { element, x, y, depth } = particle;
        const speed = parseFloat(element.style.getPropertyValue('--speed'));
        
        // Создаем многослойный волновой эффект как в океане
        // Разные частоты для создания реалистичных волн
        const wave1X = Math.sin(time * speed + x * 0.05) * (3 + depth * 4);
        const wave1Y = Math.cos(time * speed * 0.8 + y * 0.04) * (2 + depth * 3);
        
        // Вторая волна для более сложного паттерна
        const wave2X = Math.sin(time * speed * 1.3 + x * 0.03 + depth * 2) * (1.5 + depth * 2);
        const wave2Y = Math.cos(time * speed * 0.9 + y * 0.05 + depth * 1.5) * (1 + depth * 1.5);
        
        // Объединяем волны
        const waveX = wave1X + wave2X;
        const waveY = wave1Y + wave2Y;
        
        // 3D эффект - перспектива и трансформация
        // Ближние частицы (большая глубина) движутся больше
        const translateZ = depth * 25 - 12; // Глубина от -12 до 13
        const scale = 0.7 + depth * 0.5; // Масштаб в зависимости от глубины
        
        // Добавляем небольшую ротацию для более динамичного эффекта
        const rotation = Math.sin(time * speed * 0.5 + index) * 5;
        
        element.style.transform = `translate3d(${waveX}px, ${waveY}px, ${translateZ}px) scale(${scale}) rotate(${rotation}deg)`;
        
        // Изменяем яркость в зависимости от "глубины" и движения для 3D эффекта
        // Ближние частицы ярче, дальние темнее
        const baseOpacity = 0.25 + depth * 0.55;
        const pulseOpacity = Math.sin(time * speed * 0.6 + index * 0.1) * 0.15;
        const currentOpacity = Math.max(0.15, Math.min(0.85, baseOpacity + pulseOpacity));
        element.style.opacity = currentOpacity;
        
        // Добавляем эффект "вспышки" когда частица поднимается выше
        if (waveY < -1) {
          element.style.boxShadow = `
            0 0 6px rgba(255, 255, 255, ${0.6 + depth * 0.3}),
            0 0 12px rgba(255, 255, 255, ${0.4 + depth * 0.2}),
            0 0 18px rgba(255, 255, 255, ${0.2 + depth * 0.1})
          `;
        } else {
          element.style.boxShadow = `
            0 0 4px rgba(255, 255, 255, ${0.5 + depth * 0.3}),
            0 0 8px rgba(255, 255, 255, ${0.3 + depth * 0.2}),
            0 0 12px rgba(255, 255, 255, ${0.15 + depth * 0.1})
          `;
        }
      });
      
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      // Очищаем частицы при размонтировании
      particles.forEach(({ element }) => {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      });
    };
  }, []);

  return <div ref={containerRef} className="water-particles-container" />;
};

export default WaterParticles;