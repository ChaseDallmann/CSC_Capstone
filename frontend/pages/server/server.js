import Pusher from 'pusher-js';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true
});

const PORT = process.env.PORT || 5000;

app.set('PORT', PORT);

app.post('/message', (req, res) => {
  const { message } = req.body;
  pusher.trigger('chat', 'message', {
    message: message,
  });
  res.status(200).send('Message sent');
}
);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}
);
