const express = require('express');
const router = express.Router();
const mutils = require('../functions/mongoUtils');
const bot = require("../../app.js");

const Auth = require('../middleware/auth');

//Get all guilds
router.get("/api/guilds", Auth.discord, async (req, res) => {

  //Permission Check
  let member;
  try {
    member = await bot.users.fetch(req.discordID, true, true);
  } catch {
    return res.status(400).json({
      error: true,
      message: "Member cannot be fetched. Try making sure you're in a mutual server with StenBot."
    });
  }

  if (member.id !== bot.settings.ids.botOwner) {
    return res.status(401).json({
      error: true,
      message: "Unauthorized: Not bot owner"
    });
  } else if (member.id == bot.settings.ids.botOwner) {

    //Do the magic
    return mutils.getAllGuilds().then(data => {
      var allGuilds = data;
      res.status(200).json(allGuilds);
    })

  }
})

//Get a guild by ID
router.get("/api/guild/:id", Auth.discord, async (req, res) => {
  //Check params for ID
  if (!req.params.id) {
    return res.status(400).json({
      error: true,
      message: "No guild id provided in the parameters."
    });
  }

  //User Permission Check
  let guild, gMember, member;

  try {
    member = await bot.users.fetch(req.discordID, true, true);
  } catch {
    return res.status(400).json({
      error: true,
      message: "Member cannot be fetched. Try making sure you're in a mutual server with StenBot."
    });
  }

  //Check if guild exists
  try {
    guild = await bot.guilds.fetch(req.params.id, true, true);
  } catch {
    return res.status(400).json({
      error: true,
      message: "Guild cannot be fetched, check it is the correct ID."
    });
  }

  //Fetch member from guild
  try {
    gMember = guild.member(member);
  } catch {
    return res.status(400).json({
      error: true,
      message: "The user assosiated with the API key doesn't exist in the context of the guild."
    })
  }

  //Check permission of member
  if (!gMember.permissions.has("MANAGE_SERVER")) {
    return res.status(401).json({
      error: true,
      message: "You do not have the MANAGE_SERVER permission within the guild."
    });
  }

  //Do and send the magic
  return mutils.getGuildById(req.params.id).then(data => {
    if(data == null) {
      return res.status(400).json({
        error: true,
        message: "Guild cannot be found, check it is the correct ID or the bot is in the guild."
      })
    }
    var guildData = data;
    res.status(200).send(guildData);
  });

})

module.exports = router;