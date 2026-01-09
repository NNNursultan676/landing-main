/**
 * ⚠️ КРИТИЧЕСКИ ВАЖНО: ГЛАВНЫЙ ЛЕНДИНГ - СТРУКТУРА СТРАНИЦЫ - НЕ ТРОГАТЬ! ⚠️
 * 
 * Этот файл содержит всю структуру лендинга с критически важными настройками:
 * 
 * Структура блоков лендинга (соответствует навигации):
 * 1. Home (id="home") - Главная секция с hero-контентом и анимацией частиц
 * 2. About (id="about") - О компании (внутри main-about-unified)
 * 3. Solutions (id="solutions") - Решения/Продукты
 * 4. Contacts (id="contacts") - Контакты
 * 
 * ⚠️ КРИТИЧЕСКИ ВАЖНО:
 * - ID секций ОБЯЗАТЕЛЬНО должны соответствовать навигации в Nav.jsx
 * - Класс section-snap ОБЯЗАТЕЛЕН для автодоводки
 * - Структура блоков (div с id и className) НЕ МОЖЕТ быть изменена
 * - WaterParticles компонент должен оставаться в main-hero-section
 * 
 * Изменение структуры сломает:
 * - Навигацию (scrollToSection не найдет секции)
 * - Автодоводку (scroll-snap не сработает)
 * - Отслеживание активной секции в навбаре
 */

import { Layout, Row } from 'antd'
import React from 'react'
import Main from '../../components/Main/Main'
import './MainLayout.css'
import SolutionsSection from '../../components/SolutionsSection/SolutionsSection'
import PartnersRunner from '../../components/PartnersRunner/PartnersRunner'
import Footer from '../../layouts/Footer'
import { useTranslation } from 'react-i18next'
import ContactsMain from '../../components/ContactsMain/ContactsMain'
import WaterParticles from '../../components/WaterParticles/WaterParticles'
import '../../layouts/Products/Products.css'
import '../../layouts/Partners/Partners.css'
import '../../layouts/Contacts/Contacts.css'
import '../../layouts/About/About.css'


const Mainlayout = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      {/* 
        ⚠️ КРИТИЧЕСКИ ВАЖНО: БЛОК ГЛАВНОЙ - НЕ ТРОГАТЬ! ⚠️
        ========================================
        БЛОК 1: ГЛАВНАЯ (Home) - ЗАПРЕЩЕНО ИЗМЕНЯТЬ
        id="home" - обязателен для навигации
        
        Этот блок содержит:
        - WaterParticles (3D анимация частиц) - НЕ УДАЛЯТЬ
        - Main компонент с текстом и кнопкой
        - Критически важные z-index и позиционирование
        
        Изменение структуры сломает:
        - Анимацию частиц
        - Позиционирование элементов
        - Навигацию и скролл
        ========================================
      */}
      <div className="main-about-unified" id="home">
        <div className="main-hero-section">
          {/* ⚠️ НЕ УДАЛЯТЬ: 3D анимированные частицы - эффект движения воды */}
          <WaterParticles />
          {/* ⚠️ НЕ МЕНЯТЬ: Main компонент с критической структурой */}
          <Main />
        </div>
        
        {/* 
          ========================================
          БЛОК 2: О КОМПАНИИ (About)
          id="about" - обязателен для навигации
          ========================================
        */}
        <div id="about" className="about-section-unified">
          {/* ⚠️ Заголовок "О нас" на уровне навбара, между логотипом и кнопками */}
          <div className="about-header-in-navbar">
            <h1>{t('aboutTitle')}</h1>
          </div>
          <div className="about-content-layout">
            <div className="about-content-left">
              <div className="about-text-combined">
                <p className="about-text-main">{t('mainTitle5')}</p>
                <p className="about-text-sub">{t('mainTitle4')}</p>
                <p className="about-text-company">
                  {t('aboutText1')} <span className="highlighted">{t('aboutText2')}</span> {t('aboutText3')}
                </p>
                <div className="about-mission-combined">
                  <h3 className="about-mission-title-combined">{t('aboutText4')}</h3>
                  <p className="about-mission-text-combined">{t('aboutText5')}</p>
                </div>
              </div>
            </div>
            <div className="about-content-right">
              <div className="stats-unified-block">
                <div className="stat-item stat-item-top">
                  <div className="stat-value">25%</div>
                  <div className="stat-label">ОПТИМИЗАЦИЯ</div>
                  <div className="stat-description">Сокращение операционных расходов</div>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item stat-item-middle">
                  <div className="stat-value">250+</div>
                  <div className="stat-label">ПАРТНЁРОВ</div>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item stat-item-bottom">
                  <div className="stat-value">95%</div>
                  <div className="stat-label">ЛОЯЛЬНОСТЬ</div>
                  <div className="stat-description">Индекс удовлетворенности клиентов</div>
                </div>
              </div>
            </div>
          </div>
          {/* ⚠️ Логотипы партнеров растянуты на всю ширину экрана, чуть ниже контента */}
          <div className="partners-in-about-bottom">
            <h2 className="partners-in-about-title">Нам доверяют</h2>
            <PartnersRunner compact={true} />
          </div>
        </div>
      </div>
      
      {/* 
        ========================================
        БЛОК 3: РЕШЕНИЯ (Solutions)
        ⚠️ Без автодоводки и защиты
        ========================================
      */}
      <div id="solutions" className="contacts-section-fullscreen">
        <SolutionsSection />
      </div>
      
      {/* 
        ========================================
        БЛОК 4: КОНТАКТЫ (Contacts)
        ⚠️ Без автодоводки и защиты
        ========================================
      */}
      <div id="contacts" className="contacts-section-fullscreen">
        <div className="contacts-section-content">
          <ContactsMain />
          <div className="contacts-wrapper">
            <div className="contacts-grid">
              {/* Карточка телефона */}
              <div className="contact-card">
                <div className="contact-card-icon">📞</div>
                <div className="contact-card-content">
                  <h3 className="contact-card-title">Телефон</h3>
                  <a href="tel:+77758805234" className="contact-card-link">+7 775 880 52 34</a>
                </div>
              </div>

              {/* Карточка email */}
              <div className="contact-card">
                <div className="contact-card-icon">✉️</div>
                <div className="contact-card-content">
                  <h3 className="contact-card-title">Email</h3>
                  <a href="mailto:info@sapatech.kz" className="contact-card-link">info@sapatech.kz</a>
                </div>
              </div>

              {/* Карточка адреса */}
              <div className="contact-card contact-card-address">
                <div className="contact-card-icon">📍</div>
                <div className="contact-card-content">
                  <h3 className="contact-card-title">Адрес</h3>
                  <p className="contact-card-text">г. Алматы, ул. Зеина Шашкина, д. 24</p>
                  <a 
                    href="https://2gis.kz/almaty/geo/70000001066943138/76.933728,43.222690" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className='contact-map-button'
                  >
                    Открыть в 2ГИС
                  </a>
                </div>
              </div>
            </div>

            {/* Карта */}
            <div className='contact-map-wrapper'>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2907.3761568922578!2d76.9312009773613!3d43.22257248017424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38836f24c6b92751%3A0x8e0755bb3661cfad!2z0YPQu9C40YbQsCDQl9C10LnQvdCwINCo0LDRiNC60LjQvdCwIDI0LCDQkNC70LzQsNGC0YsgMDUwMDYw!5e0!3m2!1sru!2skz!4v1723115930036!5m2!1sru!2skz"
                className='contact-map'
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Карта офиса Sapa Technologies"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* 
        ========================================
        ПОДВАЛ (Footer) - ЗАПРЕЩЕНО ИЗМЕНЯТЬ
        ⚠️ КРИТИЧНО: Фон должен быть идентичен главной странице (#05080d)
        ========================================
      */}
      <Footer />
    </Layout>
  )
}

export default Mainlayout