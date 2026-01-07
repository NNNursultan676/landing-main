import { Layout } from 'antd'
import ContactsMain from '../../components/ContactsMain/ContactsMain'
import Footer from '../../layouts/Footer'
import React from 'react'
import { useTranslation } from 'react-i18next'
import './Contacts.css'
import { Row } from 'antd'
// import StatsSection from '../../components/StatsSection/StatsSections'

const Contacts = () => {
 const { t } = useTranslation();
  return (
    <Layout className='contact-container'>
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
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
     </div>
               
     <Footer />
     </Layout>
  )
}

export default Contacts