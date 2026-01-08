import React from 'react';
import './PartnersRunner.css';
import { useTranslation } from 'react-i18next';

// Импортируем логотипы партнеров
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

const PartnersRunner = () => {
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

  // Дублируем массив для бесконечной прокрутки
  const duplicatedPartners = [...partners, ...partners, ...partners];

  return (
    <div className="partners-runner-section">
      <div className="partners-runner-title">{t('partnersSectionText')}</div>
      <div className="partners-runner-container">
        <div className="partners-runner-track">
          {duplicatedPartners.map((partner, index) => (
            <div key={index} className="partners-runner-item">
              <img src={partner.src} alt={partner.alt} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnersRunner;
