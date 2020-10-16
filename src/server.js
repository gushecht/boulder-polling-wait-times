const express = require('express');
const path = require('path');
require('isomorphic-fetch');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('/wait-times', async (req, res) => {
  console.log('wait times')
  const response = await fetch('https://app.redash.io/boulder-county/api/queries/492531/results.json?api_key=inMwpXG9rggvAE4TLYN8Th6sQrYCnl2Z56NRp7aV')
  console.log(response)
  const json = await response.json();
  console.log(json)
  res.send(json.query_result.data.rows);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);

console.log(`Listening at ${process.env.PORT || 8080}`);
