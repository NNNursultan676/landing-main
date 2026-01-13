/**
 * Brex-style Trusted By Section
 * Белый фон, минималистичный дизайн
 */
import React from 'react';
import { Typography } from 'antd';
import PartnersRunner from '../PartnersRunner/PartnersRunner';
import './BrexTrustedBy.css';

const { Title } = Typography;

const BrexTrustedBy = () => {
  return (
    <div id="partners" className="brex-trusted-by">
      <div className="brex-trusted-by-container">
        <Title level={2} className="brex-trusted-by-title">
          Нам доверяют 300+ партнеров по всей стране
        </Title>
        <div className="brex-trusted-by-logos">
          <PartnersRunner compact={false} />
        </div>
      </div>
    </div>
  );
};

export default BrexTrustedBy;
