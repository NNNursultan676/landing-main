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
                  Кредитный конвейер
                </div>
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <div className="brex-feature-content">
                <Title level={3} className="brex-feature-title">
                  Кредитный конвейер — автоматизация всего цикла
                </Title>
                <Paragraph className="brex-feature-description">
                  Комплексное решение для автоматизации всего цикла кредитования — от подачи заявки до принятия решения и сопровождения. Вся система является 100% собственной разработкой, что позволяет гибко адаптироваться под требования клиентов и регуляторов. Благодаря автоматизации бизнес-процессов клиенты достигают до 50% оптимизации операционных расходов.
                </Paragraph>
                <Button
                  type="primary"
                  size="large"
                  onClick={handleCTA}
                  className="brex-feature-button"
                  icon={<ArrowRightOutlined />}
                >
                  Узнать больше о конвейере
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
                  Кредитный брокер — единая платформа для всех
                </Title>
                <Paragraph className="brex-feature-description">
                  Цифровая платформа, объединяющая дилерские центры, банки и МФО. Более 300 дилеров и 6 финансовых организаций уже работают через нашу платформу, обеспечивая быструю обработку заявок и прозрачность процесса. Платформа представлена более чем в 20 городах Казахстана.
                </Paragraph>
                <Button
                  type="primary"
                  size="large"
                  onClick={handleCTA}
                  className="brex-feature-button"
                  icon={<ArrowRightOutlined />}
                >
                  Узнать больше о брокере
                </Button>
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <div className="brex-feature-image-placeholder brex-feature-image-2">
                <div className="brex-feature-image-content">
                  Кредитный брокер
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
