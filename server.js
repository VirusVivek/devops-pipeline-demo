const express = require('express');
const app = express();
const env = process.env.NODE_ENV || 'development';
const config = require(`./config/${env}.json`);
const port = process.env.PORT || config.port;

app.get('/', (req, res) => {
  res.send(`Hello from my CI/CD pipeline! (${env} environment)`);
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'up', environment: env });
});

app.listen(port, () => {
  console.log(`Server running on port ${port} in ${env} mode`);
});
