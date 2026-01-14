/**
 * Brex-style Articles Section
 * Белый фон, чистые карточки с каруселью
 */
import React, { useState, useEffect, useRef } from 'react';
import { Typography, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FileTextOutlined, ArrowRightOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import './BrexArticles.css';

const { Title, Paragraph } = Typography;
const API_URL = 'http://localhost:3002/api';

const BrexArticles = () => {
  const { t } = useTranslation();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchArticles = async () => {
      // В продакшне (GitHub Pages) API недоступен, поэтому сразу используем статический список статей.
      if (process.env.NODE_ENV === 'production') {
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
          {
            id: '3',
            title: 'Sapa Technologies в Instagram',
            source: 'Instagram',
            url: 'https://www.instagram.com/p/DIfvw8Bs1sT/',
            image: 'https://digitalbusiness.kz/wp-content/uploads/2025/04/photo_2025-04-16_10-31-37.jpg',
          },
          {
            id: '4',
            title: 'Микрокредитование: будущее доступного кредитования',
            source: 'Stan.kz',
            url: 'https://stan.kz/mikrokarzhilandirudin-bolashagi-salalik-kezdesudin-negi-426037/',
            image: 'https://stan.kz/download/uploads/2025/11/full_1762834372e9c8d85611aec741b9fd119ff9b3d200_webp.webp',
          },
          {
            id: '5',
            title: 'Sapa Technologies в Tengenomika',
            source: 'Tengenomika',
            url: 'https://t.me/tengenomika/7961',
            image: 'https://storage.yandexcloud.kz/sapaedu/photo_2026-01-13_20-15-06.jpg',
          },
          {
            id: '6',
            title: 'Sapa Technologies в Finance.kz',
            source: 'Finance.kz',
            url: 'https://t.me/FINANCEkaz/17371',
            image: 'https://storage.yandexcloud.kz/sapaedu/ChatGPT%20Image%2013%20%D1%8F%D0%BD%D0%B2.%202026%20%D0%B3.%2C%2020_28_46.png',
          },
        ]);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/articles`);
        setArticles(response.data);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error('Ошибка загрузки статей:', error);
        }
        // Все статьи из README
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
          {
            id: '3',
            title: 'Sapa Technologies в Instagram',
            source: 'Instagram',
            url: 'https://www.instagram.com/p/DIfvw8Bs1sT/',
            image: 'https://digitalbusiness.kz/wp-content/uploads/2025/04/photo_2025-04-16_10-31-37.jpg',
          },
          {
            id: '4',
            title: 'Микрокредитование: будущее доступного кредитования',
            source: 'Stan.kz',
            url: 'https://stan.kz/mikrokarzhilandirudin-bolashagi-salalik-kezdesudin-negi-426037/',
            image: 'https://stan.kz/download/uploads/2025/11/full_1762834372e9c8d85611aec741b9fd119ff9b3d200_webp.webp',
          },
          {
            id: '5',
            title: 'Sapa Technologies в Tengenomika',
            source: 'Tengenomika',
            url: 'https://t.me/tengenomika/7961',
            image: 'https://storage.yandexcloud.kz/sapaedu/photo_2026-01-13_20-15-06.jpg',
          },
          {
            id: '6',
            title: 'Sapa Technologies в Finance.kz',
            source: 'Finance.kz',
            url: 'https://t.me/FINANCEkaz/17371',
            image: 'https://storage.yandexcloud.kz/sapaedu/ChatGPT%20Image%2013%20%D1%8F%D0%BD%D0%B2.%202026%20%D0%B3.%2C%2020_28_46.png',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    variableWidth: false,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  const next = () => {
    sliderRef.current?.slickNext();
  };

  const previous = () => {
    sliderRef.current?.slickPrev();
  };

  if (loading) {
    return (
      <div className="brex-articles">
        {t('articles.loading')}
      </div>
    );
  }

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

        <div className="brex-articles-carousel-wrapper">
          <button className="brex-articles-arrow brex-articles-arrow-left" onClick={previous}>
            <LeftOutlined />
          </button>
          
          <div className="brex-articles-carousel">
            <Slider ref={sliderRef} {...settings}>
              {articles.map((article) => (
                <div key={article.id} className="brex-article-slide">
                  <Card 
                    className="brex-article-card"
                    hoverable
                    onClick={() => window.open(article.url, '_blank', 'noopener,noreferrer')}
                    cover={article.image ? (
                      <div className="brex-article-image-container">
                        <img 
                          src={article.image} 
                          alt={article.title}
                          className="brex-article-image"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    ) : (
                      <div className="brex-article-icon">
                        <FileTextOutlined />
                      </div>
                    )}
                  >
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
                      {t('articles.readMore')} <ArrowRightOutlined />
                    </div>
                  </Card>
                </div>
              ))}
            </Slider>
          </div>

          <button className="brex-articles-arrow brex-articles-arrow-right" onClick={next}>
            <RightOutlined />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrexArticles;
