/**
 * Главный компонент админ-панели
 * Управление контентом сайта: вакансии, статьи, команда, продукты
 */
import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import VacanciesPage from './pages/VacanciesPage';
import ArticlesPage from './pages/ArticlesPage';
import TeamPage from './pages/TeamPage';
import ProductsPage from './pages/ProductsPage';
import './App.css';

const { Content } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar />
        <Layout>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/vacancies" element={<VacanciesPage />} />
              <Route path="/articles" element={<ArticlesPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/products" element={<ProductsPage />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
