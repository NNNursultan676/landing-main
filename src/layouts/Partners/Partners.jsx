import React from 'react';
import PartnersMain from '../../components/PartnersMain/PartnersMain';
import { Layout, Row, Col } from 'antd';
import Footer from '../../layouts/Footer';
import halyk from '../../assets/images/partners/halyk.svg';
import centerCredit from '../../assets/images/partners/centerCredit.svg';
import forte from '../../assets/images/partners/forte.svg';
import eurasian from '../../assets/images/partners/eurasian.svg';
import rbk from '../../assets/images/partners/rbk.svg';
import sapa from '../../assets/images/partners/sapa.svg';
import jetcar from '../../assets/images/partners/jetcar.svg';
import astana from '../../assets/images/partners/astana.svg';
import allur from '../../assets/images/partners/allur.svg';
import orbis from '../../assets/images/partners/orbis.svg';
import aster from '../../assets/images/partners/aster.svg';
import bi from '../../assets/images/partners/bi.svg';
import mycar from '../../assets/images/partners/mycar.svg';
import toyota from '../../assets/images/partners/toyota.svg';
import changan from '../../assets/images/partners/changan.svg';
import nomadcar from '../../assets/images/partners/nomadcar.svg';
import tamerlan from '../../assets/images/partners/tamerlan.svg';
import crystal from '../../assets/images/partners/crystal.svg';
import avtomarket from '../../assets/images/partners/avtomarket.svg';
import tulpar from '../../assets/images/partners/tulpar.svg';
import './Partners.css';
import { useTranslation } from 'react-i18next';

const Partners = () => {
  // Array of partner images and their alt texts
  const { t } = useTranslation();
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
      <PartnersMain />
      <div className='partners-page-content'>
        <div className='partners-section-title'>{t('partnersSectionText')}</div>
        <Row gutter={[16, 16]} className='partners-section-row'>
          {partners.map((partner, index) => (
            <Col
              key={index}
              xs={12}    // 2 per row on extra-small screens
              sm={8}     // 3 per row on small screens
              md={6}     // 4 per row on medium screens
              lg={5}     // 6 per row on large screens
              xl={{ flex: '0 0 20%', maxWidth: '20%' }} // 5 per row on extra-large screens
              className='partners-section-col'
            >
              <img src={partner.src} alt={partner.alt} />
            </Col>
          ))}
        </Row>
      </div>
      <Footer />
    </Layout>
  );
};

export default Partners;
