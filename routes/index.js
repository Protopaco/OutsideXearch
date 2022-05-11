var express = require('express');
var router = express.Router();
const UnprocessedVideos = require('../lib/models/unprocessed-videos');

/* GET home page. */
router.get('/seed', async function (req, res, next) {
  try {
    await UnprocessedVideos.fetchAllFromAPI();
    res.status(200);

  } catch (e) {
    res.send(e.message)
  }
});

router.get('/setup', async function (req, res, next) {
  try {
    await UnprocessedVideos.setupTables();
    res.status(200);

  } catch (e) {
    res.send(e.message)
  }
});

module.exports = router;
