/**
 * CTA Section - Секция призыва к действию
 * Следует структуре референсов (Brex)
 * Размещается перед контактами
 */
import React from 'react';
import { Typography, Button, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import modalService from '../../services/modalService';
import './CTASection.css';

const { Title, Paragraph } = Typography;

const CTASection = () => {
  const { t } = useTranslation();

  const handleGetStarted = () => {
    const demoText = t('demoText');
    modalService.openModal(demoText);
  };

  return (
    <div className="cta-section">
      <div className="cta-container">
        <Title level={2} className="cta-title">
          Готовы начать работу с Sapa Technologies?
        </Title>
        <Paragraph className="cta-description">
          Узнайте, как наши решения могут помочь вашему бизнесу достичь новых высот
        </Paragraph>
        <Space size="large" className="cta-buttons">
          <Button
            type="primary"
            size="large"
            onClick={handleGetStarted}
            className="cta-button-primary"
          >
            {t('demo')}
          </Button>
          <Button
            size="large"
            className="cta-button-secondary"
            onClick={() => {
              const contactsSection = document.getElementById('contacts');
              if (contactsSection) {
                contactsSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            {t('contactButton')}
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default CTASection;
