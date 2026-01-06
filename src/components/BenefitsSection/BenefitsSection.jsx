import React from 'react';
import './BenefitsSection.css';
import CustomButton from '../../components/CustomButton';
import { useTranslation } from 'react-i18next';
import modalService from "../../services/modalService";

const BenefitsSection = ({ headline, benefits, buttonText }) => {
  const { t, i18n } = useTranslation();
  const additionalButtonClass = i18n.language === 'kk' ? 'kz-class' : '';

  // Combine base classes with the additional class
  const buttonClassName = `success-btn ${additionalButtonClass}`.trim();
  const demoText = t('demoText');
  return (
    <div className="benefits-section">
      <h3 className="benefits-headline">{headline}</h3>
      <svg width="52" height="75" viewBox="0 0 52 75" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M26 66.0684L27.5026 67.571L26 69.0736L24.4974 67.571L26 66.0684ZM23.875 34.1934C23.875 33.0198 24.8264 32.0684 26 32.0684C27.1736 32.0684 28.125 33.0198 28.125 34.1934L23.875 34.1934ZM40.2526 54.821L27.5026 67.571L24.4974 64.5658L37.2474 51.8158L40.2526 54.821ZM24.4974 67.571L11.7474 54.821L14.7526 51.8158L27.5026 64.5658L24.4974 67.571ZM23.875 66.0684L23.875 34.1934L28.125 34.1934L28.125 66.0684L23.875 66.0684Z" fill="#50F5B0"/>
<rect x="23.751" y="14.5732" width="4.49805" height="7.51132" rx="2.24902" fill="#50F5B0"/>
<rect opacity="0.5" x="23.751" y="0.0732422" width="4.49805" height="4.5" rx="2.24902" fill="#50F5B0"/>
</svg>

      <div className="benefits-container ant-layout">
        {benefits && benefits.map((benefit, index) => (
          <div key={index} className="benefit-card">
            <div className="benefit-icon"><svg width="63" height="64" viewBox="0 0 63 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M31.2689 55.2256C44.221 55.2256 54.7207 44.7259 54.7207 31.7739C54.7207 18.8218 44.221 8.32214 31.2689 8.32214C18.3169 8.32214 7.81723 18.8218 7.81723 31.7739C7.81723 44.7259 18.3169 55.2256 31.2689 55.2256ZM43.6937 25.6248C44.615 24.5192 44.4657 22.8761 43.3601 21.9548C42.2545 21.0335 40.6115 21.1829 39.6902 22.2884L30.3148 33.5389C29.4113 34.623 28.9035 35.2232 28.498 35.5921L28.4825 35.6061L28.4658 35.5935C28.0285 35.2629 27.4684 34.7111 26.4705 33.7132L22.6885 29.9313C21.6709 28.9137 20.0211 28.9137 19.0034 29.9313C17.9858 30.9489 17.9858 32.5988 19.0034 33.6164L22.7854 37.3983L22.8918 37.5047L22.8918 37.5047C23.7425 38.3558 24.561 39.1746 25.3225 39.7504C26.1755 40.3954 27.2926 41.002 28.7243 40.937C30.1559 40.8721 31.2135 40.1669 32.0047 39.4473C32.7109 38.8049 33.4519 37.9154 34.2221 36.9908L34.3184 36.8752L43.6937 25.6248ZM28.2551 35.7859L28.2587 35.7839C28.2563 35.7853 28.2551 35.7859 28.2551 35.7859ZM28.7214 35.7629L28.7252 35.7646C28.7252 35.7646 28.7239 35.7641 28.7214 35.7629Z" fill="#50F5B0"/>
</svg>
</div> {/* Placeholder icon */}
            <p className="benefit-text">{benefit}</p>
          </div>
        ))}
      </div>
      {/* <button className="benefits-button">{buttonText}</button> */}
      <div style={{display: 'flex', justifyContent: 'center', paddingTop:'20px'}}>
      <CustomButton
      title={t('demo')}
      styleName={buttonClassName}
      onClick={() => modalService.openModal(demoText)}
    />
    </div>
    </div>
  );
};

export default BenefitsSection;
