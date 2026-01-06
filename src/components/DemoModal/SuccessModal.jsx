import { Modal } from "antd"
import CheckMark from '../../assets/images/checkMark.png'
const SuccessModal = ({visible, onClose}) => {
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
          <h2 className="header-2 success-header">Заявка принята!</h2>
        </div>
    
      </Modal>
  )
}

export default SuccessModal