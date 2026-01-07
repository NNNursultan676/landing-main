import { Row } from "antd"
import { useTranslation } from 'react-i18next';
import Contact from '../../assets/images/Contact.svg'
import './ContactsMain.css'

const Main = () => {
  const { t } = useTranslation();
  return (
    <div className="additional-contacts-container">
     <Row className="about-content">
          <div className="about-content-text">
               {t('contactTitle')}
          </div>
      </Row>  
    </div>
  )
}

export default Main