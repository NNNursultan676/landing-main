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
  useEffect(() => {
    // Инициализация защиты от случайных свайпов
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
