/**
 * Боковая панель навигации админ-панели
 */
import React from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  FileTextOutlined,
  TeamOutlined,
  ShoppingOutlined,
  BookOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: 'Дашборд',
    },
    {
      key: '/vacancies',
      icon: <FileTextOutlined />,
      label: 'Вакансии',
    },
    {
      key: '/articles',
      icon: <BookOutlined />,
      label: 'Статьи/СМИ',
    },
    {
      key: '/team',
      icon: <TeamOutlined />,
      label: 'Команда',
    },
    {
      key: '/products',
      icon: <ShoppingOutlined />,
      label: 'Продукты',
    },
  ];

  return (
    <Sider
      collapsible
      width={250}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div style={{ padding: '20px', textAlign: 'center', color: '#fff', fontSize: '18px', fontWeight: 'bold' }}>
        Sapa Tech Admin
      </div>
      <Menu
        theme="dark"
        selectedKeys={[location.pathname]}
        mode="inline"
        items={menuItems}
        onClick={({ key }) => navigate(key)}
      />
    </Sider>
  );
};

export default Sidebar;
