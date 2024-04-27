import express from 'express';
const router = express.Router();
import * as bot from '../../app.js';

import * as settings from './Main/settings.json';
import * as botdata from ('../../Data/Global/bot-data.json');
import * as packageJSON from ('../../package.json');

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
    'botName': botdata.info.botName,
    'botID': botdata.info.botID,
    'totalGuilds': bot.guilds.cache.size,
    'totalUsers': bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0),
    'hotel': 'trivago',
    'theGame': 'lost'
  };
  res.status(200).json(info);
});

export default router;