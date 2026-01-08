import { Row } from "antd";
import { useTranslation } from 'react-i18next';
import About from '../../assets/images/About.svg';
import './AboutMain.css';

const Main = () => {
  const { t } = useTranslation();  
  return (
    <div className="additional-container animate-fade-soft">
      <Row className="about-content additional-content">
        <div className="about-content-text">
          {t('aboutTitle')}
        </div>
      </Row>  
    </div>
  );
}

export default Main;
