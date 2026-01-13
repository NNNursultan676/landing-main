/**
 * Компонент раздела "Статьи/СМИ о нас"
 * Отображает карточки со статьями из API
 */
import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './ArticlesSection.css';

const { Title, Paragraph } = Typography;
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.sapatech.kz/api' 
  : 'http://localhost:3002/api';

const ArticlesSection = () => {
  const { t } = useTranslation();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Загрузка статей из API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${API_URL}/articles`);
        setArticles(response.data);
      } catch (error) {
        console.error('Ошибка загрузки статей:', error);
        // Fallback на статические данные, если API недоступен
        setArticles([
          {
            id: '1',
            title: 'Как сделать кредитование быстрее, прозрачнее и удобнее для всех участников',
            source: 'Forbes Kazakhstan',
            url: 'https://forbes.kz/articles/kak-sdelat-kreditovanie-bystree-prozrachnee-i-udobnee-dlya-vseh-uchastnikov-33c466',
          },
          {
            id: '2',
            title: 'Как казахстанский стартап SapaTech автоматизирует кредитование',
            source: 'Digital Business',
            url: 'https://digitalbusiness.kz/2025-04-16/kak-kazahstanskiy-startap-sapatech-avtomatiziruet-kreditovanie/',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div id="articles" className="articles-section">
      <div className="articles-container">
        <Title level={2} className="articles-title">
          {t('articles.title')}
        </Title>
        <Paragraph className="articles-subtitle">
          {t('articles.subtitle')}
        </Paragraph>

        <Row gutter={[24, 24]} className="articles-grid">
          {articles.map((article) => (
            <Col xs={24} sm={12} lg={8} key={article.id}>
              <Card
                hoverable
                className="article-card"
                onClick={() => window.open(article.url, '_blank', 'noopener,noreferrer')}
              >
                <div className="article-source">{article.source}</div>
                <Title level={4} className="article-title">
                  {article.title}
                </Title>
                {article.description && (
                  <Paragraph className="article-description" ellipsis={{ rows: 3 }}>
                    {article.description}
                  </Paragraph>
                )}
                <div className="article-link">
                  {t('articles.readMore')} →
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default ArticlesSection;
