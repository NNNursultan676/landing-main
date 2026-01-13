/**
 * Страница управления вакансиями
 * CRUD операции для вакансий
 */
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Space, message, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

const API_URL = 'http://localhost:3002/api';

const VacanciesPage = () => {
  const [vacancies, setVacancies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVacancy, setEditingVacancy] = useState(null);
  const [form] = Form.useForm();

  // Загрузка вакансий
  const fetchVacancies = async () => {
    try {
      const response = await axios.get(`${API_URL}/vacancies`);
      setVacancies(response.data);
    } catch (error) {
      message.error('Ошибка загрузки вакансий');
    }
  };

  useEffect(() => {
    fetchVacancies();
  }, []);

  // Создание/обновление вакансии
  const handleSubmit = async (values) => {
    try {
      if (editingVacancy) {
        await axios.put(`${API_URL}/vacancies/${editingVacancy.id}`, values);
        message.success('Вакансия обновлена');
      } else {
        await axios.post(`${API_URL}/vacancies`, values);
        message.success('Вакансия создана');
      }
      setIsModalOpen(false);
      form.resetFields();
      setEditingVacancy(null);
      fetchVacancies();
    } catch (error) {
      message.error('Ошибка сохранения вакансии');
    }
  };

  // Удаление вакансии
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/vacancies/${id}`);
      message.success('Вакансия удалена');
      fetchVacancies();
    } catch (error) {
      message.error('Ошибка удаления вакансии');
    }
  };

  // Редактирование вакансии
  const handleEdit = (record) => {
    setEditingVacancy(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: 'Название',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Редактировать
          </Button>
          <Popconfirm
            title="Удалить вакансию?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger icon={<DeleteOutlined />}>
              Удалить
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <h1>Управление вакансиями</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingVacancy(null);
            form.resetFields();
            setIsModalOpen(true);
          }}
        >
          Добавить вакансию
        </Button>
      </div>

      <Table columns={columns} dataSource={vacancies} rowKey="id" />

      <Modal
        title={editingVacancy ? 'Редактировать вакансию' : 'Создать вакансию'}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
          setEditingVacancy(null);
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="title"
            label="Название"
            rules={[{ required: true, message: 'Введите название вакансии' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Описание"
            rules={[{ required: true, message: 'Введите описание' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="requirements"
            label="Требования"
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="location"
            label="Локация"
          >
            <Input placeholder="г. Алматы" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Сохранить
              </Button>
              <Button onClick={() => {
                setIsModalOpen(false);
                form.resetFields();
                setEditingVacancy(null);
              }}>
                Отмена
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default VacanciesPage;
