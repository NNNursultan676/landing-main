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
      
      // Разная скорость для разных слоев (более медленная для плавности)
      const speed = 0.3 + Math.random() * 0.5;
      
      // Случайная глубина для 3D эффекта (z-index)
      const depth = Math.random();
      
      // Уникальные параметры для хаотичного движения каждой частицы
      const phaseX = Math.random() * Math.PI * 2;
      const phaseY = Math.random() * Math.PI * 2;
      const amplitudeX = 1 + Math.random() * 4; // Разная амплитуда движения
      const amplitudeY = 1 + Math.random() * 3;
      const frequencyX = 0.5 + Math.random() * 1; // Разная частота
      const frequencyY = 0.4 + Math.random() * 0.8;
      
      particle.style.left = `${x}%`;
      particle.style.top = `${y}%`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.opacity = 0.3 + depth * 0.4; // Ближе = ярче
      particle.style.setProperty('--delay', `${delay}s`);
      particle.style.setProperty('--speed', speed);
      particle.style.setProperty('--depth', depth);
      
      container.appendChild(particle);
      particles.push({ 
        element: particle, 
        x, 
        y, 
        depth,
        phaseX,
        phaseY,
        amplitudeX,
        amplitudeY,
        frequencyX,
        frequencyY,
        baseX: x, // Сохраняем базовую позицию
        baseY: y
      });
    }

    // Анимация движения с помощью requestAnimationFrame для плавности
    let animationId;
    let time = 0;

    const animate = () => {
      time += 0.006; // Еще медленнее для очень плавного движения
      
      particles.forEach((particle, index) => {
        const { 
          element, 
          depth, 
          phaseX, 
          phaseY, 
          amplitudeX, 
          amplitudeY, 
          frequencyX, 
          frequencyY,
          baseX,
          baseY
        } = particle;
        
        const speed = parseFloat(element.style.getPropertyValue('--speed'));
        
        // Хаотичное, но зацикленное движение с использованием множественных синусоид
        // Каждая частица имеет уникальную комбинацию фаз, частот и амплитуд
        const wave1X = Math.sin(time * speed * frequencyX + phaseX) * amplitudeX;
        const wave1Y = Math.cos(time * speed * frequencyY + phaseY) * amplitudeY;
        
        // Вторая волна для более сложного хаотичного паттерна
        const wave2X = Math.sin(time * speed * frequencyX * 1.7 + phaseX + Math.PI / 3) * (amplitudeX * 0.6);
        const wave2Y = Math.cos(time * speed * frequencyY * 0.8 + phaseY + Math.PI / 4) * (amplitudeY * 0.5);
        
        // Третья мелкая волна для дополнительной хаотичности
        const wave3X = Math.sin(time * speed * frequencyX * 2.3 + phaseX * 1.5) * (amplitudeX * 0.3);
        const wave3Y = Math.cos(time * speed * frequencyY * 1.4 + phaseY * 1.3) * (amplitudeY * 0.3);
        
        // Объединяем все волны для плавного хаотичного движения
        const offsetX = wave1X + wave2X + wave3X;
        const offsetY = wave1Y + wave2Y + wave3Y;
        
        // 3D эффект - перспектива и трансформация
        const translateZ = depth * 20 - 10; // Глубина от -10 до 10
        const scale = 0.7 + depth * 0.5; // Масштаб в зависимости от глубины
        
        // Плавная ротация для более органичного движения
        const rotation = Math.sin(time * speed * 0.4 + index * 0.1) * 3;
        
        element.style.transform = `translate3d(${offsetX}px, ${offsetY}px, ${translateZ}px) scale(${scale}) rotate(${rotation}deg)`;
        
        // Плавное изменение яркости
        const baseOpacity = 0.25 + depth * 0.55;
        const pulseOpacity = Math.sin(time * speed * 0.5 + index * 0.05) * 0.1;
        const currentOpacity = Math.max(0.2, Math.min(0.8, baseOpacity + pulseOpacity));
        element.style.opacity = currentOpacity;
        
        // Плавное изменение свечения в зависимости от движения
        const glowIntensity = 0.5 + Math.sin(time * speed * 0.3 + index * 0.08) * 0.2;
        element.style.boxShadow = `
          0 0 ${3 + glowIntensity * 2}px rgba(255, 255, 255, ${0.4 + depth * 0.3}),
          0 0 ${6 + glowIntensity * 3}px rgba(255, 255, 255, ${0.25 + depth * 0.2}),
          0 0 ${10 + glowIntensity * 4}px rgba(255, 255, 255, ${0.15 + depth * 0.1})
        `;
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