/**
 * Dashboard Products - Продукты в стиле dashboard grid
 * Уникальные карточки с интерактивностью
 */
import React, { useState } from 'react';
import { Typography, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import SolutionCard from '../SolutionCard/';
import ProductModal from '../ProductModal/ProductModal';
import modalService from '../../services/modalService';
import CreditConveyorImg from '../../assets/images/ConveyerSvg.svg';
import CreditBrokerImg from '../../assets/images/credit-broker.svg';
import CustomSolutionsImg from '../../assets/images/custom-solutions.svg';
import './DashboardProducts.css';

const { Title, Paragraph } = Typography;

const DashboardProducts = () => {
  const { t } = useTranslation();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const solutions = [
    {
      image: CreditConveyorImg,
      title: t('solutionCreditConveyorTitle'),
      description: t('solutionCreditConveyorDesc'),
      variant: 'conveyor',
      subTitle: t('productsRes.creditConveyor.subtitle'),
      projects: {
        title: 'Основные возможности',
        elements: t('productsRes.creditConveyor.points', { returnObjects: true }),
      },
      services: {
        title: 'Преимущества',
        elements: t('productsRes.creditConveyor.benefits.benefitsList', { returnObjects: true }),
      },
      gradient: 'linear-gradient(135deg, #4a9eff 0%, #357abd 100%)',
      icon: '⚡',
    },
    {
      image: CreditBrokerImg,
      title: t('solutionCreditBrokerTitle'),
      description: t('solutionCreditBrokerDesc'),
      variant: 'broker',
      subTitle: t('productsRes.creditBroker.subtitle'),
      projects: {
        title: 'Основные возможности',
        elements: t('productsRes.creditBroker.points', { returnObjects: true }),
      },
      services: {
        title: 'Преимущества',
        elements: t('productsRes.creditBroker.benefits.benefitsList', { returnObjects: true }),
      },
      gradient: 'linear-gradient(135deg, #50F5B0 0%, #3dd89f 100%)',
      icon: '🌐',
    },
    {
      image: CustomSolutionsImg,
      title: t('solutionCustomSolutionsTitle'),
      description: t('solutionCustomSolutionsDesc'),
      variant: 'custom',
      subTitle: t('productsRes.customSolutions.subtitle'),
      projects: {
        title: 'Основные возможности',
        elements: t('productsRes.customSolutions.points', { returnObjects: true }),
      },
      services: {
        title: 'Преимущества',
        elements: t('productsRes.customSolutions.benefits.benefitsList', { returnObjects: true }),
      },
      gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
      icon: '🎯',
    },
  ];

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleOrderDemo = () => {
    setIsModalOpen(false);
    const demoText = t('demoText');
    modalService.openModal(demoText);
  };

  return (
    <div id="solutions" className="dashboard-products">
      <div className="dashboard-products-container">
        <div className="dashboard-products-header">
          <div className="section-badge">Продукты</div>
          <Title level={2} className="dashboard-products-title">
            {t('solutionTitle1') || 'Инновационные решения'}
          </Title>
          <Paragraph className="dashboard-products-subtitle">
            {t('solutionTitle3') || 'Для вашего бизнеса'}
          </Paragraph>
        </div>

        <div className="dashboard-products-grid">
          {solutions.map((solution, index) => (
            <div 
              key={index} 
              className={`product-card-wrapper product-card-${index + 1}`}
              onClick={() => handleProductClick(solution)}
            >
              <div className="product-card-glow" style={{ background: solution.gradient }} />
              <div className="product-card">
                <div className="product-card-icon">{solution.icon}</div>
                <SolutionCard
                  image={solution.image}
                  title={solution.title}
                  description={solution.description}
                  variant={solution.variant}
                  onClick={() => {}}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProductModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        orderDemo={handleOrderDemo}
      />
    </div>
  );
};

export default DashboardProducts;
