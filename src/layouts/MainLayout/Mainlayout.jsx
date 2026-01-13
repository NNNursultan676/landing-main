/**
 * Главный макет сайта
 * Новая структура согласно референсам (Brex, Snowflake):
 * 1. Hero Section - главная секция с формой
 * 2. Trusted By - партнеры
 * 3. Products Overview - обзор продуктов
 * 4. About + Stats - о компании и статистика
 * 5. Feature Sections - детальные секции о продуктах
 * 6. Articles/Media - статьи и СМИ
 * 7. Team - команда
 * 8. Career - карьера
 * 9. CTA Section - призыв к действию
 * 10. Contacts - контакты
 * 11. Footer - подвал
 */
import { Layout } from 'antd';
import React from 'react';
import Nav from '../../layouts/Nav';
import BrexHero from '../../components/BrexHero/BrexHero';
import BrexTrustedBy from '../../components/BrexTrustedBy/BrexTrustedBy';
import BrexProducts from '../../components/BrexProducts/BrexProducts';
import BrexAbout from '../../components/BrexAbout/BrexAbout';
import BrexFeatures from '../../components/BrexFeatures/BrexFeatures';
import BrexArticles from '../../components/BrexArticles/BrexArticles';
import BrexTeam from '../../components/BrexTeam/BrexTeam';
import BrexCareer from '../../components/BrexCareer/BrexCareer';
import BrexContacts from '../../components/BrexContacts/BrexContacts';
import Footer from '../../layouts/Footer';
import './MainLayout.css';
import '../../layouts/Contacts/Contacts.css';

const Mainlayout = () => {
  return (
    <Layout>
      {/* Навигация */}
      <Nav />
      
      {/* 1. Brex Hero - Главная секция в стиле Brex */}
      <BrexHero />

      {/* 2. Brex Trusted By - Партнеры */}
      <div className="section-wrapper">
        <BrexTrustedBy />
      </div>

      {/* 3. Brex Products - Продукты в стиле Brex */}
      <div className="section-wrapper">
        <BrexProducts />
      </div>

      {/* 4. Brex About - О компании в стиле Brex */}
      <div className="section-wrapper">
        <BrexAbout />
      </div>

      {/* 5. Brex Features - Детальные секции о продуктах в стиле Brex */}
      <div className="section-wrapper">
        <BrexFeatures />
      </div>

      {/* 6. Brex Articles - Статьи в стиле Brex */}
      <div className="section-wrapper">
        <BrexArticles />
      </div>

      {/* 7. Brex Team - Команда в стиле Brex */}
      <div className="section-wrapper">
        <BrexTeam />
      </div>

      {/* 8. Brex Career - Карьера в стиле Brex */}
      <div className="section-wrapper">
        <BrexCareer />
      </div>

      {/* 9. Brex Contacts - Контакты в стиле Brex */}
      <div className="section-wrapper">
        <BrexContacts />
      </div>

      {/* 11. Footer - Подвал */}
      <Footer />
    </Layout>
  );
};

export default Mainlayout;
