/**
 * Навигационный бар
 * Упрощенная и улучшенная версия
 */
import { useState, useEffect, useRef } from 'react';
import React from 'react';
import { Menu, Dropdown, Row } from 'antd';
import ArrowDown from '../../assets/images/globe-alt.svg';
import Logo from '../../assets/images/LogoBlack.svg';
import MenuBurger from '../../assets/images/menu.svg';
import './Nav.css';
import { useTranslation } from 'react-i18next';
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

  // Плавный скролл к секциям
  const scrollToSection = (sectionId) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('home');
      setVisible(false);
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 72;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - navHeight;
      
      window.scrollTo({
        top: Math.max(0, elementPosition),
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
    setVisible(false);
  };

  // Отслеживание активной секции при скролле
  useEffect(() => {
    const nav = document.querySelector('.nav');
    const sections = ['home', 'partners', 'solutions', 'about', 'features', 'articles', 'team', 'career', 'contacts'];
    
    const handleScroll = () => {
      // Обновление стиля навбара при скролле
      if (nav) {
        if (window.scrollY > 50) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
      }

      // Определение активной секции
      const scrollPosition = window.scrollY + 150;
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
      
      if (newActiveSection !== activeSection) {
        setActiveSection(newActiveSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  // Языковые опции
  const languageOptions = [
    { key: 'ru', label: 'RU' },
    { key: 'kk', label: 'KZ' },
    { key: 'en', label: 'EN' },
  ];

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('locale', lang);
  };

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
  const buttonClassName = `success-btn demo ${additionalButtonClass}`.trim();

  return (
    <div className='nav'>
      <div className='nav-left'>
        <div className='nav-img'>
          <img 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            src={Logo} 
            alt="Sapa Technologies" 
            style={{ cursor: 'pointer' }} 
          />        
        </div>
      </div>
      <div className='nav-right'>
        <div className='nav-controllers'>
          <div className='navLinks'>
            <ul className='navList'>
              <li>
                <a 
                  href="#home" 
                  onClick={(e) => { 
                    e.preventDefault(); 
                    scrollToSection('home'); 
                  }}
                  className={activeSection === 'home' ? 'active' : ''}
                >
                  {t('home')}
                </a>
              </li>
              <li>
                <a 
                  href="#solutions" 
                  onClick={(e) => { 
                    e.preventDefault(); 
                    scrollToSection('solutions'); 
                  }}
                  className={activeSection === 'solutions' ? 'active' : ''}
                >
                  {t('solutions')}
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  onClick={(e) => { 
                    e.preventDefault(); 
                    scrollToSection('about'); 
                  }}
                  className={activeSection === 'about' ? 'active' : ''}
                >
                  {t('aboutUs')}
                </a>
              </li>
              <li>
                <a 
                  href="#articles" 
                  onClick={(e) => { 
                    e.preventDefault(); 
                    scrollToSection('articles'); 
                  }}
                  className={activeSection === 'articles' ? 'active' : ''}
                >
                  {t('navigation.articles')}
                </a>
              </li>
              <li>
                <a 
                  href="#team" 
                  onClick={(e) => { 
                    e.preventDefault(); 
                    scrollToSection('team'); 
                  }}
                  className={activeSection === 'team' ? 'active' : ''}
                >
                  {t('navigation.team')}
                </a>
              </li>
              <li>
                <a 
                  href="#career" 
                  onClick={(e) => { 
                    e.preventDefault(); 
                    scrollToSection('career'); 
                  }}
                  className={activeSection === 'career' ? 'active' : ''}
                >
                  {t('navigation.career')}
                </a>
              </li>
              <li>
                <a 
                  href="#contacts" 
                  onClick={(e) => { 
                    e.preventDefault(); 
                    scrollToSection('contacts'); 
                  }}
                  className={activeSection === 'contacts' ? 'active' : ''}
                >
                  {t('contactUs')}
                </a>
              </li>
            </ul>
          </div>
          <button 
            className={`nav-demo-btn ${buttonClassName}`}
            onClick={() => modalService.openModal(demoText)}
          >
            {t('demo')}
          </button>
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
            <img src={MenuBurger} onClick={() => showDrawer()} alt="menu" />

            <div 
              onClick={(e) => e.target.tagName === 'DIV' && onClose()} 
              className={`menuList ${visible ? 'open' : 'dnone'}`}
            >
              <div className='menuListBlock'>              
                <ul>
                  <Row justify='space-between' align='middle'>
                    <img src={LogoBlack} alt='logo' />
                    <img src={CloseBlack} alt='close-btn' onClick={onClose} />
                  </Row>
                  <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>{t('home')}</a></li>
                  <li><a href="#solutions" onClick={(e) => { e.preventDefault(); scrollToSection('solutions'); }}>{t('solutions')}</a></li>
                  <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>{t('aboutUs')}</a></li>
                  <li><a href="#articles" onClick={(e) => { e.preventDefault(); scrollToSection('articles'); }}>{t('navigation.articles')}</a></li>
                  <li><a href="#team" onClick={(e) => { e.preventDefault(); scrollToSection('team'); }}>{t('navigation.team')}</a></li>
                  <li><a href="#career" onClick={(e) => { e.preventDefault(); scrollToSection('career'); }}>{t('navigation.career')}</a></li>
                  <li><a href="#contacts" onClick={(e) => { e.preventDefault(); scrollToSection('contacts'); }}>{t('contactUs')}</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
