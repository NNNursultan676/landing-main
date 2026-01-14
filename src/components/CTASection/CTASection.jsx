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
          {t('cta.title')}
        </Title>
        <Paragraph className="cta-description">
          {t('cta.description')}
        </Paragraph>
        <Space size="large" className="cta-buttons">
          <Button
            type="primary"
            size="large"
            onClick={handleGetStarted}
            className="cta-button-primary"
          >
            {t('cta.primary')}
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
            {t('cta.secondary')}
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default CTASection;
