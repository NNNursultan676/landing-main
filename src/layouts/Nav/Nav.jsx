import { useState } from 'react';
import React from 'react';
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
const Nav = () => {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { t, i18n } = useTranslation();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const scrollToSection = (sectionId) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('home');
      setVisible(false);
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 80; // Approximate height of fixed nav
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
    setVisible(false); // Close mobile menu if open
  };

  // Track scroll position to update active section and nav style
  React.useEffect(() => {
    const nav = document.querySelector('.nav');
    
    const handleScroll = () => {
      const sections = ['home', 'solutions', 'about', 'partners', 'contacts'];
      const scrollPosition = window.scrollY + 150;

      // Update nav style on scroll
      if (nav) {
        if (window.scrollY > 50) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
      }

      // Update active section
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section === 'home') {
          if (scrollPosition < 200) {
            setActiveSection('home');
            return;
          }
        } else {
          const element = document.getElementById(section);
          if (element) {
            const offsetTop = element.offsetTop;
            if (scrollPosition >= offsetTop) {
              setActiveSection(section);
              return;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        } src={Logo} alt="Sapa Technologies" style={{ cursor: 'pointer' }} />        
      </div>
      <div className='navLinks'>
        <ul className='navList'>
          <li>
            <a 
              href="#home" 
              onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
              className={activeSection === 'home' ? 'active' : ''}
            >
              {t('home')}
            </a>
          </li>
          <li>
            <a 
              href="#solutions" 
              onClick={(e) => { e.preventDefault(); scrollToSection('solutions'); }}
              className={activeSection === 'solutions' ? 'active' : ''}
            >
              {t('solutions')}
            </a>
          </li>
          <li>
            <a 
              href="#about" 
              onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
              className={activeSection === 'about' ? 'active' : ''}
            >
              {t('aboutUs')}
            </a>
          </li>
          <li>
            <a 
              href="#partners" 
              onClick={(e) => { e.preventDefault(); scrollToSection('partners'); }}
              className={activeSection === 'partners' ? 'active' : ''}
            >
              {t('partners')}
            </a>
          </li>
          <li>
            <a 
              href="#contacts" 
              onClick={(e) => { e.preventDefault(); scrollToSection('contacts'); }}
              className={activeSection === 'contacts' ? 'active' : ''}
            >
              {t('contactUs')}
            </a>
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
                <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>{t('home')}</a></li>
                <li><a href="#solutions" onClick={(e) => { e.preventDefault(); scrollToSection('solutions'); }}>{t('solutions')}</a></li>
                <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>{t('aboutUs')}</a></li>
                <li><a href="#products" onClick={(e) => { e.preventDefault(); scrollToSection('products'); }}>{t('products')}</a></li>
                <li><a href="#partners" onClick={(e) => { e.preventDefault(); scrollToSection('partners'); }}>{t('partners')}</a></li>
                <li><a href="#contacts" onClick={(e) => { e.preventDefault(); scrollToSection('contacts'); }}>{t('contactUs')}</a></li>
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
