const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const serverless = require('serverless-http');

const app = express();
const router = express.Router();

app.use(cors());

router.get('/', async (req, res) => {
  const params = req.query?.params ?? false;

  try {
    if (!params) {
      return res.json({ httpStatus: 400 })
    }

    const { url, api, formats, options = {} } = JSON.parse(params);

    if (!api || !ytdl[api]) {
      return res.json({ httpStatus: 400 })
    }

    if (!ytdl.validateURL(url)) {
      return res.json({ httpStatus: 404 })
    }

    const respon = await ytdl[api](url || formats, options);

    res.json({ httpStatus: 200, result: respon });
  } catch (error) {
    return res.json({ httpStatus: 500 })
  }
});

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
