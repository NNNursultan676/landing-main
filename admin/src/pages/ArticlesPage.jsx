/**
 * Страница управления статьями/СМИ
 * CRUD операции для статей из раздела "СМИ о нас"
 */
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Space, message, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

const API_URL = 'http://localhost:3002/api';

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [form] = Form.useForm();

  // Загрузка статей
  const fetchArticles = async () => {
    try {
      const response = await axios.get(`${API_URL}/articles`);
      setArticles(response.data);
    } catch (error) {
      message.error('Ошибка загрузки статей');
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // Создание/обновление статьи
  const handleSubmit = async (values) => {
    try {
      if (editingArticle) {
        await axios.put(`${API_URL}/articles/${editingArticle.id}`, values);
        message.success('Статья обновлена');
      } else {
        await axios.post(`${API_URL}/articles`, values);
        message.success('Статья добавлена');
      }
      setIsModalOpen(false);
      form.resetFields();
      setEditingArticle(null);
      fetchArticles();
    } catch (error) {
      message.error('Ошибка сохранения статьи');
    }
  };

  // Удаление статьи
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/articles/${id}`);
      message.success('Статья удалена');
      fetchArticles();
    } catch (error) {
      message.error('Ошибка удаления статьи');
    }
  };

  // Редактирование статьи
  const handleEdit = (record) => {
    setEditingArticle(record);
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
      title: 'Источник',
      dataIndex: 'source',
      key: 'source',
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      render: (url) => (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {url}
        </a>
      ),
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
            title="Удалить статью?"
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
        <h1>Управление статьями/СМИ</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingArticle(null);
            form.resetFields();
            setIsModalOpen(true);
          }}
        >
          Добавить статью
        </Button>
      </div>

      <Table columns={columns} dataSource={articles} rowKey="id" />

      <Modal
        title={editingArticle ? 'Редактировать статью' : 'Добавить статью'}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
          setEditingArticle(null);
        }}
        footer={null}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="title"
            label="Название статьи"
            rules={[{ required: true, message: 'Введите название' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="source"
            label="Источник"
            rules={[{ required: true, message: 'Введите источник' }]}
          >
            <Input placeholder="Forbes Kazakhstan, Digital Business и т.д." />
          </Form.Item>
          <Form.Item
            name="url"
            label="URL ссылки"
            rules={[
              { required: true, message: 'Введите URL' },
              { type: 'url', message: 'Введите корректный URL' }
            ]}
          >
            <Input placeholder="https://..." />
          </Form.Item>
          <Form.Item
            name="description"
            label="Краткое описание (опционально)"
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Сохранить
              </Button>
              <Button onClick={() => {
                setIsModalOpen(false);
                form.resetFields();
                setEditingArticle(null);
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

export default ArticlesPage;
