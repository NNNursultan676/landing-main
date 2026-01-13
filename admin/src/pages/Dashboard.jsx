/**
 * Главная страница дашборда админ-панели
 * Показывает общую статистику и быстрый доступ к разделам
 */
import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { FileTextOutlined, TeamOutlined, ShoppingOutlined, BookOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 style={{ marginBottom: 24 }}>Дашборд</h1>
      <Row gutter={16}>
        <Col span={6}>
          <Card hoverable onClick={() => navigate('/vacancies')}>
            <Statistic
              title="Вакансии"
              value={0}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable onClick={() => navigate('/articles')}>
            <Statistic
              title="Статьи/СМИ"
              value={0}
              prefix={<BookOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable onClick={() => navigate('/team')}>
            <Statistic
              title="Команда"
              value={40}
              suffix="+"
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable onClick={() => navigate('/products')}>
            <Statistic
              title="Продукты"
              value={2}
              prefix={<ShoppingOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
