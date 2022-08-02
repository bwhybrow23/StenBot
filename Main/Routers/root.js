const express = require('express');
const router = express.Router();
const bot = require('../../app.js');

const Auth = require('../Middleware/auth');

const settings = require('../settings.json');
const botdata = require('../../Data/Global/bot-data.json');
const packageJSON = require('../../package.json');

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
    'hotel': 'trivago',
    'theGame': 'lost'
  };
  res.status(200).json(info);
});

//Statistics
router.get('/api/stats', (req, res) => {
  botdata.stats.totalGuilds = bot.guilds.cache.size;
  botdata.stats.totalUsers = bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0);
  res.status(200).json(botdata.stats);
});

//Dependencies
router.get('/api/dependencies', (req, res) => {
  res.status(200).json(packageJSON.dependencies);
});

//Test Token and Output
router.get('/api/test', Auth.discord, (req, res) => {

  var ip = req.headers['x-forwarded-for'] ||
            req.socket.remoteAddress ||
            null;

  res.status(200).json({
    message: 'Test completed successfully, please see data below and confirm it is valid.',
    data: {
      token: req.token,
      discordID: req.discordID,
      ip: ip
    }
  });
});

module.exports = router;