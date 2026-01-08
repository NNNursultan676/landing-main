import React from 'react';
import './UnifiedFeatures.css';
import { useTranslation } from 'react-i18next';
import StatCard from '../StatCard/StatCard';
import TagItem from '../TagLayout/TagItem';
import CustomButton from '../CustomButton';
import modalService from '../../services/modalService';

const UnifiedFeatures = () => {
  const { t } = useTranslation();

  const tags = [
    t('tag1'),
    t('tag2'),
    t('tag3'),
    t('tag4'),
    t('tag5'),
    t('tag6'),
    t('tag7'),
    t('tag8'),
    t('tag9'),
    t('tag10'),
  ];

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

  // Разделяем теги на группы: 3, 3-4, 3-4
  const tagGroups = [
    tags.slice(0, 3),      // Первая группа: 3 предложения
    tags.slice(3, 7),      // Вторая группа: 3-4 предложения
    tags.slice(7, 10),     // Третья группа: 3 предложения
  ];

  const contactText = t('contactButtonText');

  return (
    <div className="unified-features-container">
      <div className="unified-features-content">
        {/* Первая секция: блок справа, слева 3 предложения */}
        <div className="unified-features-section">
          <div className="unified-features-tags">
            {tagGroups[0].map((tag, index) => (
              <TagItem 
                key={`tag-0-${index}`} 
                text={tag} 
                variant="star"
              />
            ))}
          </div>
          <div className="unified-features-cube">
            <StatCard
              value={stats[0].value}
              label={stats[0].label}
              description={stats[0].description}
              addClass={false}
            />
          </div>
        </div>

        {/* Вторая секция: блок справа, слева 3-4 предложения */}
        <div className="unified-features-section">
          <div className="unified-features-tags">
            {tagGroups[1].map((tag, index) => (
              <TagItem 
                key={`tag-1-${index}`} 
                text={tag} 
                variant="star"
              />
            ))}
          </div>
          <div className="unified-features-cube">
            <StatCard
              value={stats[1].value}
              label={stats[1].label}
              description={stats[1].description}
              addClass={false}
            />
          </div>
        </div>

        {/* Третья секция: блок справа, слева 3 предложения */}
        <div className="unified-features-section">
          <div className="unified-features-tags">
            {tagGroups[2].map((tag, index) => (
              <TagItem 
                key={`tag-2-${index}`} 
                text={tag} 
                variant="star"
              />
            ))}
          </div>
          <div className="unified-features-cube">
            <StatCard
              value={stats[2].value}
              label={stats[2].label}
              description={stats[2].description}
              addClass={false}
            />
          </div>
        </div>
      </div>
      
      {/* Кнопка призыва к действию внизу */}
      <div className="unified-features-cta">
        <CustomButton
          title={t('contactButton') || 'Связаться с нами'}
          styleName="success-btn call-btn"
          onClick={() => modalService.openModal(contactText)}
        />
      </div>
    </div>
  );
};

export default UnifiedFeatures;
