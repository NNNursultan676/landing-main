/**
 * Brex-style Products Section
 * Чистые карточки с иконками, минималистичный дизайн
 */
import React, { useState } from 'react';
import { Typography, Row, Col, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import { 
  ThunderboltOutlined, 
  GlobalOutlined, 
  RocketOutlined 
} from '@ant-design/icons';
import ProductModal from '../ProductModal/ProductModal';
import modalService from '../../services/modalService';
import './BrexProducts.css';

const { Title, Paragraph } = Typography;

const BrexProducts = () => {
  const { t } = useTranslation();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const products = [
    {
      id: 'conveyor',
      icon: <ThunderboltOutlined />,
      title: t('solutionCreditConveyorTitle'),
      description: t('solutionCreditConveyorDesc'),
      subTitle: t('productsRes.creditConveyor.subtitle'),
      points: t('productsRes.creditConveyor.points', { returnObjects: true }),
      benefits: t('productsRes.creditConveyor.benefits.benefitsList', { returnObjects: true }),
      color: '#4a9eff',
    },
    {
      id: 'broker',
      icon: <GlobalOutlined />,
      title: t('solutionCreditBrokerTitle'),
      description: t('solutionCreditBrokerDesc'),
      subTitle: t('productsRes.creditBroker.subtitle'),
      points: t('productsRes.creditBroker.points', { returnObjects: true }),
      benefits: t('productsRes.creditBroker.benefits.benefitsList', { returnObjects: true }),
      color: '#50F5B0',
    },
    {
      id: 'custom',
      icon: <RocketOutlined />,
      title: t('solutionCustomSolutionsTitle'),
      description: t('solutionCustomSolutionsDesc'),
      subTitle: t('productsRes.customSolutions.subtitle'),
      points: t('productsRes.customSolutions.points', { returnObjects: true }),
      benefits: t('productsRes.customSolutions.benefits.benefitsList', { returnObjects: true }),
      color: '#ff6b6b',
    },
  ];

  const handleProductClick = (product) => {
    setSelectedProduct({
      ...product,
      variant: product.id,
      projects: { title: t('products.modal.capabilities'), elements: product.points },
      services: { title: t('products.modal.benefits'), elements: product.benefits },
    });
    setIsModalOpen(true);
  };

  const handleOrderDemo = () => {
    setIsModalOpen(false);
    const demoText = t('demoText');
    modalService.openModal(demoText);
  };

  return (
    <div id="solutions" className="brex-products">
      <div className="brex-products-container">
        <div className="brex-products-header">
          <Title level={2} className="brex-products-title">
            {t('solutionTitle1') || 'Инновационные решения'}
          </Title>
          <Paragraph className="brex-products-subtitle">
            {t('solutionTitle3') || 'Для вашего бизнеса'}
          </Paragraph>
        </div>

        <Row gutter={[32, 32]} className="brex-products-grid">
          {products.map((product) => (
            <Col xs={24} sm={12} lg={8} key={product.id}>
              <Card 
                className="brex-product-card"
                hoverable
                onClick={() => handleProductClick(product)}
              >
                <div className="brex-product-icon" style={{ color: product.color }}>
                  {product.icon}
                </div>
                <Title level={4} className="brex-product-title">
                  {product.title}
                </Title>
                <Paragraph className="brex-product-description">
                  {product.description}
                </Paragraph>
                <div className="brex-product-link">
                  {t('products.learnMore')}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
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

export default BrexProducts;
