import React from 'react';
import StatCard from '../StatCard/StatCard';
import './StatsSections.css';
import { useTranslation } from 'react-i18next';
import CustomButton from '../CustomButton';
import modalService from '../../services/modalService';



const StatsSection = ({show}) => {  
  const {t} = useTranslation();
  const contactText = t('contactButtonText');
  const stats = [
    {
      value: t('statsValue1'),
      label: t('statslabel1'),
      description: t('statsDesc1'),
    },
    {
      value: t('statsValue2'),
      label: t('statslabel2'),
      description: t('statsDesc2'),
    },
    {
      value: t('statsValue3'),
      label: t('statslabel3'),
      description: t('statsDesc3'),
    },
  ];
  return (
    <div className="stats-section animate-fade-soft">
      <div className="stats-container">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            value={stat.value}
            label={stat.label}
            description={stat.description}
            addClass={show}
          />
        ))}
      </div>
      <CustomButton
            title={t('contactButton')}
            styleName="success-btn call-btn"
            onClick={() => modalService.openModal(contactText)}
          />
    </div>
  );
};

export default StatsSection;