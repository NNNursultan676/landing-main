import { Row } from "antd";
import { useTranslation } from 'react-i18next';
import './AboutMain.css';

const AboutMain = () => {
  const { t } = useTranslation();  
  return (
    <div className="about-main">
      <h1>{t('aboutTitle')}</h1>
    </div>
  );
}

export default AboutMain;
