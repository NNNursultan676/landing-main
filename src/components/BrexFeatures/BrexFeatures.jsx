/**
 * Brex-style Feature Sections
 * Чередующиеся секции с описанием продуктов
 */
import React from 'react';
import { Typography, Row, Col, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import modalService from '../../services/modalService';
import { ArrowRightOutlined } from '@ant-design/icons';
import './BrexFeatures.css';

const { Title, Paragraph } = Typography;

const BrexFeatures = () => {
  const { t } = useTranslation();

  const handleCTA = () => {
    const demoText = t('demoText');
    modalService.openModal(demoText);
  };

  return (
    <div id="features" className="brex-features">
      <div className="brex-features-container">
        {/* Секция 1: Кредитный конвейер */}
        <div className="brex-feature-section">
          <Row gutter={[80, 40]} align="middle">
            <Col xs={24} lg={12}>
              <div className="brex-feature-image-placeholder brex-feature-image-1">
                <div className="brex-feature-image-content">
                  {t('features.conveyor.imageLabel')}
                </div>
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <div className="brex-feature-content">
                <Title level={3} className="brex-feature-title">
                  {t('features.conveyor.title')}
                </Title>
                <Paragraph className="brex-feature-description">
                  {t('features.conveyor.description')}
                </Paragraph>
                <Button
                  type="primary"
                  size="large"
                  onClick={handleCTA}
                  className="brex-feature-button"
                  icon={<ArrowRightOutlined />}
                >
                  {t('features.conveyor.button')}
                </Button>
              </div>
            </Col>
          </Row>
        </div>

        {/* Секция 2: Кредитный брокер */}
        <div className="brex-feature-section brex-feature-section-reverse">
          <Row gutter={[80, 40]} align="middle">
            <Col xs={24} lg={12}>
              <div className="brex-feature-content">
                <Title level={3} className="brex-feature-title">
                  {t('features.broker.title')}
                </Title>
                <Paragraph className="brex-feature-description">
                  {t('features.broker.description')}
                </Paragraph>
                <Button
                  type="primary"
                  size="large"
                  onClick={handleCTA}
                  className="brex-feature-button"
                  icon={<ArrowRightOutlined />}
                >
                  {t('features.broker.button')}
                </Button>
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <div className="brex-feature-image-placeholder brex-feature-image-2">
                <div className="brex-feature-image-content">
                  {t('features.broker.imageLabel')}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default BrexFeatures;
