/**
 * Brex-style Trusted By Section
 * Белый фон, минималистичный дизайн
 */
import React from 'react';
import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import PartnersRunner from '../PartnersRunner/PartnersRunner';
import './BrexTrustedBy.css';

const { Title } = Typography;

const BrexTrustedBy = () => {
  const { t } = useTranslation();
  
  return (
    <div id="partners" className="brex-trusted-by">
      <div className="brex-trusted-by-container">
        <Title level={2} className="brex-trusted-by-title">
          {t('trustedBy.description')}
        </Title>
        <div className="brex-trusted-by-logos">
          <PartnersRunner compact={true} />
        </div>
      </div>
    </div>
  );
};

export default BrexTrustedBy;
