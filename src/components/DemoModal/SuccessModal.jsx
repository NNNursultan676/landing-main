import { Modal } from "antd";
import { useTranslation } from 'react-i18next';
import CheckMark from '../../assets/images/checkMark.png';

const SuccessModal = ({visible, onClose}) => {
  const { t } = useTranslation();
  return (
  
      <Modal
        className='modalBlock'
        id="successBlock"
        open={visible}
        onCancel={onClose}
        footer={null}
        centered
      > 
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}
        >
          <img className="success-img" src={CheckMark} />
          <h2 className="header-2 success-header">{t('demoModalSuccess.title')}</h2>
        </div>
    
      </Modal>
  )
}

export default SuccessModal