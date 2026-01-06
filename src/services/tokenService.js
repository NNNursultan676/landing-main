import axios from 'axios';

export const getToken = async () => {
  const url = '/token/generate'; // Updated endpoint

  try {
    const response = await axios.post(url);
    return response.data;
  } catch (error) {
    console.error('Error getting token:', error);
    throw error;
  }
};
