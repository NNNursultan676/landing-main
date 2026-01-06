// src/pages/Products/Products.jsx

import React from 'react';
import { Layout, Row, Col } from 'antd';
import ProductsMain from '../../components/ProductsMain/ProductsMain';
import Footer from '../../layouts/Footer';
import { useTranslation } from 'react-i18next';
import ServiceSection from '../../components/ServiceSection/ServiceSection';
import CreditConveyorImg from '../../assets/images/ConveyerSvg.svg';
import CreditBrokerImg from '../../assets/images/credit-broker.svg';
import CustomSolutionsImg from '../../assets/images/custom-solutions.svg';
import BenefitsSection from '../../components/BenefitsSection/BenefitsSection';
import './Products.css'; // Ensure this CSS file includes the .products-container styles

const Products = () => {
  const { t } = useTranslation();

  const servicesData = [
    {
      key: 'creditConveyor',
      title: t('productsRes.creditConveyor.title'),
      subtitle: t('productsRes.creditConveyor.subtitle'),
      image: CreditConveyorImg,
      points: t('productsRes.creditConveyor.points', { returnObjects: true }),
      benefits: {
        headline: t('productsRes.creditConveyor.benefits.headline'),
        benefitsList: t('productsRes.creditConveyor.benefits.benefitsList', { returnObjects: true }),
        buttonText: t('productsRes.creditConveyor.benefits.buttonText'),
      },
    },
    {
      key: 'creditBroker',
      title: t('productsRes.creditBroker.title'),
      subtitle: t('productsRes.creditBroker.subtitle'),
      image: CreditBrokerImg,
      points: t('productsRes.creditBroker.points', { returnObjects: true }),
      benefits: {
        headline: t('productsRes.creditBroker.benefits.headline'),
        benefitsList: t('productsRes.creditBroker.benefits.benefitsList', { returnObjects: true }),
        buttonText: t('productsRes.creditBroker.benefits.buttonText'),
      },
    },
    {
      key: 'customSolutions',
      title: t('productsRes.customSolutions.title'),
      subtitle: t('productsRes.customSolutions.subtitle'),
      image: CustomSolutionsImg,
      points: t('productsRes.customSolutions.points', { returnObjects: true }),
      benefits: {
        headline: t('productsRes.customSolutions.benefits.headline'),
        benefitsList: t('productsRes.customSolutions.benefits.benefitsList', { returnObjects: true }),
        buttonText: t('productsRes.customSolutions.benefits.buttonText'),
      },
    },
  ];

  return (
    <Layout>
      <ProductsMain />
      <div className='products-container'>
        <Row gutter={[16, 16]} justify="center">
          {servicesData.map((service) => (
            <Col key={service.key} xs={24} sm={24} md={24}>
              <ServiceSection
                title={service.title}
                subtitle={service.subtitle}
                image={service.image}
                points={service.points}
              />
              <BenefitsSection
                headline={service.benefits.headline}
                benefits={service.benefits.benefitsList}
                buttonText={service.benefits.buttonText}
              />
            </Col>
          ))}
        </Row>
      </div>
      <Footer />
    </Layout>
  );
};

export default Products;
