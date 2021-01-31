module.exports = {
  name: "status",
  category: "bot",
  description: "Find out about all information related to the bot's connection to Discord.",
  usage: "",
  example: "",
  options: { permission: "EVERYONE", aliases: ["ping"], enabled: true, cooldown: 10, guildOnly: false },
  run: async (bot, message, args) => {

    const Discord = require("discord.js");
    const fs = require("fs");
    const memusage = JSON.parse(fs.readFileSync("./data/global/bot-data.json", "utf8"));
    const packageJSON = require("../../package.json");

    let ping = Math.floor(bot.ws.ping);
    let memUsed = Math.floor(memusage.info.memoryUsage);
    let totalGuilds = bot.guilds.cache.size;
    let totalMembers = bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0);

    bot.createEmbed("success", "StenBot Status", `**Ping:** ${ping}ms\n**Memory Usage:** ${memUsed}MB\n**Total Guilds:** ${totalGuilds}\n**Total Members:** ${totalMembers}\n**Version:** ${packageJSON.version}`, [], `${message.server.name}`, bot)
      .then((embed) => message.channel.send(embed))
      .catch((error) => bot.log.post("error", error));

  }
};