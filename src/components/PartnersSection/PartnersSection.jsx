// PartnersSection.js

import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useTranslation } from 'react-i18next';
import './PartnersSection.css';

// Import partner logos
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

const PartnersSection = () => {
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

  // Carousel responsive settings
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1921 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 1920, min: 1025 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 769 },
      items: 4,
    },
    smallTablet: {
      breakpoint: { max: 768, min: 577 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 576, min: 0 },
      items: 2,
    },
  };

  return (
    <div className="partners-section animate-fade-soft">
      <div className="partners-section-text">
        {t('partnersSectionText')}
      </div>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={2000}
        arrows={false}
        draggable={true}
        showDots={false}
        swipeable={true}
        containerClass="partners-carousel"
        itemClass="partner-slide"
        pauseOnHover={false}
        removeArrowOnDeviceType={['tablet', 'mobile']}
      >
        {partners.map((partner, index) => (
          <div key={index}>
            <img src={partner.src} alt={partner.alt} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default PartnersSection;
