import { Col, Row } from 'antd'
import './AboutUs.css'
import ForGroundImage from '../../assets/images/AboutUs.png';
import PageDown from '../../assets/images/pageDown.svg';
import AstanHub from '../../assets/images/astanaHub.svg'
const AboutUs = () => {
  return (
    <Row className='aboutUs mtBlock' id="aboutUs">
      <Col lg={12} md={24} sm={24} className='aboutUsImage'>
          <img src={ForGroundImage} className='forGroundImage' />
      </Col>
      <Col lg={12} sm={24} className='aboutUsImageMobile'>
      </Col>
      <Col lg={12} sm={24} className='aboutUsContent'>
          <div className='aboutUsContentText'>
            <h1 className='header-3'>О нас</h1>
            <p className='paragraph-1'><b>SapaTech</b> - казахстанская IT-компания, входящая в состав группы компаний Sapa, эксперт в области разработки цифровых и кастомных решений любой сложности
            </p>
            <br />
            <p className='paragraph-1'><b>Миссия компании</b> - мы помогаем бизнесу достичь эффективных результатов  за счет инновационных, простых и удобных цифровых решений</p>
            <a href='#contactUs' style={{color: '#fff'}}><button className='button primary-btn'>Связаться с нами</button></a>
          </div>
          <a href="#products"><img className='pageDown downBtn' src={PageDown} /></a>
          <img className='astanahub' src={AstanHub} />

      </Col>
    </Row>
  )

}

export default AboutUs