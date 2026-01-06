import { Layout } from 'antd'
import React from 'react'
import Main from '../../components/Main/Main'
import './MainLayout.css'
import CustomText from '../../components/CustomText/CustomText'
import TagLayout from '../../components/TagLayout/Taglayout'
import StatsSection from '../../components/StatsSection/StatsSections'
import PartnersSection from '../../components/PartnersSection/PartnersSection'
import SolutionsSection from '../../components/SolutionsSection/SolutionsSection'
import Footer from '../../layouts/Footer'
import { useTranslation } from 'react-i18next'


const Mainlayout = () => {
  const { t } = useTranslation();
  return (
    <Layout>
          <Main />
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
              <TagLayout />
          </div>       
     
      <StatsSection />
      <SolutionsSection />
      <PartnersSection />
      <Footer />
    </Layout>
  )
}

export default Mainlayout