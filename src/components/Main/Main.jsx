import { Row } from "antd";
import Nav from "../../layouts/Nav";
import ElipseElement from "../ElipseElement/ElipseElement";
import { useTranslation } from 'react-i18next';
import './Main.css';
import CustomButton from "../CustomButton";
import MainElement from '../../assets/images/MainElement.svg';
import modalService from "../../services/modalService";

const Main = () => {
  const { t, i18n } = useTranslation();
  const demoText = t('demoText');

  const additionalButtonClass = i18n.language === 'kk' ? 'kz-class' : '';

  // Combine base classes with the additional class
  const buttonClassName = `success-btn ${additionalButtonClass}`.trim();

  return (
    <div className="main-container" style={{ paddingTop: '100px' }}>
      <Nav />
      <Row className="main-content">
        <div className="main-content-left">
          <div className="main-content-text">
            {t('mainTitle1')} <p className="main-content-text-highlighted">{t('mainTitle2')}</p> {t('mainTitle3')}
          </div>
          <CustomButton
            title={t('demo')}
            styleName={buttonClassName}
            onClick={() => modalService.openModal(demoText)}
          />
        </div>
        <div className="main-content-right">
          <img src={MainElement} alt="MainImage" />
        </div>
      </Row>
    </div>
  );
}

export default Main;
