/**
 * Компонент модального окна продукта
 * Отображает детальную информацию о продукте, включая клиентов и партнеров из API
 */
import React, { useState, useEffect } from 'react';
import { Modal, Button, Tag, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './ProductModal.css';

const { Title, Paragraph } = Typography;
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.sapatech.kz/api' 
  : 'http://localhost:3002/api';

const ProductModal = ({ visible, onClose, product, orderDemo }) => {
  const { t } = useTranslation();
  const [productsData, setProductsData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Загрузка данных о продуктах из API
  useEffect(() => {
    if (visible && product?.variant) {
      const fetchProductsData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${API_URL}/products`);
          setProductsData(response.data);
        } catch (error) {
          console.error('Ошибка загрузки данных продуктов:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchProductsData();
    }
  }, [visible, product?.variant]);

  // Получение данных о клиентах/партнерах в зависимости от продукта
  const getProductInfo = () => {
    if (!productsData) return null;

    if (product?.variant === 'conveyor') {
      return {
        clients: productsData.creditConveyor?.clients || [],
        description: productsData.creditConveyor?.description,
      };
    } else if (product?.variant === 'broker') {
      return {
        financialOrganizations: productsData.creditBroker?.financialOrganizations || [],
        dealers: productsData.creditBroker?.dealers || 0,
        description: productsData.creditBroker?.description,
      };
    }
    return null;
  };

  const productInfo = getProductInfo();

  return (
    <Modal
      title={null}
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      className="modalBlock"
      width={800}
    >
      <div className="content">
        <div>
          <Title level={2} className='header-7'>{product?.title}</Title>
          <Paragraph className='paragraph-1'>
            {productInfo?.description || product?.subTitle}
          </Paragraph>
        </div>
       
        {/* Клиенты для Кредитного конвейера */}
        {product?.variant === 'conveyor' && productInfo?.clients && productInfo.clients.length > 0 && (
          <div>
            <Title level={4} className='header-6 secondary'>Наши клиенты</Title>
            <div className="clients-list">
              {productInfo.clients.map((client, index) => (
                <Tag key={index} color="blue" className="client-tag">
                  {client}
                </Tag>
              ))}
            </div>
          </div>
        )}

        {/* Финансовые организации и дилеры для Кредитного брокера */}
        {product?.variant === 'broker' && productInfo && (
          <div>
            {productInfo.financialOrganizations && productInfo.financialOrganizations.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <Title level={4} className='header-6 secondary'>Финансовые организации</Title>
                <div className="clients-list">
                  {productInfo.financialOrganizations.map((org, index) => (
                    <Tag key={index} color="green" className="client-tag">
                      {org}
                    </Tag>
                  ))}
                </div>
              </div>
            )}
            {productInfo.dealers > 0 && (
              <div>
                <Title level={4} className='header-6 secondary'>Дилеры</Title>
                <Paragraph className='paragraph-1'>
                  Более {productInfo.dealers} дилеров подключены и ведут свой бизнес через платформу
                </Paragraph>
              </div>
            )}
          </div>
        )}

        {/* Старая структура для обратной совместимости */}
        {product?.projects && 
          <div>
            <Title level={4} className='header-6 secondary'>{product?.projects?.title}</Title>
            <ul className='projects'>
              {product?.projects?.elements.map((project, index) => (
                <li key={index}>{project}</li>
              ))}
            </ul>
          </div>
        }
        
        {product?.services && 
          <div>
            <Title level={4} className='header-6 secondary'>{product?.services?.title}</Title>
            <ul className='services'>
              {product?.services?.elements.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          </div>
        }
      </div>

      <div className="actions">
        <Button onClick={() => orderDemo()} type="primary" className="button primary-btn">
          Заказать демо
        </Button>
        <Button type="default" className="button default-btn" onClick={onClose}>
          Закрыть
        </Button>
      </div>
    </Modal>
  );
};

export default ProductModal;
