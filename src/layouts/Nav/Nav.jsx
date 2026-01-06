import { useState } from 'react';
import { Drawer, Menu, Dropdown, Button, Row } from 'antd';
import ArrowDown from '../../assets/images/globe-alt.svg';
import Logo from '../../assets/images/Logo.svg';
import MenuBurger from '../../assets/images/menu.svg';
import './Nav.css';
import { useTranslation } from 'react-i18next';
import CustomButton from '../../components/CustomButton';
import LogoBlack from '../../assets/images/LogoBlack.svg';
import CloseBlack from '../../assets/images/CloseBlack.svg';
import modalService from '../../services/modalService';
import { Link, useNavigate } from 'react-router-dom';


const Nav = () => {
  const [visible, setVisible] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  // Language options for the dropdown
  const languageOptions = [
    { key: 'ru', label: 'RU' },  // Russian
    { key: 'kk', label: 'KZ' },  // Kazakh
    { key: 'en', label: 'EN' },  // English
  ];

  // Function to change language
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('locale', lang);
  };

  // Dropdown Menu component for language selection
  const languageMenu = (
    <Menu
      onClick={({ key }) => changeLanguage(key)}
      items={languageOptions.map(lang => ({
        key: lang.key,
        label: lang.label,
      }))}
    />
  );
  const demoText = t('demoText');

  const additionalButtonClass = i18n.language === 'kk' ? 'kz-class' : '';

  // Combine base classes with the additional class
  const buttonClassName = `success-btn demo ${additionalButtonClass}`.trim();

  return (
    <div className='nav'>
      <div className='nav-img'>
        <img onClick={
          () => navigate('/')
        } src={Logo} alt="Sapa Technologies" />        
      </div>
      <div className='navLinks'>
        <ul className='navList'>
          <li>
            <Link to="/about">{t('aboutUs')}</Link>
          </li>
          <li>
            <Link to="/products">{t('products')}</Link>
          </li>
          <li>
            <Link to="/partners">{t('partners')}</Link>
          </li>
          <li>
            <Link to="/contacts">{t('contactUs')}</Link>
          </li>
        </ul>
      </div>
      <div className='nav-controllers'>
      <div className="lang">
        <Dropdown overlay={languageMenu} trigger={['click']}>
          <div className='lang-text'>
            {
              i18n.language === 'ru' ? 'RU' :
              i18n.language === 'kk' ? 'KZ' :
              i18n.language === 'en' ? 'EN' : 'RU'
            }    
              <img src={ArrowDown} style={{ alignSelf: 'center', justifySelf: 'center' }} />       
          </div>         
        </Dropdown>
      </div>
      <CustomButton
          title={t('demo')}
          styleName={buttonClassName}  // Apply the conditional class here
          onClick={() => modalService.openModal(demoText)}
      />
        <div className='menuBurger'>
          <img src={MenuBurger} onClick={() => showDrawer()} />

          <div onClick={(e) => e.target.tagName === 'DIV' && onClose()} className={`menuList ${visible ? 'open' : 'dnone'}`}>
            <div className='menuListBlock'>              
              <ul>
              <Row justify='space-between' align='middle'>
                <img src={LogoBlack} alt='logo' />
                <img src={CloseBlack
                } alt='close-btn' onClick={onClose} />
              </Row>
                <li><Link onClick={onClose} to="/about">{t('aboutUs')}</Link></li>
                <li><Link onClick={onClose} to="/products">{t('products')}</Link></li>
                <li><Link onClick={onClose} to="/partners">{t('partners')}</Link></li>
                <li><Link onClick={onClose} to="/contacts">{t('contactUs')}</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
        {/* Dropdown for language selection */}
      
      </div>    
  );
};

export default Nav;
