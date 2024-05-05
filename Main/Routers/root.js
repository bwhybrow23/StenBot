import express from 'express';
const router = express.Router();
import * as bot from '../../app.js';

const settings = JSON.parse(fs.readFileSync('./Main/settings.json', 'utf8'));
const botData = JSON.parse(fs.readFileSync('../../Data/Global/bot-data.json', 'utf8'));
const packageJSON = JSON.parse(fs.readFileSync('../../package.json', 'utf8'));

// MAIN WEBSITE
router.get('/', (req, res) => {
  try {
    res.render('index.html');
  } catch (error) {
    res.status(500).send({
      error: true,
      data: error.message
    });
  }
});

router.get('/privacy', (req, res) => {
  try {
    res.render('privacy.html');
  } catch (error) {
    res.status(500).send({
      error: true,
      data: error.message
    });
  }
});

// Redirect /api to the basic info page
router.get('/api', (req, res) => {
  res.redirect('/api/info/');
});

// Basic bot info
router.get('/api/info', (req, res) => {
  let info = {
    'version': packageJSON.version,
    'prefix': settings.prefix,
    'mode': settings.mode,
    'botName': botData.info.botName,
    'botID': botData.info.botID,
    'totalGuilds': bot.guilds.cache.size,
    'totalUsers': bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0),
    'hotel': 'trivago',
    'theGame': 'lost'
  };
  res.status(200).json(info);
});

export default router;