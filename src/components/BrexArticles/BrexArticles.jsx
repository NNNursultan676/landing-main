/**
 * Brex-style Articles Section
 * Белый фон, чистые карточки
 */
import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { FileTextOutlined, ArrowRightOutlined } from '@ant-design/icons';
import './BrexArticles.css';

const { Title, Paragraph } = Typography;
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.sapatech.kz/api' 
  : 'http://localhost:3002/api';

const BrexArticles = () => {
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
        // Все статьи из README
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
          {
            id: '3',
            title: 'Sapa Technologies в Instagram',
            source: 'Instagram',
            url: 'https://www.instagram.com/p/DIfvw8Bs1sT/',
          },
          {
            id: '4',
            title: 'Микрокредитование: будущее доступного кредитования',
            source: 'Stan.kz',
            url: 'https://stan.kz/mikrokarzhilandirudin-bolashagi-salalik-kezdesudin-negi-426037/',
          },
          {
            id: '5',
            title: 'Sapa Technologies в Tengenomika',
            source: 'Tengenomika',
            url: 'https://t.me/tengenomika/7961',
          },
          {
            id: '6',
            title: 'Sapa Technologies в Finance.kz',
            source: 'Finance.kz',
            url: 'https://t.me/FINANCEkaz/17371',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div id="articles" className="brex-articles">
      <div className="brex-articles-container">
        <div className="brex-articles-header">
          <Title level={2} className="brex-articles-title">
            {t('articles.title') || 'СМИ о нас'}
          </Title>
          <Paragraph className="brex-articles-subtitle">
            {t('articles.subtitle') || 'Что пишут о нас в медиа'}
          </Paragraph>
        </div>

        <Row gutter={[24, 24]} className="brex-articles-grid">
          {articles.map((article) => (
            <Col xs={24} sm={12} lg={8} key={article.id}>
              <Card 
                className="brex-article-card"
                hoverable
                onClick={() => window.open(article.url, '_blank', 'noopener,noreferrer')}
              >
                <div className="brex-article-icon">
                  <FileTextOutlined />
                </div>
                <div className="brex-article-source">{article.source}</div>
                <Title level={4} className="brex-article-title">
                  {article.title}
                </Title>
                {article.description && (
                  <Paragraph className="brex-article-description" ellipsis={{ rows: 3 }}>
                    {article.description}
                  </Paragraph>
                )}
                <div className="brex-article-link">
                  Читать статью <ArrowRightOutlined />
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default BrexArticles;
