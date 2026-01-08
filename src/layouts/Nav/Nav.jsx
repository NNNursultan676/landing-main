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
  const [scrollProgress, setScrollProgress] = useState(0);
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
      const navHeight = 84; // Height of fixed nav + scroll indicator
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;
      
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
    setVisible(false); // Close mobile menu if open
  };

  // Track scroll position to update active section, nav style, and scroll progress
  React.useEffect(() => {
    const nav = document.querySelector('.nav');
    
    const handleScroll = () => {
      const sections = ['home', 'about', 'solutions', 'contacts'];
      const scrollPosition = window.scrollY + 150;

      // Calculate scroll progress (0 to 100%)
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollableHeight = documentHeight - windowHeight;
      const currentScroll = window.scrollY;
      const progress = scrollableHeight > 0 ? (currentScroll / scrollableHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));

      // Update nav style on scroll
      if (nav) {
        if (window.scrollY > 50) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
      }

      // Update active section with smooth transition
      let newActiveSection = 'home';
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section === 'home') {
          if (scrollPosition < 200) {
            newActiveSection = 'home';
            break;
          }
        } else {
          const element = document.getElementById(section);
          if (element) {
            const offsetTop = element.offsetTop;
            if (scrollPosition >= offsetTop - 100) {
              newActiveSection = section;
              break;
            }
          }
        }
      }
      
      // Плавное переключение активного состояния
      if (newActiveSection !== activeSection) {
        setActiveSection(newActiveSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

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

  // Handle click on scroll indicator to scroll to section
  const handleScrollIndicatorClick = (sectionId) => {
    scrollToSection(sectionId);
  };

  // Sections available for scrolling (excluding partners as it's inside about section)
  const sections = ['home', 'about', 'solutions', 'contacts'];
  const sectionLabels = {
    home: t('home'),
    about: t('aboutUs'),
    solutions: t('solutions'),
    contacts: t('contactUs')
  };

  return (
    <>
      {/* Scroll Progress Indicator */}
      <div className='scroll-indicator-container'>
        <div className='scroll-indicator-bar' style={{ width: `${scrollProgress}%` }}></div>
        <div className='scroll-indicator-dots'>
          {sections.map((section, index) => (
            <div
              key={section}
              className={`scroll-indicator-dot ${activeSection === section ? 'active' : ''}`}
              onClick={() => handleScrollIndicatorClick(section)}
              title={sectionLabels[section]}
              style={{ left: `${(index / (sections.length - 1)) * 100}%` }}
            />
          ))}
        </div>
      </div>

      <div className='nav nav-left'>
        <div className='nav-img'>
          <img onClick={
            () => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          } src={Logo} alt="Sapa Technologies" style={{ cursor: 'pointer' }} />        
        </div>
      </div>
      <div className='nav nav-right'>
        <div className='nav-controllers'>
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
              href="#about" 
              onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
              className={activeSection === 'about' ? 'active' : ''}
            >
              {t('aboutUs')}
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
                <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>{t('aboutUs')}</a></li>
                <li><a href="#solutions" onClick={(e) => { e.preventDefault(); scrollToSection('solutions'); }}>{t('solutions')}</a></li>
                <li><a href="#contacts" onClick={(e) => { e.preventDefault(); scrollToSection('contacts'); }}>{t('contactUs')}</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Nav;
