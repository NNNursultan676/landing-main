/**
 * Компонент раздела "Карьера"
 * Отображает вакансии и форму отклика
 */
import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Card, Button, Modal, Form, Input, message } from 'antd';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './CareerSection.css';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.sapatech.kz/api' 
  : 'http://localhost:3002/api';

const CareerSection = () => {
  const { t } = useTranslation();
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [form] = Form.useForm();

  // Загрузка вакансий из API
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

  // Открытие формы отклика
  const handleApply = (vacancy) => {
    setSelectedVacancy(vacancy);
    setIsModalOpen(true);
    form.resetFields();
  };

  // Отправка отклика
  const handleSubmit = async (values) => {
    try {
      // Здесь должна быть отправка на сервер
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('Отклик на вакансию (local debug):', {
          vacancy: selectedVacancy?.title,
          ...values,
        });
      }
      message.success(t('career.applyForm.success'));
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      message.error('Ошибка отправки отклика');
    }
  };

  return (
    <div id="career" className="career-section">
      <div className="career-container">
        <Title level={2} className="career-title">
          {t('career.title')}
        </Title>
        <Paragraph className="career-subtitle">
          {t('career.subtitle')}
        </Paragraph>

        {loading ? (
          <div className="career-loading">{t('career.loading')}</div>
        ) : vacancies.length === 0 ? (
          <Card className="career-empty-card">
            <Paragraph className="career-empty-text">
              {t('career.noVacancies')}
            </Paragraph>
          </Card>
        ) : (
          <Row gutter={[24, 24]} className="career-vacancies">
            {vacancies.map((vacancy) => (
              <Col xs={24} sm={12} lg={8} key={vacancy.id}>
                <Card className="career-vacancy-card" hoverable>
                  <Title level={4} className="vacancy-title">
                    {vacancy.title}
                  </Title>
                  {vacancy.location && (
                    <Paragraph className="vacancy-location">
                      📍 {vacancy.location}
                    </Paragraph>
                  )}
                  {vacancy.description && (
                    <Paragraph className="vacancy-description" ellipsis={{ rows: 3 }}>
                      {vacancy.description}
                    </Paragraph>
                  )}
                  <Button
                    type="primary"
                    className="vacancy-apply-btn"
                    onClick={() => handleApply(vacancy)}
                  >
                    {t('career.apply')}
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>

      {/* Модальное окно формы отклика */}
      <Modal
        title={t('career.applyForm.title')}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="vacancy" hidden>
            <Input value={selectedVacancy?.title} />
          </Form.Item>
          <Form.Item
            name="name"
            label={t('career.applyForm.name')}
            rules={[{ required: true, message: t('demoModal.validation.required') }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label={t('career.applyForm.email')}
            rules={[
              { required: true, message: t('demoModal.validation.required') },
              { type: 'email' },
            ]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            name="phone"
            label={t('career.applyForm.phone')}
            rules={[{ required: true, message: t('demoModal.validation.required') }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="resume"
            label={t('career.applyForm.resume')}
            rules={[{ required: true, message: t('demoModal.validation.required') }]}
          >
            <TextArea rows={6} placeholder={t('career.applyForm.placeholder')} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {t('career.applyForm.submit')}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CareerSection;
