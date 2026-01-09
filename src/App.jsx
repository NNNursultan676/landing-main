/**
 * ⚠️ КРИТИЧЕСКИ ВАЖНО: ГЛАВНЫЙ КОМПОНЕНТ ПРИЛОЖЕНИЯ - НЕ ТРОГАТЬ! ⚠️
 * 
 * Этот файл содержит:
 * 1. Инициализацию защиты от случайных свайпов и автодоводки - НЕ УДАЛЯТЬ
 * 2. Основную структуру приложения
 * 
 * Изменение может сломать:
 * - Защиту от случайных свайпов
 * - Автодоводку секций
 */

import './AntReset.css';
import './App.css';
import Mainlayout from './layouts/MainLayout/Mainlayout';
import './shared/config/i18n';
import DemoModal from './components/DemoModal/DemoModal';
import { Layout } from 'antd';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { initScrollProtection } from './utils/scrollProtection';

const LayoutWrapper = ({ children }) => {
  return  <Layout className="ant-layout">
              {children}
          </Layout>
};

function App() {
  // ⚠️ КРИТИЧНО: Инициализация защиты от случайных свайпов и автодоводки - НЕ УДАЛЯТЬ
  useEffect(() => {
    const cleanup = initScrollProtection();
    return cleanup;
  }, []);

  return (
    <LayoutWrapper>
      <Mainlayout />
      <DemoModal />
      <ToastContainer />
    </LayoutWrapper>
  );
}

export default App;
