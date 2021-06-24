const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const app = express();
const PORT = 4000;

app.use(cors());

app.listen(PORT, () => {
  console.log(`running at port ${PORT}`);
});

app.get('/', async (req, res) => {
  const params = req.query?.params ?? false;

  try {
    if (!params) {
      return res.sendStatus(400);
    }

    const { url, api, formats, options = {} } = JSON.parse(params);

    if (!api || !ytdl[api]) {
      return res.sendStatus(400);
    }

    if (!ytdl.validateURL(url)) {
      return res.sendStatus(404);
    }

    const respon = await ytdl[api](url || formats, options);

    res.send(respon);
    res.sendStatus(200);
  } catch (error) {
    res.send('Err: ' + error);
  }
});
