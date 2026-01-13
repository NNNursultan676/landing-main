/**
 * Brex-style Hero Section
 * Контент слева, изображение справа
 */
import React, { useState } from 'react';
import { Typography, Input, Button, Space, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import modalService from '../../services/modalService';
import { ArrowRightOutlined } from '@ant-design/icons';
import './BrexHero.css';

const { Title, Paragraph } = Typography;

const BrexHero = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');

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
        <Row gutter={[80, 40]} align="middle">
          {/* Левая колонка - Контент */}
          <Col xs={24} lg={12}>
            <div className="brex-hero-content">
              <Title level={1} className="brex-hero-title">
                {t('mainTitle1')} {t('mainTitle2')} {t('mainTitle3')}
              </Title>
              
              <Paragraph className="brex-hero-subtitle">
                {t('mainTitle4')}
              </Paragraph>

              {/* Форма */}
              <div className="brex-hero-form">
                <Space.Compact style={{ width: '100%', maxWidth: '480px' }}>
                  <Input
                    placeholder="Введите email компании"
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
                    Заказать демо
                  </Button>
                </Space.Compact>
              </div>

              <Paragraph className="brex-hero-note">
                Sapa Technologies — ваш цифровой партнер на рынке fintech
              </Paragraph>
            </div>
          </Col>

          {/* Правая колонка - Изображение с фоном */}
          <Col xs={24} lg={12}>
            <div className="brex-hero-visual">
              <div className="brex-hero-image-container">
                {/* График */}
                <div className="brex-hero-chart">
                  <div className="brex-chart-bar" style={{ height: '60%', animationDelay: '0s' }}></div>
                  <div className="brex-chart-bar" style={{ height: '80%', animationDelay: '0.2s' }}></div>
                  <div className="brex-chart-bar" style={{ height: '45%', animationDelay: '0.4s' }}></div>
                  <div className="brex-chart-bar" style={{ height: '90%', animationDelay: '0.6s' }}></div>
                  <div className="brex-chart-bar" style={{ height: '70%', animationDelay: '0.8s' }}></div>
                </div>

                {/* Документы */}
                <div className="brex-hero-documents">
                  <div className="brex-document brex-document-1">
                    <div className="brex-document-lines">
                      <div className="brex-document-line"></div>
                      <div className="brex-document-line"></div>
                      <div className="brex-document-line"></div>
                    </div>
                  </div>
                  <div className="brex-document brex-document-2">
                    <div className="brex-document-lines">
                      <div className="brex-document-line"></div>
                      <div className="brex-document-line"></div>
                    </div>
                  </div>
                  <div className="brex-document brex-document-3">
                    <div className="brex-document-lines">
                      <div className="brex-document-line"></div>
                      <div className="brex-document-line"></div>
                      <div className="brex-document-line"></div>
                    </div>
                  </div>
                </div>

                {/* Платформа */}
                <div className="brex-hero-platform"></div>

                {/* Фоновые элементы */}
                <div className="brex-hero-background-elements">
                  <div className="brex-bg-dot"></div>
                  <div className="brex-bg-dot"></div>
                  <div className="brex-bg-dot"></div>
                  <div className="brex-bg-dot"></div>
                  <div className="brex-bg-dot"></div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default BrexHero;
