/**
 * Brex-style Career Section
 * Чистые карточки вакансий, белый фон
 */
import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Card, Button, Modal, Form, Input, Tag, Space, message } from 'antd';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { 
  EnvironmentOutlined, 
  DollarOutlined, 
  ClockCircleOutlined,
  RocketOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import './BrexCareer.css';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.sapatech.kz/api' 
  : 'http://localhost:3002/api';

const BrexCareer = () => {
  const { t, i18n } = useTranslation();
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [form] = Form.useForm();

  const currentLang = (i18n.language || 'ru').split('-')[0];

  const uiTexts = {
    badge: {
      en: 'Career',
      kk: 'Мансап',
      ru: 'Карьера',
    },
    loading: {
      en: 'Loading vacancies...',
      kk: 'Вакансиялар жүктелуде...',
      ru: 'Загрузка вакансий...',
    },
    requirementsTitle: {
      en: 'Requirements:',
      kk: 'Талаптар:',
      ru: 'Требования:',
    },
    applyButton: {
      en: 'Apply',
      kk: 'Өтініш беру',
      ru: 'Откликнуться',
    },
    modalTitlePrefix: {
      en: 'Application for vacancy:',
      kk: 'Вакансияға өтініш:',
      ru: 'Отклик на вакансию:',
    },
    formNameLabel: {
      en: 'Name',
      kk: 'Аты',
      ru: 'Имя',
    },
    formNamePlaceholder: {
      en: 'Your name',
      kk: 'Атыңыз',
      ru: 'Ваше имя',
    },
    formPhoneLabel: {
      en: 'Phone',
      kk: 'Телефон',
      ru: 'Телефон',
    },
    formPhonePlaceholder: {
      en: '+7 (___) ___-__-__',
      kk: '+7 (___) ___-__-__',
      ru: '+7 (___) ___-__-__',
    },
    formAboutLabel: {
      en: 'About you',
      kk: 'Өзіңіз туралы',
      ru: 'О себе',
    },
    formAboutPlaceholder: {
      en: 'Tell us about your experience and skills',
      kk: 'Тәжірибеңіз бен дағдыларыңыз туралы жазыңыз',
      ru: 'Расскажите о себе, опыте работы и навыках',
    },
    formSubmit: {
      en: 'Send application',
      kk: 'Өтініш жіберу',
      ru: 'Отправить отклик',
    },
  };

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const response = await axios.get(`${API_URL}/vacancies`);
        setVacancies(response.data);
      } catch (error) {
        console.error('Ошибка загрузки вакансий:', error);
        setVacancies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVacancies();
  }, []);

  const handleApply = (vacancy) => {
    setSelectedVacancy(vacancy);
    setIsModalOpen(true);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    try {
      if (!selectedVacancy || !selectedVacancy.id) {
        message.error('Ошибка: вакансия не выбрана');
        return;
      }

      const response = await axios.post(
        `${API_URL}/vacancies/${selectedVacancy.id}/applications`,
        {
          ...values,
          vacancyTitle: selectedVacancy.title,
        }
      );

      if (response.data && response.data.success) {
        message.success(
          t('career.applyForm.success') || 
          'Ваш отклик успешно отправлен! Мы свяжемся с вами в ближайшее время.'
        );
        
        setIsModalOpen(false);
        form.resetFields();
      } else {
        throw new Error('Сервер вернул неожиданный ответ');
      }
    } catch (error) {
      console.error('Ошибка отправки отклика:', error);
      let errorMessage = 'Произошла ошибка при отправке отклика. Пожалуйста, попробуйте еще раз.';
      
      if (error.response) {
        if (error.response.status === 404) {
          errorMessage = 'Вакансия не найдена. Пожалуйста, обновите страницу.';
        } else if (error.response.status >= 500) {
          errorMessage = 'Ошибка на сервере. Пожалуйста, попробуйте позже.';
        } else if (error.response.data && error.response.data.error) {
          errorMessage = error.response.data.error;
        }
      } else if (error.request) {
        errorMessage = 'Не удалось подключиться к серверу. Проверьте подключение к интернету.';
      }
      
      message.error(errorMessage);
    }
  };

  // Примеры вакансий для отображения
  const exampleVacancies = [
    {
      id: 'example-1',
      title: 'Senior Frontend Developer',
      location: 'Алматы / Удаленно',
      salary: 'от 800 000 ₸',
      type: 'Полная занятость',
      experience: '3+ года',
      description: 'Разработка современных веб-приложений с использованием React, TypeScript. Работа над продуктами в сфере fintech.',
      requirements: ['React', 'TypeScript', 'Redux', 'GraphQL'],
      isExample: true,
    },
    {
      id: 'example-2',
      title: 'Backend Developer (Node.js)',
      location: 'Алматы',
      salary: 'от 900 000 ₸',
      type: 'Полная занятость',
      experience: '3+ года',
      description: 'Разработка серверной части fintech-платформ. Работа с микросервисной архитектурой, базами данных, API интеграциями.',
      requirements: ['Node.js', 'PostgreSQL', 'Redis', 'Docker'],
      isExample: true,
    },
    {
      id: 'example-3',
      title: 'Product Manager',
      location: 'Алматы',
      salary: 'от 1 200 000 ₸',
      type: 'Полная занятость',
      experience: '5+ лет',
      description: 'Управление продуктами в сфере fintech. Разработка стратегии, работа с командами разработки и аналитикой.',
      requirements: ['Product Management', 'Agile', 'Analytics', 'Fintech'],
      isExample: true,
    },
  ];

  const allVacancies = [...exampleVacancies, ...vacancies];

  return (
    <div id="career" className="brex-career">
      <div className="brex-career-container">
        <div className="brex-career-header">
          <Title level={2} className="brex-career-title">
            {t('career.title') || uiTexts.badge[currentLang] || uiTexts.badge.ru}
          </Title>
          <Paragraph className="brex-career-subtitle">
            {t('career.subtitle') || 'We are looking for talented people to build the future of fintech'}
          </Paragraph>
        </div>

        {loading ? (
          <div className="brex-career-loading">
            {uiTexts.loading[currentLang] || uiTexts.loading.ru}
          </div>
        ) : (
          <Row gutter={[24, 24]} className="brex-career-grid">
            {allVacancies.map((vacancy, index) => (
              <Col xs={24} sm={12} lg={8} key={vacancy.id || index}>
                <Card className="brex-vacancy-card" hoverable>
                  <Title level={4} className="brex-vacancy-title">
                    {vacancy.title}
                  </Title>
                  
                  <Space size={[8, 8]} wrap className="brex-vacancy-tags">
                    {vacancy.type && (
                      <Tag color="blue">{vacancy.type}</Tag>
                    )}
                    {vacancy.experience && (
                      <Tag color="green">{vacancy.experience}</Tag>
                    )}
                  </Space>

                  <div className="brex-vacancy-info">
                    {vacancy.location && (
                      <div className="brex-vacancy-info-item">
                        <EnvironmentOutlined /> {vacancy.location}
                      </div>
                    )}
                    {vacancy.salary && (
                      <div className="brex-vacancy-info-item">
                        <DollarOutlined /> {vacancy.salary}
                      </div>
                    )}
                  </div>

                  {vacancy.description && (
                    <Paragraph className="brex-vacancy-description" ellipsis={{ rows: 2 }}>
                      {vacancy.description}
                    </Paragraph>
                  )}

                  <Button
                    type="primary"
                    className="brex-vacancy-button"
                    onClick={() => handleApply(vacancy)}
                    icon={<RocketOutlined />}
                    block
                  >
                    {uiTexts.applyButton[currentLang] || uiTexts.applyButton.ru}
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>

      <Modal
        title={
          <div className="brex-modal-title">
            <RocketOutlined /> {uiTexts.modalTitlePrefix[currentLang] || uiTexts.modalTitlePrefix.ru}{' '}
            {selectedVacancy?.title}
          </div>
        }
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label={uiTexts.formNameLabel[currentLang] || uiTexts.formNameLabel.ru}
            rules={[{ required: true }]}
          >
            <Input
              size="large"
              placeholder={uiTexts.formNamePlaceholder[currentLang] || uiTexts.formNamePlaceholder.ru}
            />
          </Form.Item>
          <Form.Item 
            name="email" 
            label="Email" 
            rules={[{ required: true, type: 'email' }]}
          >
            <Input size="large" type="email" placeholder="your.email@example.com" />
          </Form.Item>
          <Form.Item
            name="phone"
            label={uiTexts.formPhoneLabel[currentLang] || uiTexts.formPhoneLabel.ru}
            rules={[{ required: true }]}
          >
            <Input
              size="large"
              placeholder={uiTexts.formPhonePlaceholder[currentLang] || uiTexts.formPhonePlaceholder.ru}
            />
          </Form.Item>
          <Form.Item
            name="resume"
            label={uiTexts.formAboutLabel[currentLang] || uiTexts.formAboutLabel.ru}
            rules={[{ required: true }]}
          >
            <TextArea
              rows={6}
              placeholder={
                uiTexts.formAboutPlaceholder[currentLang] || uiTexts.formAboutPlaceholder.ru
              }
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large" icon={<CheckCircleOutlined />}>
              {uiTexts.formSubmit[currentLang] || uiTexts.formSubmit.ru}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BrexCareer;
