/**
 * Dashboard About - О компании в стиле dashboard
 * Интерактивная статистика с анимациями
 */
import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import { 
  ThunderboltOutlined, 
  GlobalOutlined, 
  HeartOutlined,
  ArrowUpOutlined
} from '@ant-design/icons';
import './DashboardAbout.css';

const { Title, Paragraph } = Typography;

const DashboardAbout = () => {
  const { t } = useTranslation();
  const [animatedStats, setAnimatedStats] = useState({
    optimization: 0,
    partners: 0,
    nps: 0
  });

  useEffect(() => {
    const animateValue = (start, end, duration, key) => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        setAnimatedStats(prev => ({ ...prev, [key]: value }));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    setTimeout(() => {
      animateValue(0, 50, 2000, 'optimization');
      animateValue(0, 300, 2000, 'partners');
      animateValue(0, 93, 2000, 'nps');
    }, 300);
  }, []);

  const stats = [
    {
      value: `${animatedStats.optimization}%`,
      label: t('statslabel1'),
      description: t('statsDesc1'),
      icon: <ThunderboltOutlined />,
      gradient: 'linear-gradient(135deg, #4a9eff 0%, #357abd 100%)',
      color: '#4a9eff',
    },
    {
      value: `${animatedStats.partners}+`,
      label: t('statslabel2'),
      description: t('statsDesc2'),
      icon: <GlobalOutlined />,
      gradient: 'linear-gradient(135deg, #50F5B0 0%, #3dd89f 100%)',
      color: '#50F5B0',
    },
    {
      value: `${animatedStats.nps}%`,
      label: t('statslabel3'),
      description: t('statsDesc3'),
      icon: <HeartOutlined />,
      gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
      color: '#ff6b6b',
    },
  ];

  return (
    <div id="about" className="dashboard-about">
      <div className="dashboard-about-container">
        <div className="dashboard-about-header">
          <div className="section-badge">О компании</div>
          <Title level={2} className="dashboard-about-title">
            {t('aboutTitle')}
          </Title>
        </div>

        <Row gutter={[60, 60]} align="middle">
          <Col xs={24} lg={12}>
            <div className="dashboard-about-content">
              <Paragraph className="about-text-main">
                {t('aboutText1')}
              </Paragraph>
              <Paragraph className="about-text">
                {t('aboutText2')}
              </Paragraph>
              <Paragraph className="about-text">
                {t('aboutText3')}
              </Paragraph>
              {t('aboutText4') && (
                <div className="about-nps-badge">
                  <HeartOutlined /> {t('aboutText4')}
                </div>
              )}
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className="dashboard-stats-grid">
              {stats.map((stat, index) => (
                <Card 
                  key={index}
                  className={`dashboard-stat-card stat-card-${index + 1}`}
                  hoverable
                >
                  <div className="stat-card-glow" style={{ background: stat.gradient }} />
                  <div className="stat-icon-wrapper" style={{ color: stat.color }}>
                    {stat.icon}
                  </div>
                  <div className="stat-value-wrapper">
                    <div className="stat-value">{stat.value}</div>
                    <ArrowUpOutlined className="stat-trend" />
                  </div>
                  <div className="stat-label">{stat.label}</div>
                  <div className="stat-description">{stat.description}</div>
                </Card>
              ))}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DashboardAbout;
