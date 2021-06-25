const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');

const app = express();
const PORT = 4000;

app.use(cors());

app.listen(PORT, () => {
  console.log(`running at port ${PORT}`);
});

app.get('/api', (req, res) => {
  // Caching for vercel
  res.setHeader('Content-Type', 'text/html')
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate')
})

app.get('/api/:api', async (req, res) => {
  const api = req.params?.api ?? false;
  const params = req.query?.params ?? false;

  try {
    if (!params) {
      return res.sendStatus(400);
    }

    const { url, formats, options = {} } = JSON.parse(params);

    if (!api || !ytdl[api]) {
      return res.sendStatus(400);
    }

    if (!ytdl.validateURL(url) && !formats) {
      return res.sendStatus(404);
    }

    const response = await ytdl[api](url || formats, options);

    res.json(response);
  } catch (error) {
    res.sendStatus(500);
    res.json({ error });
  }
});

module.exports = app