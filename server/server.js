// server/server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Pusher = require('pusher');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Pusher credentials
const pusher = new Pusher({
  appId: '1982070',
  key: '6024a3eb434904f0d50c',
  secret: 'd8a4c20459a578979d47',
  cluster: 'us2',
  useTLS: true
});

app.set('PORT', process.env.PORT || 5000);

// Chat message endpoint
app.post('/message', (req, res) => {
  const payload = req.body;
  pusher.trigger('chat', 'message', payload);
  res.send(payload);
});

app.listen(app.get('PORT'), () =>
  console.log(`Server running on port ${app.get('PORT')}`)
);
