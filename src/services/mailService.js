// src/services/mailService.js

import axios from 'axios';

export const sendMail = async (mailData) => {
  console.log('Mail data:', mailData);
  const url = '/send'; // Proxy endpoint
  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.post(url, mailData, { headers });
    return response.data;
  } catch (error) {
    console.error('Error sending mail:', error);
    throw error;
  }
};
