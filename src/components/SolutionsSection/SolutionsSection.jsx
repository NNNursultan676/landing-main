/**
 * Компонент секции "Решения/Продукты"
 * Отображает карточки продуктов с возможностью открытия детальной информации
 * Карусель с перелистыванием картинок, как на AWS
 */
import React, { useState, useRef } from 'react';
import SolutionCard from '../SolutionCard/';
import SolutionsHeader from '../SolutionsHeader/SolutionsHeader';
import ProductModal from '../ProductModal/ProductModal';
import modalService from '../../services/modalService';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './SolutionsSection.css';
import CreditConveyorImg from '../../assets/images/ConveyerSvg.svg';
import CreditBrokerImg from '../../assets/images/credit-broker.svg';
import CustomSolutionsImg from '../../assets/images/custom-solutions.svg';
import { useTranslation } from 'react-i18next';

const SolutionsSection = () => {
  const { t } = useTranslation();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sliderRef = useRef(null);

  const solutions = [
    {
      image: CreditConveyorImg,
      title: t('solutionCreditConveyorTitle'),
      description: t('solutionCreditConveyorDesc'),
      variant: 'conveyor',
      subTitle: t('productsRes.creditConveyor.subtitle'),
      projects: {
        title: 'Основные возможности',
        elements: t('productsRes.creditConveyor.points', { returnObjects: true }),
      },
      services: {
        title: 'Преимущества',
        elements: t('productsRes.creditConveyor.benefits.benefitsList', { returnObjects: true }),
      },
    },
    {
      image: CreditBrokerImg,
      title: t('solutionCreditBrokerTitle'),
      description: t('solutionCreditBrokerDesc'),
      variant: 'broker',
      subTitle: t('productsRes.creditBroker.subtitle'),
      projects: {
        title: 'Основные возможности',
        elements: t('productsRes.creditBroker.points', { returnObjects: true }),
      },
      services: {
        title: 'Преимущества',
        elements: t('productsRes.creditBroker.benefits.benefitsList', { returnObjects: true }),
      },
    },
    {
      image: CustomSolutionsImg,
      title: t('solutionCustomSolutionsTitle'),
      description: t('solutionCustomSolutionsDesc'),
      variant: 'custom',
      subTitle: t('productsRes.customSolutions.subtitle'),
      projects: {
        title: 'Основные возможности',
        elements: t('productsRes.customSolutions.points', { returnObjects: true }),
      },
      services: {
        title: 'Преимущества',
        elements: t('productsRes.customSolutions.benefits.benefitsList', { returnObjects: true }),
      },
    },
  ];

  // Обработчик клика по карточке продукта
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Обработчик заказа демо
  const handleOrderDemo = () => {
    setIsModalOpen(false);
    const demoText = t('demoText');
    modalService.openModal(demoText);
  };

  // Настройки карусели
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    fade: true,
    cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const next = () => {
    sliderRef.current?.slickNext();
  };

  const previous = () => {
    sliderRef.current?.slickPrev();
  };

  return (
    <div className="solutions-section-wrapper">
      <SolutionsHeader />
      <div className="solutions-section animate-fade-up">
        <div className="solutions-carousel-wrapper">
          <button 
            className="solutions-carousel-arrow solutions-carousel-arrow-left" 
            onClick={previous}
            aria-label="Предыдущее решение"
          >
            <LeftOutlined />
          </button>
          
          <div className="solutions-carousel-container">
            <Slider ref={sliderRef} {...sliderSettings}>
              {solutions.map((solution, index) => (
                <div key={index} className="solutions-slide">
                  <SolutionCard
                    image={solution.image}
                    title={solution.title}
                    description={solution.description}
                    variant={solution.variant}
                    onClick={() => handleProductClick(solution)}
                  />
                </div>
              ))}
            </Slider>
          </div>

          <button 
            className="solutions-carousel-arrow solutions-carousel-arrow-right" 
            onClick={next}
            aria-label="Следующее решение"
          >
            <RightOutlined />
          </button>
        </div>
      </div>

      {/* Модальное окно с детальной информацией о продукте */}
      <ProductModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        orderDemo={handleOrderDemo}
      />
    </div>
  );
};

export default SolutionsSection;
