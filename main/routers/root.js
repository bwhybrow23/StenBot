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
        res.status(500).send({error: true, data: error.message});
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
        "botName": botdata.botName,
        "botID": botdata.botID,
        "totalGuilds": botdata.totalGuilds,
        "dependencies": packageJSON.dependencies,
        "hotel": "trivago"
    }
    res.status(200).send(info)
})

module.exports = router;