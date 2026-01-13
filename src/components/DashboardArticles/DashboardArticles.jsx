/**
 * Dashboard Articles - Статьи в стиле dashboard
 * Уникальные карточки с hover эффектами
 */
import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { FileTextOutlined, ArrowRightOutlined } from '@ant-design/icons';
import './DashboardArticles.css';

const { Title, Paragraph } = Typography;
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.sapatech.kz/api' 
  : 'http://localhost:3002/api';

const DashboardArticles = () => {
  const { t } = useTranslation();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${API_URL}/articles`);
        setArticles(response.data);
      } catch (error) {
        console.error('Ошибка загрузки статей:', error);
        setArticles([
          {
            id: '1',
            title: 'Как сделать кредитование быстрее, прозрачнее и удобнее для всех участников',
            source: 'Forbes Kazakhstan',
            url: 'https://forbes.kz/articles/kak-sdelat-kreditovanie-bystree-prozrachnee-i-udobnee-dlya-vseh-uchastnikov-33c466',
            image: 'https://img.forbes.kz/forbes-photobank/media/2025-04-14/c8024a19-1a34-4967-8bda-850d83f9214d.webp',
          },
          {
            id: '2',
            title: 'Как казахстанский стартап SapaTech автоматизирует кредитование',
            source: 'Digital Business',
            url: 'https://digitalbusiness.kz/2025-04-16/kak-kazahstanskiy-startap-sapatech-avtomatiziruet-kreditovanie/',
            image: 'https://digitalbusiness.kz/wp-content/uploads/2025/04/photo_2025-04-16_10-31-31-1024x682.jpg',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const gradients = [
    'linear-gradient(135deg, #4a9eff 0%, #357abd 100%)',
    'linear-gradient(135deg, #50F5B0 0%, #3dd89f 100%)',
    'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
  ];

  return (
    <div id="articles" className="dashboard-articles">
      <div className="dashboard-articles-container">
        <div className="dashboard-articles-header">
          <div className="section-badge">СМИ о нас</div>
          <Title level={2} className="dashboard-articles-title">
            {t('articles.title') || 'СМИ о нас'}
          </Title>
          <Paragraph className="dashboard-articles-subtitle">
            {t('articles.subtitle') || 'Что пишут о нас в медиа'}
          </Paragraph>
        </div>

        <div className="dashboard-articles-grid">
          {articles.map((article, index) => (
            <div 
              key={article.id}
              className={`article-card-wrapper article-card-${index + 1}`}
              onClick={() => window.open(article.url, '_blank', 'noopener,noreferrer')}
            >
              <div 
                className="article-card-glow" 
                style={{ background: gradients[index % gradients.length] }}
              />
              <Card 
                className="dashboard-article-card" 
                hoverable
                cover={article.image ? (
                  <div className="article-image-container">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="article-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                ) : (
                  <div className="article-icon">
                    <FileTextOutlined />
                  </div>
                )}
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
                  Читать статью <ArrowRightOutlined />
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardArticles;
