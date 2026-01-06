import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Slider.css'
import { Col, Row } from 'antd';
import { useRef, useState } from 'react';
import DemoModal from '../DemoModal';
import ArrowLeft from '../../assets/images/arrowLeft.svg'
import ArrowRight from '../../assets/images/arrowRight.svg'
import PageDown from '../../assets/images/pageDown1.svg';
import SuccessModal from '../DemoModal/SuccessModal';

const slidesData = [
  {
    slideClass: "slide1",
    title: "Sapa",
    subtitle: "Technologies",
    paragraph: "Автоматизация, которая экономит ваши ресурсы",
    imageClass: "slideImage1",
    buttonClass: "primary-btn"
  },
  {
    slideClass: "slide2",
    title: "Sapa",
    subtitle: "Technologies",
    paragraph: "Создание прогрессивных технических решений для оптимизации и автоматизации бизнес-процессов",
    imageClass: "slideImage2",
    buttonClass: "success-btn"
  },
  {
    slideClass: "slide3",
    title: "Sapa",
    subtitle: "Technologies",
    paragraph: "Предоставление качественных и инновационных решений, способствующих улучшению эффективности и продуктивности наших партнеров",
    imageClass: "slideImage3",
    buttonClass: "primary-btn"
  },
];

const Carousel = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0);
  const [success, setSuccess] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  const onSubmit = (values) => {
    setSuccess(true);
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current) => setCurrentSlide(current), // Get current slide index
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2500, // Set the delay for each slide (in milliseconds)
    pauseOnHover: false, 
    cssEase: 'cubic-bezier(0.600, -0.080, 0.735, 0.045)',  };

  
  const Slide = ({ slideClass, title, subtitle, paragraph, imageClass, buttonClass, refValue }) => (
    <Row className="slide">
      <Col lg={13} sm={24} className={`text-container ${slideClass}`}>
        <h1 className="header-1">{title}</h1>
        <h2 className="header-2">{subtitle}</h2>
        <p className="paragraph-1">{paragraph}</p>
        <div className="slide-actions">
          <button className='button secondary-btn' onClick={showModal}>Заказать демо</button>
          <a href="#aboutUs"><button className={`button ${buttonClass}`}>Подробнее</button></a>
        </div>
        <div className='slider-buttons'>
          <img onClick={() => refValue.current.slickPrev()} src={ArrowLeft} />
          {slidesData.map((slide, index) => (
            <div key={index} onClick={() => refValue.current.slickGoTo(index)} className={`slider-dots ${currentSlide === index ? "active" : ""}`}/>
          ))}
          <img  onClick={() => refValue.current.slickNext()} src={ArrowRight} />
        </div>
        <div className='downButton'>
          <div>
            <a href="#aboutUs"><img className='pageDown' src={PageDown} /></a>
          </div>
        </div>
      </Col>
      <Col lg={11} sm={24} className={`image-container ${imageClass}`}></Col>
    </Row>
  );
  
  const sliderRef = useRef(null);

  return (
    <>
      <Slider className='sliderBlock' ref={sliderRef} {...settings}>
        {slidesData.map((slide, index) => (
          <Slide key={index} {...slide} refValue={sliderRef} />
        ))}
      </Slider>
      {isModalVisible && <DemoModal onSubmit={onSubmit} visible={isModalVisible} onClose={handleClose} />}
      {success && <SuccessModal  visible={success} onClose={() => setSuccess(false)} />}
    </>
  );
};

export default Carousel;
