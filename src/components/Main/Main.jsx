/**
 * ⚠️ КРИТИЧЕСКИ ВАЖНО: БЛОК ГЛАВНОЙ СТРАНИЦЫ - НЕ ТРОГАТЬ! ⚠️
 * 
 * Этот компонент содержит критически важную структуру главной секции:
 * - Интеграция с WaterParticles (3D анимация частиц)
 * - Правильное позиционирование контента и кнопки
 * - Стили и z-index для корректного отображения поверх анимации
 * 
 * Изменение этой структуры может сломать:
 * - Анимацию частиц
 * - Позиционирование элементов
 * - Отображение на разных экранах
 * 
 * Можно безопасно изменять только:
 * - Тексты через translation.json (mainTitle1, mainTitle2, mainTitle3, demo)
 */

import { Row } from "antd";
import Nav from "../../layouts/Nav";
import { useTranslation } from 'react-i18next';
import './Main.css';
import CustomButton from "../CustomButton";
import MainElement from '../../assets/images/MainElement.svg';
import modalService from "../../services/modalService";

const Main = () => {
  const { t, i18n } = useTranslation();
  const demoText = t('demoText');

  // ⚠️ НЕ МЕНЯТЬ: Логика для казахского языка
  const additionalButtonClass = i18n.language === 'kk' ? 'kz-class' : '';
  const buttonClassName = `success-btn ${additionalButtonClass}`.trim();

  return (
    <>
      <Nav />
      <Row className="main-content">
        <div className="main-content-left">
          <div className="main-content-text">
            {t('mainTitle1')} <p className="main-content-text-highlighted">{t('mainTitle2')}</p> {t('mainTitle3')}
          </div>
          <CustomButton
            title={t('demo')}
            styleName={buttonClassName}
            onClick={() => modalService.openModal(demoText)}
          />
        </div>
        <div className="main-content-right">
          <img src={MainElement} alt="MainImage" />
        </div>
      </Row>
    </>
  );
}

export default Main;
