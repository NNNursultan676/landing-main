// src/components/ServiceSection/ServiceSection.jsx

import React from 'react';
import './ServiceSection.css';
import { useTranslation } from 'react-i18next';

const ServiceSection = ({ image, title, subtitle, points }) => {
  const { t } = useTranslation();
  return (
    <div className="service-section">
      <div className="service-header">
        {image && <img src={image} alt={t('footer.footerAboutUs')} className="service-image" />}
        <h2 className="service-title">{title}</h2>
        {subtitle && <p className="service-subtitle">{subtitle}</p>}
      </div>
      <div className="service-points">
        {points && points.map((point, index) => (
          <div key={index} className="service-point">
            <p className="service-point-text">{point}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSection;
