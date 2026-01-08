import React from 'react';
import SolutionCard from '../SolutionCard/';
import './SolutionsSection.css';
import CreditConveyorImg from '../../assets/images/ConveyerSvg.svg';
import CreditBrokerImg from '../../assets/images/credit-broker.svg';
import CustomSolutionsImg from '../../assets/images/custom-solutions.svg';
import { useTranslation } from 'react-i18next'


const SolutionsSection = () => {
  const { t } = useTranslation();
  const solutions = [
    {
      image: CreditConveyorImg,
      title: t('solutionCreditConveyorTitle'),
      description: t('solutionCreditConveyorDesc'),
    },
    {
      image: CreditBrokerImg,
      title: t('solutionCreditBrokerTitle'),
      description: t('solutionCreditBrokerDesc'),
    },
    {
      image: CustomSolutionsImg,
      title: t('solutionCustomSolutionsTitle'),
      description: t('solutionCustomSolutionsDesc'),
    },
  ];
  return (
    <div className="solutions-section animate-fade-up">
      <div className="solutions-header">
        <h2 className="solutions-title">{t('solutionTitle1')}</h2>
        <h2 className="solutions-subtitle">{t('solutionTitle2')}</h2>
        <p className="solutions-description">{t('solutionTitle3')}</p>
      </div>
      <div className="solutions-container">
        {solutions.map((solution, index) => (
          <SolutionCard
            key={index}
            image={solution.image}
            title={solution.title}
            description={solution.description}
          />
        ))}
      </div>
    </div>
  );
};

export default SolutionsSection;
