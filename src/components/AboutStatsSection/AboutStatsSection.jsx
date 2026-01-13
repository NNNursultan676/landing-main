/**
 * About + Stats Section - Секция о компании со статистикой
 * Следует структуре референсов (Brex)
 * Объединяет информацию о компании и статистику
 */
import React from 'react';
import { Typography, Row, Col, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import './AboutStatsSection.css';

const { Title, Paragraph } = Typography;

const AboutStatsSection = () => {
  const { t } = useTranslation();

  return (
    <div id="about" className="about-stats-section">
      <div className="about-stats-container">
        <Row gutter={[80, 60]} align="middle">
          <Col xs={24} lg={12}>
            <div className="about-content">
              <Title level={2} className="about-section-title">
                {t('aboutTitle')}
              </Title>
              <Paragraph className="about-text">
                {t('aboutText1')}
              </Paragraph>
              <Paragraph className="about-text">
                {t('aboutText2')}
              </Paragraph>
              <Paragraph className="about-text">
                {t('aboutText3')}
              </Paragraph>
              {t('aboutText4') && (
                <Paragraph className="about-text about-text-nps">
                  {t('aboutText4')}
                </Paragraph>
              )}
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className="stats-grid">
              <Card className="stat-card">
                <div className="stat-value">{t('statsValue1')}</div>
                <div className="stat-label">{t('statslabel1')}</div>
                <div className="stat-description">{t('statsDesc1')}</div>
              </Card>
              <Card className="stat-card">
                <div className="stat-value">{t('statsValue2')}</div>
                <div className="stat-label">{t('statslabel2')}</div>
                <div className="stat-description">{t('statsDesc2')}</div>
              </Card>
              <Card className="stat-card">
                <div className="stat-value">{t('statsValue3')}</div>
                <div className="stat-label">{t('statslabel3')}</div>
                <div className="stat-description">{t('statsDesc3')}</div>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AboutStatsSection;
