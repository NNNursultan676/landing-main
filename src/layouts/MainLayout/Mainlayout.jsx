import { Layout, Row, Col } from 'antd'
import React from 'react'
import Main from '../../components/Main/Main'
import './MainLayout.css'
import CustomText from '../../components/CustomText/CustomText'
import TagLayout from '../../components/TagLayout/Taglayout'
import StatsSection from '../../components/StatsSection/StatsSections'
import UnifiedFeatures from '../../components/UnifiedFeatures/UnifiedFeatures'
import PartnersSection from '../../components/PartnersSection/PartnersSection'
import SolutionsSection from '../../components/SolutionsSection/SolutionsSection'
import PartnersRunner from '../../components/PartnersRunner/PartnersRunner'
import CTASection from '../../components/CTASection/CTASection'
import Footer from '../../layouts/Footer'
import { useTranslation } from 'react-i18next'
import AboutMain from '../../components/AboutMain/AboutMain'
import ProductsMain from '../../components/ProductsMain/ProductsMain'
import PartnersMain from '../../components/PartnersMain/PartnersMain'
import ContactsMain from '../../components/ContactsMain/ContactsMain'
import ServiceSection from '../../components/ServiceSection/ServiceSection'
import BenefitsSection from '../../components/BenefitsSection/BenefitsSection'
import CreditConveyorImg from '../../assets/images/ConveyerSvg.svg'
import CreditBrokerImg from '../../assets/images/credit-broker.svg'
import CustomSolutionsImg from '../../assets/images/custom-solutions.svg'
import halyk from '../../assets/images/partners/halyk.svg'
import centerCredit from '../../assets/images/partners/centerCredit.svg'
import forte from '../../assets/images/partners/forte.svg'
import eurasian from '../../assets/images/partners/eurasian.svg'
import rbk from '../../assets/images/partners/rbk.svg'
import sapa from '../../assets/images/partners/sapa.svg'
import jetcar from '../../assets/images/partners/jetcar.svg'
import astana from '../../assets/images/partners/astana.svg'
import allur from '../../assets/images/partners/allur.svg'
import orbis from '../../assets/images/partners/orbis.svg'
import aster from '../../assets/images/partners/aster.svg'
import bi from '../../assets/images/partners/bi.svg'
import mycar from '../../assets/images/partners/mycar.svg'
import toyota from '../../assets/images/partners/toyota.svg'
import changan from '../../assets/images/partners/changan.svg'
import nomadcar from '../../assets/images/partners/nomadcar.svg'
import tamerlan from '../../assets/images/partners/tamerlan.svg'
import crystal from '../../assets/images/partners/crystal.svg'
import avtomarket from '../../assets/images/partners/avtomarket.svg'
import tulpar from '../../assets/images/partners/tulpar.svg'
import '../../layouts/Products/Products.css'
import '../../layouts/Partners/Partners.css'
import '../../layouts/Contacts/Contacts.css'
import '../../layouts/About/About.css'


const Mainlayout = () => {
  const { t } = useTranslation();
  
  const servicesData = [
    {
      key: 'creditConveyor',
      title: t('productsRes.creditConveyor.title'),
      subtitle: t('productsRes.creditConveyor.subtitle'),
      image: CreditConveyorImg,
      points: t('productsRes.creditConveyor.points', { returnObjects: true }),
      benefits: {
        headline: t('productsRes.creditConveyor.benefits.headline'),
        benefitsList: t('productsRes.creditConveyor.benefits.benefitsList', { returnObjects: true }),
        buttonText: t('productsRes.creditConveyor.benefits.buttonText'),
      },
    },
    {
      key: 'creditBroker',
      title: t('productsRes.creditBroker.title'),
      subtitle: t('productsRes.creditBroker.subtitle'),
      image: CreditBrokerImg,
      points: t('productsRes.creditBroker.points', { returnObjects: true }),
      benefits: {
        headline: t('productsRes.creditBroker.benefits.headline'),
        benefitsList: t('productsRes.creditBroker.benefits.benefitsList', { returnObjects: true }),
        buttonText: t('productsRes.creditBroker.benefits.buttonText'),
      },
    },
    {
      key: 'customSolutions',
      title: t('productsRes.customSolutions.title'),
      subtitle: t('productsRes.customSolutions.subtitle'),
      image: CustomSolutionsImg,
      points: t('productsRes.customSolutions.points', { returnObjects: true }),
      benefits: {
        headline: t('productsRes.customSolutions.benefits.headline'),
        benefitsList: t('productsRes.customSolutions.benefits.benefitsList', { returnObjects: true }),
        buttonText: t('productsRes.customSolutions.benefits.buttonText'),
      },
    },
  ];

  const partners = [
    { src: halyk, alt: 'Halyk' },
    { src: centerCredit, alt: 'Center Credit' },
    { src: forte, alt: 'Forte' },
    { src: eurasian, alt: 'Eurasian' },
    { src: rbk, alt: 'RBK' },
    { src: sapa, alt: 'Sapa' },
    { src: jetcar, alt: 'Jetcar' },
    { src: astana, alt: 'Astana' },
    { src: allur, alt: 'Allur' },
    { src: orbis, alt: 'Orbis' },
    { src: aster, alt: 'Aster' },
    { src: bi, alt: 'BI' },
    { src: mycar, alt: 'Mycar' },
    { src: toyota, alt: 'Toyota' },
    { src: changan, alt: 'Changan' },
    { src: nomadcar, alt: 'Nomadcar' },
    { src: tamerlan, alt: 'Tamerlan' },
    { src: crystal, alt: 'Crystal' },
    { src: avtomarket, alt: 'Avtomarket' },
    { src: tulpar, alt: 'Tulpar' },
  ];

  return (
    <Layout>
      {/* Main Hero Section */}
      <Main />
      
      {/* Custom Text Section */}
      <div className='custom-text-background'>
          <div className='custom-text-div'>
            <CustomText
              text={t('mainTitle5')} 
              highlightedParts={[t('mainTitle6')]}
              highlightClass="highlight"
              className="custom-text"
            /> 
            <div style={{maxWidth: '800px', alignSelf: 'center'}} >
                <p style={{
                  fontWeight: '400',
                  color: '#777B80',
                  fontSize: '20px',
                  fontFamily: 'Inter',
                }}>
                  {t('mainTitle4')} 
                  </p> 
            </div>              
          </div>
      </div>
      
      {/* Unified Features & Stats Section */}
      <UnifiedFeatures />
      
      {/* Solutions Section */}
      <div id="solutions">
        <SolutionsSection />
      </div>
      
      {/* About Section */}
      <div id="about">
        <AboutMain />
        <div className="about-page-text">
          {t('aboutText1')} <p className="about-page-text-highlighted">{t('aboutText2')}</p> {t('aboutText3')}
        </div>
        <div className='about-page-text-2'>
          <div className='about-page-text-2-highlighted'>{t('aboutText4')}</div>
          <div className='about-page-text-2-regular'>{t('aboutText5')}</div>
        </div>
        <StatsSection show={true} />
      </div>
      
      {/* Partners Section */}
      <div id="partners">
        <PartnersRunner />
      </div>
      
      {/* CTA Section */}
      <CTASection />
      
      {/* Contacts Section */}
      <div id="contacts">
        <ContactsMain />
        <div className="contact-info">
          <div className='contact-info-container'>
            <Row className='contact-info-container-text' style={{fontFamily: 'Inter'}}>
              <p className='contact-info-title'>Телефон</p>
              <p className='contact-info-text'>+7 775 880 52 34</p>
            </Row>
            <Row className='contact-info-container-text' style={{fontFamily: 'Inter'}}>
              <p className='contact-info-title'>E-mail:</p>
              <p className='contact-info-text'>info@sapatech.kz</p>
            </Row>
            <Row className='contact-info-container-text' style={{fontFamily: 'Inter'}}>
              <p className='contact-info-title'>Адрес</p>
              <p className='contact-info-text'>г. Алматы, ул. Зеина Шашкина, д. 24</p>
            </Row>
            <Row style={{fontFamily: 'Inter', marginTop: '8px'}}>
              <a 
                href="https://2gis.kz/almaty/geo/70000001066943138/76.933728,43.222690" 
                target="_blank" 
                rel="noopener noreferrer"
                className='contact-2gis-button'
              >
                2ГИС
              </a>
            </Row>
          </div>
          <div className='map'>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2907.3761568922578!2d76.9312009773613!3d43.22257248017424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38836f24c6b92751%3A0x8e0755bb3661cfad!2z0YPQu9C40YbQsCDQl9C10LnQvdCwINCo0LDRiNC60LjQvdCwIDI0LCDQkNC70LzQsNGC0YsgMDUwMDYw!5e0!3m2!1sru!2skz!4v1723115930036!5m2!1sru!2skz"
              className='googleMap'
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
      
      <Footer />
    </Layout>
  )
}

export default Mainlayout