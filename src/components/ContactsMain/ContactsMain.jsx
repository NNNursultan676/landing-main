import { useTranslation } from 'react-i18next';
import './ContactsMain.css'

const Main = () => {
  const { t } = useTranslation();
  return (
    <div className="additional-contacts-container">
      <h1 className="contact-content-text">
        {t('contactTitle')}
      </h1>
    </div>
  )
}

export default Main