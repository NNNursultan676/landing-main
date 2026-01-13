/**
 * Страница управления информацией о команде
 * Редактирование текста о команде и загрузка фото
 */
import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const API_URL = 'http://localhost:3002/api';

const TeamPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Загрузка данных команды
  const fetchTeamData = async () => {
    try {
      const response = await axios.get(`${API_URL}/team`);
      if (response.data) {
        form.setFieldsValue(response.data);
      }
    } catch (error) {
      // Если данных нет, используем значения по умолчанию
      form.setFieldsValue({
        description: 'Сегодня в команде работает 40+ сотрудников, а наши решения уже используются в 20+ GovTech-проектах.',
        employeesCount: 40,
      });
    }
  };

  useEffect(() => {
    fetchTeamData();
  }, []);

  // Сохранение данных команды
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await axios.put(`${API_URL}/team`, values);
      message.success('Данные команды обновлены');
    } catch (error) {
      message.error('Ошибка сохранения данных');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: 24 }}>Управление информацией о команде</h1>
      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="description"
            label="Описание команды"
            rules={[{ required: true, message: 'Введите описание' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="employeesCount"
            label="Количество сотрудников"
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="photos"
            label="Фото команды"
            extra="Загрузите общие фото с фотосессии"
          >
            <Upload
              listType="picture-card"
              beforeUpload={() => false}
            >
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Загрузить</div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Сохранить
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default TeamPage;
