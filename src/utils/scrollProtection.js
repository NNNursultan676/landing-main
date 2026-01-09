/**
 * ⚠️ ЗАЩИТА ОТ СЛУЧАЙНЫХ СВАЙПОВ
 * 
 * Защищает от случайных касаний и свайпов на мобильных устройствах
 * Требует намеренного движения для прокрутки
 * 
 * Колесико мыши работает нормально - scroll-snap обеспечивает автодоводку
 */

let isScrolling = false;
let scrollTimer = null;
let lastScrollTop = 0;
let scrollDelta = 0;

export const initScrollProtection = () => {
  let wheelTimeout = null;
  let touchStartY = 0;
  let touchStartTime = 0;

  // Защита от случайного колесика мыши - требуется намеренное движение
  const handleWheel = (e) => {
    // Разрешаем все скроллы - браузер сам обрабатывает scroll-snap
    // scroll-snap-type: mandatory уже обеспечивает автодоводку
    // Это позволяет навигации через навбар работать нормально
    isScrolling = true;
    
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      isScrolling = false;
    }, 200);
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

  // Очистка при размонтировании
  return () => {
    window.removeEventListener('wheel', handleWheel);
    window.removeEventListener('touchstart', handleTouchStart);
    window.removeEventListener('touchmove', handleTouchMove);
    window.removeEventListener('touchend', handleTouchEnd);
    clearTimeout(scrollTimer);
    clearTimeout(wheelTimeout);
  };
};