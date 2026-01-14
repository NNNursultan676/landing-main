/**
 * Trusted By Section - Секция "Нам доверяют"
 * Следует структуре референсов (Brex)
 * Отображается сразу после Hero Section
 */
import React from 'react';
import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import PartnersRunner from '../PartnersRunner/PartnersRunner';
import './TrustedBySection.css';

const { Title } = Typography;

const TrustedBySection = () => {
  const { t } = useTranslation();

  return (
    <div className="trusted-by-section">
      <div className="trusted-by-container">
        <Title level={2} className="trusted-by-title">
          {t('trustedBy.description')}
        </Title>
        <div className="trusted-by-logos">
          <PartnersRunner compact={false} />
        </div>
      </div>
    </div>
  );
};

export default TrustedBySection;
