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
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');

  res.sendStatus(200);
});

app.get('/api/get', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { url, options = '{}' } = req.query;

  try {
    if (!ytdl.validateURL(url)) {
      return res.sendStatus(404);
    }

    const response = await ytdl.getInfo(url, JSON.parse(options));
    const format = ytdl.chooseFormat(
      response.formats.filter(({ container }) => container === 'mp4'),
      JSON.parse(options)
    );

    const tracks =
      response.player_response.captions.playerCaptionsTracklistRenderer
        .captionTracks;
    const track = tracks.find((t) => t.languageCode === 'id');

    res.statusCode = 200;
    res.json({ ...(format ?? {}), track });
  } catch (error) {
    res.statusCode = 500;
    res.json({ error });
  }
});

app.get('/api/:api', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const api = req.params?.api ?? false;
  const { url, formats, options = '{}' } = req.query;

  try {
    if (!api || !ytdl[api]) {
      return res.sendStatus(400);
    }

    if (!ytdl.validateURL(url) && !formats) {
      return res.sendStatus(404);
    }

    const response = await ytdl[api](url || formats, JSON.parse(options));

    res.statusCode = 200;
    res.json(response);
  } catch (error) {
    res.statusCode = 500;
    res.json({ error });
  }
});

module.exports = app;
