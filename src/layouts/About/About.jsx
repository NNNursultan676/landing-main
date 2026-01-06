import { Layout } from 'antd'
import AboutMain from '../../components/AboutMain/AboutMain'
import Footer from '../../layouts/Footer'
import React from 'react'
import { useTranslation } from 'react-i18next'
import './About.css'
import StatsSection from '../../components/StatsSection/StatsSections'

const About = () => {
 const { t } = useTranslation();
  return (
    <Layout>
     <AboutMain />
     <div className="about-page-text">
            {t('aboutText1')} <p className="about-page-text-highlighted">{t('aboutText2')}</p> {t('aboutText3')}
     </div>
     <div className='about-page-text-2'>
        <div className='about-page-text-2-highlighted'>{t('aboutText4')}</div>
        <div className='about-page-text-2-regular'>{t('aboutText5')}</div>
      </div>
      <StatsSection show={true} />
     <Footer />
     </Layout>
  )
}

export default About