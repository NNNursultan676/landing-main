
import axios from "axios";

const BASE_URL = '/api';

const api = axios.create({
  baseURL: BASE_URL,
});

export const mailService = async (data) => {
  try {
    // Send form data to the backend
    const response = await axios.post('/api/send-mail', data);
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('Mail sent successfully:', response.data);
    }
    alert('Сообщение отправлено успешно!');
  } catch (error) {
    console.error('Error sending mail:', error);
    alert('Ошибка при отправке сообщения: ' + (error.response?.data?.error || error.message));
  }
};    

