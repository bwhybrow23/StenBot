const express = require('express');
const router = express.Router();
const mutils = require('../functions/mongoUtils');

const Auth = require('../middleware/auth');

//Get all guilds
//router.get("/api/guilds", Auth.discord, (req, res) => {
  
    //Permission Check
    // let member = bot.users.cache.fetch(req.discordID);
    // res.send(member.user.tag);
    // console.log(bot);

//   mutils.getAllGuilds().then(data => {
//     var allGuilds = data;
//     res.status(200).send(allGuilds);
//   })
//})

//Get a guild by ID
// router.get("/api/guild/:id", Auth.discord, (req, res) => {
//   mutils.getGuildById(req.params.id).then(data => {
//     var guildData = data;
//     res.status(200).send(guildData);
//   })
// })

module.exports = router;