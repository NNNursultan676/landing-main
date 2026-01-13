/**
 * Brex-style Team Section
 * Белый фон, чистый дизайн
 */
import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { TeamOutlined } from '@ant-design/icons';
import './BrexTeam.css';

const { Title, Paragraph } = Typography;
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.sapatech.kz/api' 
  : 'http://localhost:3002/api';

const BrexTeam = () => {
  const { t } = useTranslation();
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await axios.get(`${API_URL}/team`);
        setTeamData(response.data);
      } catch (error) {
        console.error('Ошибка загрузки данных команды:', error);
        setTeamData({
          description: 'Сегодня в команде работает 40+ сотрудников, а наши решения уже используются в 20+ GovTech-проектах.',
          employeesCount: 40,
          photos: ['https://storage.yandexcloud.kz/sapaedu/Sapa%202-106.jpg'],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, [t]);

  if (loading) {
    return <div className="brex-team">Загрузка...</div>;
  }

  return (
    <div id="team" className="brex-team">
      <div className="brex-team-container">
        <div className="brex-team-header">
          <Title level={2} className="brex-team-title">
            {t('team.title') || 'Наша команда'}
          </Title>
          <Paragraph className="brex-team-subtitle">
            {t('team.subtitle') || '40+ профессионалов работают над созданием лучших решений'}
          </Paragraph>
        </div>

        <Row gutter={[40, 40]}>
          <Col xs={24} lg={12}>
            <Card className="brex-team-card">
              <div className="brex-team-icon">
                <TeamOutlined />
              </div>
              <div className="brex-team-stat">
                40+
              </div>
              <div className="brex-team-stat-label">
                Сотрудников
              </div>
              <Paragraph className="brex-team-description">
                Сегодня в команде работает 40+ сотрудников, а наши решения уже используются в 20+ GovTech-проектах.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card className="brex-team-photo-card">
              <div className="brex-team-photo-container">
                <img 
                  src={teamData?.photos && teamData.photos.length > 0 
                    ? teamData.photos[0] 
                    : "https://storage.yandexcloud.kz/sapaedu/Sapa%202-106.jpg"} 
                  alt="Фото команды Sapa Technologies" 
                  className="brex-team-photo"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const placeholder = e.target.nextElementSibling;
                    if (placeholder) {
                      placeholder.style.display = 'block';
                    }
                  }}
                />
                <div className="brex-team-photo-placeholder" style={{ display: 'none' }}>
                  <TeamOutlined style={{ fontSize: 64, color: '#cbd5e1', marginBottom: 16 }} />
                  <p>Фото команды с фотосессии</p>
                  <p className="brex-team-photo-note">
                    Загрузите фото через админ-панель
                  </p>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default BrexTeam;
