/**
 * Dashboard Hero - Главная секция в стиле dashboard
 * Содержит: метрики в реальном времени, интерактивные элементы, вау-эффекты
 */
import React, { useState, useEffect } from 'react';
import { Typography, Input, Button, Space, Row, Col, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import Nav from '../../layouts/Nav';
import modalService from '../../services/modalService';
import WaterParticles from '../WaterParticles/WaterParticles';
import { ArrowRightOutlined, RocketOutlined, ThunderboltOutlined, GlobalOutlined } from '@ant-design/icons';
import './DashboardHero.css';

const { Title, Paragraph } = Typography;

const DashboardHero = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [stats, setStats] = useState({
    partners: 0,
    cities: 0,
    optimization: 0,
    nps: 0
  });

  // Анимация счетчиков
  useEffect(() => {
    const animateValue = (start, end, duration, callback) => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        callback(value);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    setTimeout(() => {
      animateValue(0, 300, 2000, (val) => setStats(prev => ({ ...prev, partners: val })));
      animateValue(0, 20, 2000, (val) => setStats(prev => ({ ...prev, cities: val })));
      animateValue(0, 50, 2000, (val) => setStats(prev => ({ ...prev, optimization: val })));
      animateValue(0, 93, 2000, (val) => setStats(prev => ({ ...prev, nps: val })));
    }, 500);
  }, []);

  const handleGetStarted = () => {
    // Валидация email (базовая проверка)
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      // Можно добавить toast notification для ошибки валидации
      return;
    }

    const demoText = t('demoText');
    // Передаем email вместе с текстом демо, если он был введен
    const modalData = email 
      ? `${demoText}\n\nEmail: ${email}` 
      : demoText;
    modalService.openModal(modalData);
    
    // Логируем email только в режиме разработки
    if (email && process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('Email для демо:', email);
    }
  };

  return (
    <div id="home" className="dashboard-hero">
      <Nav />
      <WaterParticles />
      <div className="dashboard-hero-container">
        {/* Главный контент */}
        <div className="dashboard-hero-content">
          <div className="hero-badge">
            <ThunderboltOutlined /> Инновации в fintech
          </div>
          
          <Title level={1} className="dashboard-hero-title">
            {t('mainTitle1')} <span className="gradient-text">{t('mainTitle2')}</span> {t('mainTitle3')}
          </Title>
          
          <Paragraph className="dashboard-hero-subtitle">
            {t('mainTitle4')}
          </Paragraph>

          {/* Форма захвата лидов */}
          <div className="dashboard-hero-form">
            <Space.Compact style={{ width: '100%', maxWidth: '520px' }}>
              <Input
                placeholder="Введите email компании"
                size="large"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="dashboard-hero-input"
              />
              <Button
                type="primary"
                size="large"
                onClick={handleGetStarted}
                className="dashboard-hero-button"
                icon={<ArrowRightOutlined />}
              >
                Заказать демо
              </Button>
            </Space.Compact>
          </div>
        </div>

        {/* Dashboard метрики */}
        <div className="dashboard-hero-metrics">
          <Row gutter={[16, 16]}>
            <Col xs={12} sm={12} md={6}>
              <Card className="metric-card metric-card-1" hoverable>
                <div className="metric-icon">
                  <GlobalOutlined />
                </div>
                <div className="metric-value">{stats.partners}+</div>
                <div className="metric-label">Партнеров</div>
              </Card>
            </Col>
            <Col xs={12} sm={12} md={6}>
              <Card className="metric-card metric-card-2" hoverable>
                <div className="metric-icon">
                  <RocketOutlined />
                </div>
                <div className="metric-value">{stats.cities}+</div>
                <div className="metric-label">Городов</div>
              </Card>
            </Col>
            <Col xs={12} sm={12} md={6}>
              <Card className="metric-card metric-card-3" hoverable>
                <div className="metric-icon">
                  <ThunderboltOutlined />
                </div>
                <div className="metric-value">{stats.optimization}%</div>
                <div className="metric-label">Оптимизация</div>
              </Card>
            </Col>
            <Col xs={12} sm={12} md={6}>
              <Card className="metric-card metric-card-4" hoverable>
                <div className="metric-icon">
                  <ThunderboltOutlined />
                </div>
                <div className="metric-value">{stats.nps}%</div>
                <div className="metric-label">NPS</div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default DashboardHero;
