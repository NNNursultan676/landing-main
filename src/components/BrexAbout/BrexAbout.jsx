/**
 * Brex-style About Section
 * Белый фон, структурированный layout
 */
import React from 'react';
import { Typography, Row, Col, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import { 
  ThunderboltOutlined, 
  GlobalOutlined, 
  HeartOutlined 
} from '@ant-design/icons';
import './BrexAbout.css';

const { Title, Paragraph } = Typography;

const BrexAbout = () => {
  const { t } = useTranslation();

  const stats = [
    {
      icon: <ThunderboltOutlined />,
      value: t('statsValue1'),
      label: t('statslabel1'),
      description: t('statsDesc1'),
      color: '#4a9eff',
    },
    {
      icon: <GlobalOutlined />,
      value: t('statsValue2'),
      label: t('statslabel2'),
      description: t('statsDesc2'),
      color: '#50F5B0',
    },
    {
      icon: <HeartOutlined />,
      value: t('statsValue3'),
      label: t('statslabel3'),
      description: t('statsDesc3'),
      color: '#ff6b6b',
    },
  ];

  return (
    <div id="about" className="brex-about">
      <div className="brex-about-container">
        <Row gutter={[80, 60]} align="middle">
          <Col xs={24} lg={12}>
            <div className="brex-about-content">
              <Title level={2} className="brex-about-title">
                {t('aboutTitle')}
              </Title>
              <Paragraph className="brex-about-text">
                {t('aboutText1')}
              </Paragraph>
              <Paragraph className="brex-about-text">
                {t('aboutText2')}
              </Paragraph>
              <Paragraph className="brex-about-text">
                {t('aboutText3')}
              </Paragraph>
              {t('aboutText4') && (
                <div className="brex-about-nps">
                  <HeartOutlined /> {t('aboutText4')}
                </div>
              )}
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className="brex-stats-grid">
              {stats.map((stat, index) => (
                <Card key={index} className="brex-stat-card" hoverable>
                  <div className="brex-stat-icon" style={{ color: stat.color }}>
                    {stat.icon}
                  </div>
                  <div className="brex-stat-value">{stat.value}</div>
                  <div className="brex-stat-label">{stat.label}</div>
                  <div className="brex-stat-description">{stat.description}</div>
                </Card>
              ))}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default BrexAbout;
