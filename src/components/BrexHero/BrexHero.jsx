/**
 * Brex-style Hero Section
 * Чистый белый фон, минималистичный дизайн как в Brex
 */
import React, { useState } from 'react';
import { Typography, Input, Button, Space } from 'antd';
import { useTranslation } from 'react-i18next';
// Nav уже включен в MainLayout, не нужно дублировать
import modalService from '../../services/modalService';
import { ArrowRightOutlined } from '@ant-design/icons';
import './BrexHero.css';

const { Title, Paragraph } = Typography;

const BrexHero = () => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');

  const currentLang = (i18n.language || 'ru').split('-')[0];

  const emailPlaceholders = {
    en: 'Enter company email',
    kk: 'Компания email енгізіңіз',
    ru: 'Введите email компании',
  };

  const heroNotes = {
    en: 'Sapa Technologies is your digital partner in the fintech market',
    kk: 'Sapa Technologies — fintech нарығындағы сіздің цифрлық серіктесіңіз',
    ru: 'Sapa Technologies — ваш цифровой партнер на рынке fintech',
  };

  const handleGetStarted = () => {
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return;
    }

    const demoText = t('demoText');
    const modalData = email 
      ? `${demoText}\n\nEmail: ${email}` 
      : demoText;
    modalService.openModal(modalData);
  };

  return (
    <div id="home" className="brex-hero">
      <div className="brex-hero-container">
        <div className="brex-hero-content">
          <Title level={1} className="brex-hero-title">
            {t('mainTitle1')} {t('mainTitle2')} {t('mainTitle3')}
          </Title>
          
          <Paragraph className="brex-hero-subtitle">
            {t('mainTitle4')}
          </Paragraph>

          {/* Форма как в Brex */}
          <div className="brex-hero-form">
            <Space.Compact style={{ width: '100%', maxWidth: '480px' }}>
              <Input
                placeholder={emailPlaceholders[currentLang] || emailPlaceholders.ru}
                size="large"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="brex-hero-input"
              />
              <Button
                type="primary"
                size="large"
                onClick={handleGetStarted}
                className="brex-hero-button"
              >
                {currentLang === 'en'
                  ? 'Order Demo'
                  : currentLang === 'kk'
                  ? 'Демоға тапсырыс жасау'
                  : 'Заказать демо'}
              </Button>
            </Space.Compact>
          </div>

          <Paragraph className="brex-hero-note">
            {heroNotes[currentLang] || heroNotes.ru}
          </Paragraph>
        </div>
      </div>
    </div>
  );
};

export default BrexHero;
