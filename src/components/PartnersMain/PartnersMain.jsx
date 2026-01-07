import { Row } from "antd"
import { useTranslation } from 'react-i18next';
import './PartnersMain.css'

const Main = () => {
  const { t } = useTranslation();
  return (
    <div className="additional-partners-container">
     <Row className="about-content">
          <div className="about-content-text">
               {t('partnerTitle')}
          </div>
      </Row>  
    </div>
  )
}

export default Main