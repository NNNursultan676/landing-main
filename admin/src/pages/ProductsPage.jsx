/**
 * Страница управления информацией о продуктах
 * Редактирование клиентов и партнеров для каждого продукта
 */
import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, message, Space, Tag } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import axios from 'axios';

const API_URL = 'http://localhost:3002/api';

const ProductsPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(null);

  // Загрузка данных продуктов
  const fetchProductsData = async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      setProducts(response.data);
      form.setFieldsValue(response.data);
    } catch (error) {
      message.error('Ошибка загрузки данных продуктов');
    }
  };

  useEffect(() => {
    fetchProductsData();
  }, []);

  // Сохранение данных продуктов
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await axios.put(`${API_URL}/products`, values);
      message.success('Данные продуктов обновлены');
      fetchProductsData();
    } catch (error) {
      message.error('Ошибка сохранения данных');
    } finally {
      setLoading(false);
    }
  };

  // Управление списками клиентов/организаций
  const handleAddItem = (fieldPath) => {
    const currentValue = form.getFieldValue(fieldPath) || [];
    form.setFieldValue(fieldPath, [...currentValue, '']);
  };

  const handleRemoveItem = (fieldPath, index) => {
    const currentValue = form.getFieldValue(fieldPath) || [];
    form.setFieldValue(fieldPath, currentValue.filter((_, i) => i !== index));
  };

  const handleItemChange = (fieldPath, index, value) => {
    const currentValue = form.getFieldValue(fieldPath) || [];
    currentValue[index] = value;
    form.setFieldValue(fieldPath, currentValue);
  };

  return (
    <div>
      <h1 style={{ marginBottom: 24 }}>Управление продуктами</h1>
      
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        {/* Кредитный конвейер */}
        <Card title="Кредитный конвейер" style={{ marginBottom: 16 }}>
          <Form.Item label="Клиенты">
            <Form.List name={['creditConveyor', 'clients']}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                      <Form.Item
                        {...field}
                        rules={[{ required: true, message: 'Введите название клиента' }]}
                      >
                        <Input placeholder="Название клиента" />
                      </Form.Item>
                      <Button
                        type="text"
                        danger
                        icon={<CloseOutlined />}
                        onClick={() => remove(field.name)}
                      />
                    </Space>
                  ))}
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                    block
                  >
                    Добавить клиента
                  </Button>
                </>
              )}
            </Form.List>
          </Form.Item>
        </Card>

        {/* Кредитный брокер */}
        <Card title="Кредитный брокер" style={{ marginBottom: 16 }}>
          <Form.Item label="Финансовые организации">
            <Form.List name={['creditBroker', 'financialOrganizations']}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                      <Form.Item
                        {...field}
                        rules={[{ required: true, message: 'Введите название организации' }]}
                      >
                        <Input placeholder="Название финансовой организации" />
                      </Form.Item>
                      <Button
                        type="text"
                        danger
                        icon={<CloseOutlined />}
                        onClick={() => remove(field.name)}
                      />
                    </Space>
                  ))}
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                    block
                  >
                    Добавить организацию
                  </Button>
                </>
              )}
            </Form.List>
          </Form.Item>

          <Form.Item
            name={['creditBroker', 'dealers']}
            label="Количество дилеров"
          >
            <Input type="number" />
          </Form.Item>
        </Card>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Сохранить изменения
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductsPage;
