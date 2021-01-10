const express = require('express');
const router = express.Router();

const settings = require("../settings.json");
const botdata = require("../../data/global/bot-data.json");
const packageJSON = require("../../package.json");

// MAIN WEBSITE
router.get("/", (req, res) => {
  try {
    res.render("index.html")
  } catch (error) {
    res.status(500).send({
      error: true,
      data: error.message
    });
  }
})

// Redirect /api to the basic info page
router.get('/api', (req, res) => {
  res.redirect('/api/info/');
})

// Basic bot info
router.get('/api/info', (req, res) => {
  let info = {
    "version": packageJSON.version,
    "prefix": settings.prefix,
    "mode": settings.mode,
    "botName": botdata.info.botName,
    "botID": botdata.info.botID,
    "hotel": "trivago",
    "theGame": "lost"
  }
  res.status(200).send(info)
});

router.get("/api/stats", (req, res) => {
  res.status(200).send(botdata.stats)
})

router.get("/api/dependencies", (req, res) => {
  res.status(200).send(packageJSON.dependencies);
})

module.exports = router;