module.exports = async (bot, guild) => {
  const Discord = require("discord.js");
  const fs = require("fs");

  console.log("[SYSTEM]".grey + `Left guild ${guild.name} | ${guild.id}`);

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
};
