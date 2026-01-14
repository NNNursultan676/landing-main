/**
 * Hero Section - Главная секция сайта
 * Следует структуре референсов (Brex, Snowflake)
 * Содержит: крупный заголовок, подзаголовок, форму захвата лидов, CTA кнопку
 */
import React from 'react';
import { Typography, Input, Button, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import Nav from '../../layouts/Nav';
import modalService from '../../services/modalService';
import WaterParticles from '../WaterParticles/WaterParticles';
import './HeroSection.css';

const { Title, Paragraph } = Typography;

const HeroSection = () => {
  const { t } = useTranslation();

  const handleGetStarted = () => {
    const demoText = t('demoText');
    modalService.openModal(demoText);
  };

  return (
    <div id="home" className="hero-section">
      <Nav />
      <WaterParticles />
      <div className="hero-container">
        <div className="hero-content">
          <Title level={1} className="hero-title">
            {t('mainTitle1')} {t('mainTitle2')} {t('mainTitle3')}
          </Title>
          <Paragraph className="hero-subtitle">
            {t('mainTitle4')}
          </Paragraph>
          
          {/* Форма захвата лидов */}
          <div className="hero-form">
            <Space.Compact style={{ width: '100%', maxWidth: '500px' }}>
              <Input
                placeholder="Введите email компании"
                size="large"
                style={{
                  height: '56px',
                  fontSize: '16px',
                  borderRadius: '12px 0 0 12px',
                }}
              />
              <Button
                type="primary"
                size="large"
                onClick={handleGetStarted}
                style={{
                  height: '56px',
                  fontSize: '16px',
                  fontWeight: 600,
                  borderRadius: '0 12px 12px 0',
                  background: 'linear-gradient(135deg, #4a9eff 0%, #357abd 100%)',
                  border: 'none',
                  padding: '0 32px',
                }}
              >
                Заказать демо
              </Button>
            </Space.Compact>
          </div>

          <Paragraph className="hero-note">
            Sapa Technologies — ваш цифровой партнер на рынке fintech
          </Paragraph>

          <Button
            type="text"
            className="hero-cta-secondary"
            onClick={handleGetStarted}
          >
            Узнать больше →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
