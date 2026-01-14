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
      if (!selectedVacancy || !selectedVacancy.id) {
        message.error(t('career.errors.noVacancySelected'));
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
        message.success(t('career.applyForm.success'));
        
        setIsModalOpen(false);
        form.resetFields();
      } else {
        throw new Error(t('career.errors.unexpectedResponse'));
      }
    } catch (error) {
      console.error('Ошибка отправки отклика:', error);
      let errorMessage = t('career.errors.default');
      
      if (error.response) {
        if (error.response.status === 404) {
          errorMessage = t('career.errors.notFound');
        } else if (error.response.status >= 500) {
          errorMessage = t('career.errors.serverError');
        } else if (error.response.data && error.response.data.error) {
          errorMessage = error.response.data.error;
        }
      } else if (error.request) {
        errorMessage = t('career.errors.networkError');
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
            {t('career.title')}
          </Title>
          <Paragraph className="brex-career-subtitle">
            {t('career.subtitle')}
          </Paragraph>
        </div>

        {loading ? (
          <div className="brex-career-loading">
            {t('career.loading')}
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
                    {t('career.apply')}
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
            <RocketOutlined /> {t('career.applyForm.title')}: {selectedVacancy?.title}
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
            label={t('career.applyForm.name')}
            rules={[{ required: true }]}
          >
            <Input
              size="large"
              placeholder={t('career.applyForm.name')}
            />
          </Form.Item>
          <Form.Item 
            name="email" 
            label={t('career.applyForm.email')}
            rules={[{ required: true, type: 'email' }]}
          >
            <Input size="large" type="email" placeholder={t('career.applyForm.email')} />
          </Form.Item>
          <Form.Item
            name="phone"
            label={t('career.applyForm.phone')}
            rules={[{ required: true }]}
          >
            <Input
              size="large"
              placeholder={t('career.applyForm.phone')}
            />
          </Form.Item>
          <Form.Item
            name="resume"
            label={t('career.applyForm.resume')}
            rules={[{ required: true }]}
          >
            <TextArea
              rows={6}
              placeholder={t('career.applyForm.placeholder')}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large" icon={<CheckCircleOutlined />}>
              {t('career.applyForm.submit')}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BrexCareer;
