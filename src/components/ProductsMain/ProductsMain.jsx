import { Row } from "antd"
import { useTranslation } from 'react-i18next';
import Products from '../../assets/images/Products.svg'
import './ProductsMain.css'
import { VerticalLeftOutlined } from "@ant-design/icons";
const Main = () => {
  const { t } = useTranslation();
  return (
    <div className="products-additional-container">
     <Row className="products-content">
          <div className="products-content-text">
               <div className="products-content-text-title">{t('productTitle')}</div>
          </div>
          <div className="products-content-bullits">
            <div className="products-content-bullits-item">             
              <div className="products-content-bullits-item-text">{t('productsRes.creditConveyor.title')}</div>
              <div className="products-content-bullits-item-image"><svg width="2" height="13" viewBox="0 0 2 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 13L0.999999 0" stroke="#50F5B0"/>
              </svg>
            </div>
            </div>
            <div className="products-content-bullits-item">             
              <div className="products-content-bullits-item-text">{t('productsRes.creditBroker.title')}</div>
              <div className="products-content-bullits-item-image"><svg width="2" height="13" viewBox="0 0 2 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 13L0.999999 0" stroke="#50F5B0"/>
              </svg>
            </div>
            </div>
            <div className="products-content-bullits-item">             
              <div className="products-content-bullits-item-text">{t('productsRes.customSolutions.title')}</div>
            </div>
            </div>
            
      </Row>
     </div>
  )
}

export default Main