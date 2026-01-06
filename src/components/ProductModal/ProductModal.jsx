import React from 'react';
import { Modal, Button } from 'antd';
import './ProductModal.css';

const product = {
  title: '',
  subTitle: '',
  projects: {
    title: '',
    elements: []
  },
  services: {
    title: '',
    elements: []
  }
}

const ProductModal = ({ visible, onClose, product, orderDemo }) => {
  return (
    <Modal
      title={null}
      visible={visible}
      onCancel={onClose}
      footer={null}
      centered
      className="modalBlock"
    >
      <div className="content">
        <div>
          <h2 className='header-7'>{product?.title}</h2>
          <p className='paragraph-1'>
            {product?.subTitle}
          </p>
        </div>
       
        {product?.projects && 
          <div>
            <h3 className='header-6 secondary'>{product?.projects?.title}</h3>
            <ul className='projects'>
              {product?.projects?.elements.map(project => <li>{project}</li>)}
            </ul>
          </div>
        }
        
        {product?.services && 
          <div>
            <h3 className='header-6 secondary'>{product?.services?.title}</h3>
            <ul className='services'>
              {product?.services?.elements.map(service => <li>{service}</li>)}
            </ul>
          </div>
        }
      </div>

      <div className="actions">
        <button onClick={() => orderDemo()} type="primary" className="button primary-btn">
          Заказать демо
        </button>
        <button type="default" className="button default-btn" onClick={onClose}>
          Закрыть
        </button>
      </div>
    </Modal>
  );
};

export default ProductModal;
