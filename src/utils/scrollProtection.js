/**
 * ⚠️ ЗАЩИТА ОТ СЛУЧАЙНЫХ СВАЙПОВ И УСИЛЕНИЕ АВТОДОВОДКИ
 * 
 * Защищает от случайных касаний и свайпов
 * Требует намеренного движения для прокрутки
 * Усиливает автодоводку до идеальной позиции
 */

let isScrolling = false;
let scrollTimer = null;
let lastScrollTop = 0;
let scrollDelta = 0;
let wheelAccumulator = 0; // Накопитель для движений колесика
let snapTimeout = null;

export const initScrollProtection = () => {
  let wheelTimeout = null;
  let touchStartY = 0;
  let touchStartTime = 0;

  // ⚠️ Усиленная автодоводка к ближайшей секции
  const snapToNearestSection = () => {
    const sections = document.querySelectorAll('[id="home"], [id="about"], [id="solutions"], [id="contacts"]');
    if (!sections.length) return;

    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const threshold = viewportHeight * 0.3; // 30% от высоты экрана - порог для автодоводки
    
    let targetSection = null;
    let minDistance = Infinity;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const sectionTop = scrollY + rect.top;
      const sectionBottom = sectionTop + rect.height;
      
      // Проверяем, какая секция ближе всего к верху экрана
      const distanceFromTop = Math.abs(rect.top);
      const distanceFromBottom = Math.abs(rect.bottom - viewportHeight);
      const minDistToViewport = Math.min(distanceFromTop, distanceFromBottom);

      // Если секция видна на экране, но не точно выровнена
      if (rect.top >= -threshold && rect.top <= threshold) {
        if (minDistToViewport < minDistance) {
          minDistance = minDistToViewport;
          targetSection = section;
        }
      }
    });

    // Если секция найдена и нужна корректировка - доводим до идеальной позиции
    if (targetSection) {
      const rect = targetSection.getBoundingClientRect();
      // Цель - выровнять секцию так, чтобы она начиналась с самого верха
      const targetScroll = window.scrollY + rect.top;

      // Доводим только если расстояние больше порога (чтобы не было постоянных мелких движений)
      if (Math.abs(rect.top) > 10) {
        window.scrollTo({
          top: targetScroll,
          behavior: 'smooth'
        });
      }
    } else {
      // Если текущая секция не найдена - находим ближайшую
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top);
        if (distance < minDistance) {
          minDistance = distance;
          targetSection = section;
        }
      });

      if (targetSection && minDistance < viewportHeight * 0.5) {
        const rect = targetSection.getBoundingClientRect();
        const targetScroll = window.scrollY + rect.top;
        window.scrollTo({
          top: targetScroll,
          behavior: 'smooth'
        });
      }
    }
  };

  // ⚠️ Защита от случайного колесика мыши - требуется намеренное движение
  const handleWheel = (e) => {
    const minDelta = 80; // ⚠️ Минимальное движение для начала скролла (увеличено)
    
    wheelAccumulator += Math.abs(e.deltaY);
    
    // Если накопилось достаточно движения - разрешаем скролл
    if (wheelAccumulator < minDelta) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Сброс накопителя после разрешения скролла
    wheelAccumulator = 0;
    isScrolling = true;
    
    // Автодоводка после окончания прокрутки
    clearTimeout(scrollTimer);
    clearTimeout(snapTimeout);
    
    scrollTimer = setTimeout(() => {
      isScrolling = false;
      wheelAccumulator = 0;
    }, 200);

    // ⚠️ Автодоводка с задержкой после прокрутки - усилено
    snapTimeout = setTimeout(() => {
      snapToNearestSection();
    }, 250);
  };

  // Защита от случайных тач-свайпов
  const handleTouchStart = (e) => {
    touchStartY = e.touches[0].clientY;
    touchStartTime = Date.now();
  };

  const handleTouchMove = (e) => {
    if (!touchStartY) return;

    const touchY = e.touches[0].clientY;
    const deltaY = Math.abs(touchY - touchStartY);
    const deltaTime = Date.now() - touchStartTime;
    // ⚠️ Увеличенные пороги для защиты от случайных свайпов
    const minSwipeDistance = 150; // Минимальное расстояние для свайпа (увеличено)
    const minSwipeTime = 150; // Минимальное время для свайпа - быстрые касания игнорируем

    // Если движение слишком маленькое или слишком быстрое, блокируем
    if (deltaY < minSwipeDistance || deltaTime < minSwipeTime) {
      e.preventDefault();
      return;
    }
  };

  const handleTouchEnd = () => {
    touchStartY = 0;
    touchStartTime = 0;
  };

  // Добавляем обработчики с passive: false для возможности preventDefault
  window.addEventListener('wheel', handleWheel, { passive: false });
  window.addEventListener('touchstart', handleTouchStart, { passive: true });
  window.addEventListener('touchmove', handleTouchMove, { passive: false });
  window.addEventListener('touchend', handleTouchEnd, { passive: true });

  // ⚠️ Обработчик окончания прокрутки для автодоводки - усилено
  const handleScrollEnd = () => {
    clearTimeout(snapTimeout);
    // Автодоводка после небольшой задержки
    snapTimeout = setTimeout(() => {
      snapToNearestSection();
    }, 150);
  };

  // Обработчик скролла с throttling для автодоводки
  let scrollTimeout = null;
  const handleScroll = () => {
    if (scrollTimeout) return;
    scrollTimeout = setTimeout(() => {
      handleScrollEnd();
      scrollTimeout = null;
    }, 50);
  };

  // Добавляем обработчики с passive: false для возможности preventDefault
  window.addEventListener('wheel', handleWheel, { passive: false });
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('touchstart', handleTouchStart, { passive: true });
  window.addEventListener('touchmove', handleTouchMove, { passive: false });
  window.addEventListener('touchend', handleTouchEnd, { passive: true });

  // Очистка при размонтировании
  return () => {
    window.removeEventListener('wheel', handleWheel);
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('touchstart', handleTouchStart);
    window.removeEventListener('touchmove', handleTouchMove);
    window.removeEventListener('touchend', handleTouchEnd);
    clearTimeout(scrollTimer);
    clearTimeout(wheelTimeout);
    clearTimeout(snapTimeout);
    clearTimeout(scrollTimeout);
  };
};