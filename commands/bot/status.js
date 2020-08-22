module.exports = {
  name: "status",
  category: "bot",
  description: "Find out about all information related to the bot's connection to Discord.",
  usage: "sb!status",
  permission: "BOT OWNER",
  run: async (bot, message, args) => {

    const Discord = require("discord.js");
    const fs = require("fs");

    const cmdusage = JSON.parse(fs.readFileSync("./data/global/command-usage.json", "utf8"));
    const memusage = JSON.parse(fs.readFileSync("./data/global/memory-usage.json", "utf8"));

    let ping = Math.floor(bot.ws.ping);
    // let pingHistory = bot.ws.pings;
    let cmdTotal = cmdusage.total;
    let memUsed = Math.floor(memusage.memory);
    let totalGuilds = bot.guilds.cache.size;

    bot.createEmbed("success", "StenBot Status", `**Ping:** ${ping}\n**Total Commands Used:** ${cmdTotal}\n**Memory Usage:** ${memUsed}MB\n**Total Guilds:** ${totalGuilds}\n**Version:** ${bot.settings.version}`, [], `${message.guild.name}`, bot)
      .then((embed) => message.channel.send(embed))
      .catch((error) => console.error(error));
  
    }
};
