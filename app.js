const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/api/mail/send', async (req, res) => {
  try {
    const response = await axios.post(
      'http://sdf-mail-service.sdf.svc.cluster.local/api/mail/send',
      req.body
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error forwarding request:', error);
    res.status(500).send('Error forwarding request');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
