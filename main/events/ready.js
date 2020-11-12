module.exports = (bot) => {
  const utils = require("../functions/utilities.js");

  //Mode Checker
  const fs = require("fs");

  //Update bot-data.json
  let botdata = require("../../data/global/bot-data.json");
  botdata.botName = bot.user.tag;
  botdata.botID = bot.user.id;
  botdata.totalGuilds = bot.guilds.cache.size;
  fs.writeFileSync(`./data/global/bot-data.json`, JSON.stringify(botdata, null, 4), (err) => { if (err) return bot.logger("error", err); });

  //Production Mode
  if (bot.settings.mode === "production") {
    //Status
    let guilds = bot.guilds.cache.size;
    bot.user.setPresence({ activity: { name: `sb!help on ${guilds} servers!`, type: `WATCHING` }, status: 'online' });

    //Console Log
    let date = new Date();
    bot.logger("success", `${bot.user.username} Started Successfully in Production Mode. Version: ${bot.packageJSON.version}`);
  }

  //Development Mode
  if (bot.settings.mode === "development") {
    //Status
    date = new Date();
    bot.user.setPresence({ activity: { name: `In Development Mode`, type: `PLAYING` }, status: 'dnd' });

    //Console Log
    bot.logger("success", `${bot.user.username} Started Successfully in Development Mode | Date: ${date}`);
  }

  //VERIFICATION FOR SUPPORT DISCORD
  if (bot.settings.options.verifEnabled) {
    utils.resetVerif(bot);
  }
};
