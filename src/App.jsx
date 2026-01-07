import './AntReset.css';
import './App.css';
import Mainlayout from './layouts/MainLayout/Mainlayout';
import './shared/config/i18n';
import DemoModal from './components/DemoModal/DemoModal';
import { Layout } from 'antd';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LayoutWrapper = ({ children }) => {
  return  <Layout className="ant-layout">
              {children}
          </Layout>
};

function App() {
  return (
    <LayoutWrapper>
      <Mainlayout />
      <DemoModal />
      <ToastContainer />
    </LayoutWrapper>
  );
}

export default App;
