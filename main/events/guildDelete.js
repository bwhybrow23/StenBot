module.exports = async (bot, guild) => {
  const Discord = require("discord.js");
  const fs = require("fs");

  bot.logger("info", `Left guild ${guild.name} | ${guild.id}`);

  // Update Status
  if (bot.settings.mode === "production") {
    let guilds = bot.guilds.cache.size;
    bot.user.setPresence({
      game: {
        name: `sb!help on ${guilds} servers!`,
        type: "WATCHING",
      },
      status: "online",
    });
  }

  //Update bot-data.json
  let botdata = require("../../data/global/bot-data.json");
  botdata.totalGuilds = bot.guilds.cache.size;
  fs.writeFileSync(`./data/global/bot-data.json`, JSON.stringify(botdata, null, 4), (err) => { if (err) return bot.logger("error", err); });
  
};
