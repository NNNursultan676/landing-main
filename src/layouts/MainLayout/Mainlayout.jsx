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
import HeroSection from '../../components/HeroSection/HeroSection';
import TrustedBySection from '../../components/TrustedBySection/TrustedBySection';
import SolutionsSection from '../../components/SolutionsSection/SolutionsSection';
import AboutStatsSection from '../../components/AboutStatsSection/AboutStatsSection';
import FeatureSection from '../../components/FeatureSection/FeatureSection';
import ArticlesSection from '../../components/ArticlesSection/ArticlesSection';
import TeamSection from '../../components/TeamSection/TeamSection';
import CareerSection from '../../components/CareerSection/CareerSection';
import CTASection from '../../components/CTASection/CTASection';
import ContactsMain from '../../components/ContactsMain/ContactsMain';
import Footer from '../../layouts/Footer';
import './MainLayout.css';
import '../../layouts/Contacts/Contacts.css';

const Mainlayout = () => {
  return (
    <Layout>
      {/* 1. Hero Section - Главная секция */}
      <HeroSection />

      {/* 2. Trusted By - Партнеры */}
      <div id="partners" className="section-wrapper">
        <TrustedBySection />
      </div>

      {/* 3. Products Overview - Обзор продуктов */}
      <div id="solutions" className="section-wrapper">
        <SolutionsSection />
      </div>

      {/* 4. About + Stats - О компании и статистика */}
      <div id="about" className="section-wrapper">
        <AboutStatsSection />
      </div>

      {/* 5. Feature Sections - Детальные секции о продуктах */}
      <div id="features" className="section-wrapper">
        <FeatureSection
          title="Кредитный конвейер — автоматизация всего цикла"
          description="Комплексное решение для автоматизации всего цикла кредитования — от подачи заявки до принятия решения и сопровождения. Вся система является 100% собственной разработкой, что позволяет гибко адаптироваться под требования клиентов и регуляторов. Благодаря автоматизации бизнес-процессов клиенты достигают до 50% оптимизации операционных расходов."
          imagePosition="left"
          variant="light"
          ctaText="Узнать больше о конвейере"
          image={
            <div style={{
              width: '100%',
              height: '400px',
              background: 'linear-gradient(135deg, #4a9eff 0%, #357abd 100%)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: '24px',
              fontWeight: 600
            }}>
              Кредитный конвейер
            </div>
          }
        />
        <FeatureSection
          title="Кредитный брокер — единая платформа для всех"
          description="Цифровая платформа, объединяющая дилерские центры, банки и МФО. Более 300 дилеров и 6 финансовых организаций уже работают через нашу платформу, обеспечивая быструю обработку заявок и прозрачность процесса. Платформа представлена более чем в 20 городах Казахстана."
          imagePosition="right"
          variant="default"
          ctaText="Узнать больше о брокере"
          image={
            <div style={{
              width: '100%',
              height: '400px',
              background: 'linear-gradient(135deg, #50F5B0 0%, #3dd89f 100%)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0f172a',
              fontSize: '24px',
              fontWeight: 600
            }}>
              Кредитный брокер
            </div>
          }
        />
      </div>

      {/* 6. Articles/Media - Статьи и СМИ */}
      <div id="articles" className="section-wrapper">
        <ArticlesSection />
      </div>

      {/* 7. Team - Команда */}
      <div id="team" className="section-wrapper">
        <TeamSection />
      </div>

      {/* 8. Career - Карьера */}
      <div id="career" className="section-wrapper">
        <CareerSection />
      </div>

      {/* 9. CTA Section - Призыв к действию */}
      <div className="section-wrapper">
        <CTASection />
      </div>

      {/* 10. Contacts - Контакты */}
      <div id="contacts" className="section-wrapper">
        <div className="contacts-section-content">
          <ContactsMain />
          <div className="contacts-wrapper">
            <div className="contacts-grid">
              {/* Карточка телефона */}
              <div className="contact-card">
                <div className="contact-card-icon">📞</div>
                <div className="contact-card-content">
                  <h3 className="contact-card-title">Телефон</h3>
                  <a href="tel:+77758805234" className="contact-card-link">+7 775 880 52 34</a>
                </div>
              </div>

              {/* Карточка email */}
              <div className="contact-card">
                <div className="contact-card-icon">✉️</div>
                <div className="contact-card-content">
                  <h3 className="contact-card-title">Email</h3>
                  <a href="mailto:info@sapatech.kz" className="contact-card-link">info@sapatech.kz</a>
                </div>
              </div>

              {/* Карточка адреса */}
              <div className="contact-card contact-card-address">
                <div className="contact-card-icon">📍</div>
                <div className="contact-card-content">
                  <h3 className="contact-card-title">Адрес</h3>
                  <p className="contact-card-text">г. Алматы, ул. Шашкина, 24, БЦ K Plaza</p>
                  <a 
                    href="https://2gis.kz/almaty/geo/70000001066943138/76.933728,43.222690" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className='contact-map-button'
                  >
                    Открыть в 2ГИС
                  </a>
                </div>
              </div>
            </div>

            {/* Карта */}
            <div className='contact-map-wrapper'>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2907.3761568922578!2d76.9312009773613!3d43.22257248017424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38836f24c6b92751%3A0x8e0755bb3661cfad!2z0YPQu9C40YbQsCDQl9C10LnQvdCwINCo0LDRiNC60LjQvdCwIDI0LCDQkNC70LzQsNGC0YsgMDUwMDYw!5e0!3m2!1sru!2skz!4v1723115930036!5m2!1sru!2skz"
                className='contact-map'
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Карта офиса Sapa Technologies"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 11. Footer - Подвал */}
      <Footer />
    </Layout>
  );
};

export default Mainlayout;
