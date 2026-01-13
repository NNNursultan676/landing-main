/**
 * Feature Section - Детальная секция о продукте/функции
 * Следует структуре референсов (Brex)
 * Чередующиеся секции с изображением слева/справа
 */
import React from 'react';
import { Typography, Button, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import modalService from '../../services/modalService';
import './FeatureSection.css';

const { Title, Paragraph } = Typography;

const FeatureSection = ({ 
  title, 
  description, 
  image, 
  imagePosition = 'left', // 'left' or 'right'
  ctaText = 'Узнать больше',
  ctaLink,
  variant = 'default' // 'default', 'dark', 'light'
}) => {
  const { t } = useTranslation();

  const handleCTA = () => {
    if (ctaLink) {
      // Можно добавить навигацию
    } else {
      const demoText = t('demoText');
      modalService.openModal(demoText);
    }
  };

  const content = (
    <div className="feature-content">
      <Title level={3} className="feature-title">
        {title}
      </Title>
      <Paragraph className="feature-description">
        {description}
      </Paragraph>
      <Button
        type="primary"
        size="large"
        onClick={handleCTA}
        className="feature-cta"
      >
        {ctaText} →
      </Button>
    </div>
  );

  const imageElement = image && (
    <div className="feature-image-wrapper">
      <div className="feature-image">
        {typeof image === 'string' ? (
          <img src={image} alt={title} />
        ) : (
          image
        )}
      </div>
    </div>
  );

  return (
    <div className={`feature-section feature-section-${variant} feature-section-${imagePosition}`}>
      <div className="feature-container">
        <Row gutter={[80, 40]} align="middle">
          {imagePosition === 'left' ? (
            <>
              <Col xs={24} lg={12}>
                {imageElement}
              </Col>
              <Col xs={24} lg={12}>
                {content}
              </Col>
            </>
          ) : (
            <>
              <Col xs={24} lg={12}>
                {content}
              </Col>
              <Col xs={24} lg={12}>
                {imageElement}
              </Col>
            </>
          )}
        </Row>
      </div>
    </div>
  );
};

export default FeatureSection;
