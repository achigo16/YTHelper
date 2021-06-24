const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const ytdl = require('ytdl-core');

const app = express();
const router = express.Router();

app.use(cors());

router.get('/', async (req, res) => {
  const params = req.query?.params ?? false;

  try {
    if (!params) {
      return res.json({ status: 400 });
    }

    const { url, api, formats, options = {} } = JSON.parse(params);

    if (!api || !ytdl[api]) {
      return res.json({ status: 400 });
    }

    if (!ytdl.validateURL(url)) {
      return res.sendStatus(404);
    }

    const response = await ytdl[api](url || formats, options);

    res.json({ status: 200, response  })
  } catch (error) {
    res.send('Err: ' + error);
    return res.json({ status: 500 });
  }
});

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
