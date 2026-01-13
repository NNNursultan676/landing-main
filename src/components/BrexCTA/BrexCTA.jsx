/**
 * Brex-style CTA Section
 * Минималистичный дизайн, белый фон
 */
import React from 'react';
import { Typography, Button, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import modalService from '../../services/modalService';
import './BrexCTA.css';

const { Title, Paragraph } = Typography;

const BrexCTA = () => {
  const { t } = useTranslation();

  const handleGetStarted = () => {
    const demoText = t('demoText');
    modalService.openModal(demoText);
  };

  return (
    <div className="brex-cta">
      <div className="brex-cta-container">
        <Title level={2} className="brex-cta-title">
          Готовы начать работу с Sapa Technologies?
        </Title>
        <Paragraph className="brex-cta-description">
          Узнайте, как наши решения могут помочь вашему бизнесу достичь новых высот
        </Paragraph>
        <Space size="large" className="brex-cta-buttons">
          <Button
            type="primary"
            size="large"
            onClick={handleGetStarted}
            className="brex-cta-button-primary"
          >
            Заказать демо
          </Button>
          <Button
            size="large"
            className="brex-cta-button-secondary"
            onClick={() => {
              const contactsSection = document.getElementById('contacts');
              if (contactsSection) {
                contactsSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Связаться с нами
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default BrexCTA;
