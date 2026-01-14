/**
 * Компонент раздела "Команда/Сотрудники"
 * Отображает информацию о команде и фото с фотосессии
 */
import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './TeamSection.css';

const { Title, Paragraph } = Typography;
const API_URL = 'http://localhost:3002/api';

const TeamSection = () => {
  const { t } = useTranslation();
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Загрузка данных о команде из API
  useEffect(() => {
    const fetchTeamData = async () => {
      // В продакшне (GitHub Pages) API недоступен, поэтому сразу используем статические данные.
      if (process.env.NODE_ENV === 'production') {
        setTeamData({
          description: t('team.description'),
          employeesCount: 40,
          photos: [],
        });
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/team`);
        setTeamData(response.data);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error('Ошибка загрузки данных команды:', error);
        }
        // Fallback на данные по умолчанию
        setTeamData({
          description: t('team.description'),
          employeesCount: 40,
          photos: [],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, [t]);

  if (loading) {
    return (
      <div className="team-section">
        {t('team.loading')}
      </div>
    );
  }

  return (
    <div id="team" className="team-section">
      <div className="team-container">
        <Title level={2} className="team-title">
          {t('team.title')}
        </Title>
        <Paragraph className="team-subtitle">
          {t('team.subtitle')}
        </Paragraph>

        <div className="team-content">
          <Row gutter={[40, 40]}>
            <Col xs={24} lg={12}>
              <Card className="team-info-card">
                <div className="team-stats">
                  <div className="team-stat-number">
                    {teamData?.employeesCount || 40}+
                  </div>
                  <div className="team-stat-label">
                    {t('team.employees')}
                  </div>
                </div>
                <Paragraph className="team-description">
                  {teamData?.description || t('team.description')}
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <div className="team-photos">
                <div className="team-photo-placeholder">
                  <p>{t('team.photoPlaceholder')}</p>
                  <p className="placeholder-note">
                    {t('team.photoNote')}
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
