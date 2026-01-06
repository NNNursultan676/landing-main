import './AntReset.css';
import './App.css';
import Mainlayout from './layouts/MainLayout/Mainlayout';
import './shared/config/i18n';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './layouts/About/About';
import Products from './layouts/Products/Products';
import Partners from './layouts/Partners/Partners';
import Contacts from './layouts/Contacts/Contacts';
import DemoModal from './components/DemoModal/DemoModal';
import NotFound from './components/NotFound/NotFound';
import { Layout } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const LayoutWrapper = ({ children }) => {
  return  <Layout className="ant-layout">
              {children}
          </Layout>
};

function App() {
  return (
    <BrowserRouter>
     <LayoutWrapper>
      <Routes>
        <Route path="/" element={<Mainlayout />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
      <DemoModal />
      <ToastContainer />
      </LayoutWrapper>
    </BrowserRouter>
  );
}

export default App;
