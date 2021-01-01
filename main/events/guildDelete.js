module.exports = async (bot, guild) => {
  const Discord = require("discord.js");
  const fs = require("fs");

  bot.log.post("info", `Left guild ${guild.name} | ${guild.id}`);

  //Update bot-data.json
  let botdata = require("../../data/global/bot-data.json");
  botdata.stats.totalGuilds = bot.guilds.cache.size;
  fs.writeFileSync(`./data/global/bot-data.json`, JSON.stringify(botdata, null, 4), (err) => { if (err) return bot.log.post("error", err); });
  
};
