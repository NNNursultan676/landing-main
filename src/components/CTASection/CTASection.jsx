import React from 'react';
import './CTASection.css';
import { useTranslation } from 'react-i18next';
import CustomButton from '../CustomButton';
import modalService from '../../services/modalService';

const CTASection = () => {
  const { t } = useTranslation();
  const demoText = t('demoText');

  return (
    <div className="cta-section">
      <div className="cta-content">
        <h2 className="cta-title">{t('ctaTitle') || 'Готовы начать?'}</h2>
        <p className="cta-description">
          {t('ctaDescription') || 'Свяжитесь с нами, чтобы узнать больше о наших решениях и начать сотрудничество'}
        </p>
        <CustomButton
          title={t('demo')}
          styleName="cta-button"
          onClick={() => modalService.openModal(demoText)}
        />
      </div>
    </div>
  );
};

export default CTASection;
