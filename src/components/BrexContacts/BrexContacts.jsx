/**
 * Brex-style Contacts Section
 * Белый фон, минималистичный дизайн
 */
import React from 'react';
import { Typography, Row, Col, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import { PhoneOutlined, MailOutlined, EnvironmentOutlined } from '@ant-design/icons';
import './BrexContacts.css';

const { Title, Paragraph } = Typography;

const BrexContacts = () => {
  const { t } = useTranslation();

  return (
    <div id="contacts" className="brex-contacts">
      <div className="brex-contacts-container">
        <div className="brex-contacts-header">
          <Title level={2} className="brex-contacts-title">
            {t('contactUs') || 'Контакты'}
          </Title>
          <Paragraph className="brex-contacts-subtitle">
            {t('contactsSection.subtitle')}
          </Paragraph>
        </div>

        <Row gutter={[24, 24]} className="brex-contacts-grid">
          <Col xs={24} sm={12} lg={8}>
            <Card className="brex-contact-card" hoverable>
              <div className="brex-contact-icon">
                <PhoneOutlined />
              </div>
              <Title level={4} className="brex-contact-title">
                {t('contactsSection.phone')}
              </Title>
              <a href="tel:+77758805234" className="brex-contact-link">
                +7 775 880 52 34
              </a>
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <Card className="brex-contact-card" hoverable>
              <div className="brex-contact-icon">
                <MailOutlined />
              </div>
              <Title level={4} className="brex-contact-title">
                {t('contactsSection.email')}
              </Title>
              <a href="mailto:info@sapatech.kz" className="brex-contact-link">
                info@sapatech.kz
              </a>
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <Card className="brex-contact-card" hoverable>
              <div className="brex-contact-icon">
                <EnvironmentOutlined />
              </div>
              <Title level={4} className="brex-contact-title">
                {t('contactsSection.address')}
              </Title>
              <Paragraph className="brex-contact-text">
                {t('contacts.address')}
              </Paragraph>
              <a 
                href="https://2gis.kz/almaty/geo/70000001066943138/76.933728,43.222690" 
                target="_blank" 
                rel="noopener noreferrer"
                className="brex-contact-button"
              >
                {t('contactsSection.openIn2gis')}
              </a>
            </Card>
          </Col>
        </Row>

        <div className="brex-contacts-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2907.3761568922578!2d76.9312009773613!3d43.22257248017424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38836f24c6b92751%3A0x8e0755bb3661cfad!2z0YPQu9C40YbQsCDQl9C10LnQvdCwINCo0LDRiNC60LjQvdCwIDI0LCDQkNC70LzQsNGC0YsgMDUwMDYw!5e0!3m2!1sru!2skz!4v1723115930036!5m2!1sru!2skz"
            className="brex-map"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={t('contacts.mapTitle')}
          />
        </div>
      </div>
    </div>
  );
};

export default BrexContacts;
