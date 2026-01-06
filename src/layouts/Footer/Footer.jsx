import React from 'react';
import { Footer } from 'antd/es/layout/layout';
import './Footer.css';
import Logo from '../../assets/images/LogoLight.svg';
import astanaHub from '../../assets/images/astanaHub.svg';
import sapaTech from '../../assets/images/sapaTech.svg';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { InstagramOutlined, LinkedinFilled, LinkedinOutlined } from "@ant-design/icons"
import '../../../src/AntReset.css';

const FooterBlock = () => {
  const { t } = useTranslation();

  return (
    <Footer className="footer ant-layout">
      <Row gutter={[16, 16]}>
        {/* Logo and Partners Section */}
        <Col xs={24} sm={12} md={6}>
          <div className="footer-logo-section">
            <img src={Logo} alt={t('footer.footerAboutUs')} className="footer-logo" />
            <img
              src={astanaHub}
              alt="Astana Hub"
              className="footer-partner-logo"
            />
            <img
              src={sapaTech}
              alt="Sapa Tech"
              className="footer-partner-logo"
            />
          </div>
        </Col>

        {/* Contacts Section */}
        <Col xs={24} sm={12} md={6}>
          <div className="footer-section">
            <p className="footer-title">{t('footer.contacts')}</p>
            <div className="footer-content">
              <p className="footer-subtitle">{t('footer.email')}</p>
              <p className="footer-text">info@sapatech.kz</p>
            </div>
            <div className="footer-content">
              <p className="footer-subtitle">{t('footer.phone')}</p>
              <p className="footer-text">+7 775 880 52 34</p>
            </div>
          </div>

          <div className="footer-section">
            <p className="footer-title">{t('footer.social')}</p>
            <div className="footer-content socials">
            <a href="https://www.instagram.com/sapatech.kz?igsh=NGZwaG81ZTJuY2xx&utm_source=qr" target="_blank"><InstagramOutlined /></a>
            <a href="https://www.linkedin.com/company/sapa-technologies/" target="_blank"><LinkedinFilled /></a>
            </div>
          </div>
        </Col>



        {/* Address Section */}
        <Col xs={24} sm={12} md={6}>
          <div className="footer-section">
            <p className="footer-title">{t('footer.address')}</p>
            <p className="footer-text">
              г. Алматы, ул. Зеина Шашкина, д. 24
            </p>
          </div>
        </Col>

        {/* Legal Documents Section */}
        <Col xs={24} sm={12} md={6}>
          <div className="footer-section">
            <p className="footer-title">{t('footer.legalDocuments')}</p>
            <div className="footerLinks">
              {/* <a href="#" className="paragraph-2">
                {t('footer.legalDocument1')}
              </a>
              <a href="#" className="paragraph-2">
                {t('footer.legalDocument2')}
              </a> */}
              {/* Politics */}
              <a href="/documents/politics_Sapa_Technologies.pdf" target="_blank"                      // Opens the link in a new tab
  rel="noopener noreferrer"            // Security best practices
  className="paragraph-2">  
                {t('footer.legalDocument3')}    
              </a> 
              {/* confirmation */}
              <a href="/documents/confirmation_sapa_tech.pdf" target="_blank"                      // Opens the link in a new tab
  rel="noopener noreferrer"            // Security best practices
  className="paragraph-2">
                {t('footer.legalDocument4')}
              </a>
            </div>
          </div>
        </Col>
      </Row>
    </Footer>
  );
};

export default FooterBlock;
