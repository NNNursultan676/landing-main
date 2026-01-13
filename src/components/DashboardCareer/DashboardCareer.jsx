/**
 * Dashboard Career - Карьера в стиле dashboard
 * Улучшенные карточки вакансий с примерами и интерактивностью
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
import './DashboardCareer.css';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.sapatech.kz/api' 
  : 'http://localhost:3002/api';

const DashboardCareer = () => {
  const { t } = useTranslation();
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [form] = Form.useForm();

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
      // Проверяем, что выбрана вакансия
      if (!selectedVacancy || !selectedVacancy.id) {
        message.error('Ошибка: вакансия не выбрана');
        return;
      }

      // Отправляем отклик на сервер
      const response = await axios.post(
        `${API_URL}/vacancies/${selectedVacancy.id}/applications`,
        {
          ...values,
          vacancyTitle: selectedVacancy.title,
        }
      );

      // Проверяем успешность ответа
      if (response.data && response.data.success) {
        // Показываем успешное сообщение пользователю
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
      
      // Определяем тип ошибки для более информативного сообщения
      let errorMessage = 'Произошла ошибка при отправке отклика. Пожалуйста, попробуйте еще раз.';
      
      if (error.response) {
        // Сервер ответил с кодом ошибки
        if (error.response.status === 404) {
          errorMessage = 'Вакансия не найдена. Пожалуйста, обновите страницу.';
        } else if (error.response.status >= 500) {
          errorMessage = 'Ошибка на сервере. Пожалуйста, попробуйте позже.';
        } else if (error.response.data && error.response.data.error) {
          errorMessage = error.response.data.error;
        }
      } else if (error.request) {
        // Запрос был отправлен, но ответа не получено
        errorMessage = 'Не удалось подключиться к серверу. Проверьте подключение к интернету.';
      }
      
      // Показываем ошибку пользователю
      message.error(errorMessage);
    }
  };

  // Примеры вакансий для демонстрации (только в development режиме)
  const exampleVacancies = process.env.NODE_ENV === 'development' ? [
    {
      id: 'example-1',
      title: 'Senior Frontend Developer',
      location: 'Алматы / Удаленно',
      salary: 'от 800 000 ₸',
      type: 'Полная занятость',
      experience: '3+ года',
      description: 'Разработка современных веб-приложений с использованием React, TypeScript. Работа над продуктами в сфере fintech.',
      requirements: ['React', 'TypeScript', 'Redux', 'GraphQL'],
      benefits: ['Гибкий график', 'Медицинская страховка', 'Обучение за счет компании'],
      gradient: 'linear-gradient(135deg, #4a9eff 0%, #357abd 100%)',
      icon: '💻',
      isExample: true, // Маркер для примера
    },
    {
      id: 'example-2',
      title: 'Product Manager',
      location: 'Алматы',
      salary: 'от 1 200 000 ₸',
      type: 'Полная занятость',
      experience: '5+ лет',
      description: 'Управление продуктами в сфере fintech. Разработка стратегии, работа с командами разработки и аналитикой.',
      requirements: ['Product Management', 'Agile', 'Analytics', 'Fintech'],
      benefits: ['Премии', 'Офис в центре', 'Корпоративные мероприятия'],
      gradient: 'linear-gradient(135deg, #50F5B0 0%, #3dd89f 100%)',
      icon: '📊',
      isExample: true, // Маркер для примера
    },
  ] : [];

  // В production показываем только реальные вакансии из API
  const allVacancies = [...exampleVacancies, ...vacancies];

  return (
    <div id="career" className="dashboard-career">
      <div className="dashboard-career-container">
        <div className="dashboard-career-header">
          <div className="section-badge">Карьера</div>
          <Title level={2} className="dashboard-career-title">
            {t('career.title') || 'Присоединяйтесь к команде'}
          </Title>
          <Paragraph className="dashboard-career-subtitle">
            {t('career.subtitle') || 'Мы ищем талантливых людей для создания будущего fintech'}
          </Paragraph>
        </div>

        {loading ? (
          <div className="career-loading">Загрузка вакансий...</div>
        ) : (
          <div className="dashboard-career-grid">
            {allVacancies.map((vacancy, index) => (
              <div 
                key={vacancy.id || index}
                className={`vacancy-card-wrapper vacancy-card-${index + 1}`}
              >
                <div 
                  className="vacancy-card-glow" 
                  style={{ background: vacancy.gradient || 'linear-gradient(135deg, #4a9eff 0%, #357abd 100%)' }}
                />
                <Card className="dashboard-vacancy-card" hoverable>
                  <div className="vacancy-header">
                    <div className="vacancy-icon">{vacancy.icon || '🚀'}</div>
                    <div className="vacancy-header-content">
                      <Title level={4} className="vacancy-title">
                        {vacancy.title}
                      </Title>
                      <Space size={[8, 8]} wrap className="vacancy-tags">
                        {vacancy.type && (
                          <Tag color="blue" className="vacancy-tag">
                            {vacancy.type}
                          </Tag>
                        )}
                        {vacancy.experience && (
                          <Tag color="green" className="vacancy-tag">
                            {vacancy.experience}
                          </Tag>
                        )}
                      </Space>
                    </div>
                  </div>

                  <div className="vacancy-info">
                    {vacancy.location && (
                      <div className="vacancy-info-item">
                        <EnvironmentOutlined /> {vacancy.location}
                      </div>
                    )}
                    {vacancy.salary && (
                      <div className="vacancy-info-item">
                        <DollarOutlined /> {vacancy.salary}
                      </div>
                    )}
                    {vacancy.type && (
                      <div className="vacancy-info-item">
                        <ClockCircleOutlined /> {vacancy.type}
                      </div>
                    )}
                  </div>

                  {vacancy.description && (
                    <Paragraph className="vacancy-description" ellipsis={{ rows: 2 }}>
                      {vacancy.description}
                    </Paragraph>
                  )}

                  {vacancy.requirements && (
                    <div className="vacancy-requirements">
                      <div className="vacancy-requirements-title">Требования:</div>
                      <Space size={[8, 8]} wrap>
                        {vacancy.requirements.slice(0, 4).map((req, idx) => (
                          <Tag key={idx} className="requirement-tag">{req}</Tag>
                        ))}
                        {vacancy.requirements.length > 4 && (
                          <Tag className="requirement-tag">+{vacancy.requirements.length - 4}</Tag>
                        )}
                      </Space>
                    </div>
                  )}

                  <Button
                    type="primary"
                    className="vacancy-apply-btn"
                    onClick={() => handleApply(vacancy)}
                    icon={<RocketOutlined />}
                  >
                    Откликнуться
                  </Button>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal
        title={
          <div className="modal-title">
            <RocketOutlined /> Отклик на вакансию: {selectedVacancy?.title}
          </div>
        }
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        footer={null}
        width={600}
        className="career-modal"
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="name" label="Имя" rules={[{ required: true }]}>
            <Input size="large" placeholder="Ваше имя" />
          </Form.Item>
          <Form.Item 
            name="email" 
            label="Email" 
            rules={[{ required: true, type: 'email' }]}
          >
            <Input size="large" type="email" placeholder="your.email@example.com" />
          </Form.Item>
          <Form.Item name="phone" label="Телефон" rules={[{ required: true }]}>
            <Input size="large" placeholder="+7 (___) ___-__-__" />
          </Form.Item>
          <Form.Item name="resume" label="О себе" rules={[{ required: true }]}>
            <TextArea 
              rows={6} 
              placeholder="Расскажите о себе, опыте работы и навыках"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large" icon={<CheckCircleOutlined />}>
              Отправить отклик
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DashboardCareer;
