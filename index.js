const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const app = express();
const PORT = 4000;

app.use(cors());

app.listen(PORT, () => {
  console.log(`Working at port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Hello Under World!');
});
