module.exports = {
  name: "status",
  category: "bot",
  description:
    "Find out about all information related to the bot's connection to Discord.",
  usage: "sb!status",
  permission: "BOT OWNER",
  run: async (bot, message, args) => {
    const fs = require("fs");
    const cmdusage = JSON.parse(
      fs.readFileSync("./data/global/command-usage.json", "utf8")
    );
    const memusage = JSON.parse(
      fs.readFileSync("./data/global/memory-usage.json", "utf8")
    );
    const Discord = require("discord.js");

    let ping = Math.floor(bot.ping);
    let pingHistory = bot.pings;
    let cmdTotal = cmdusage.total;
    let memUsed = Math.floor(memusage.memory);
    let totalGuilds = bot.guilds.size;

    bot
      .createEmbed(
        "success",
        "StenBot Status",
        `**Ping:** ${ping}\n**Ping History:** ${pingHistory}\n**Total Commands Used:** ${cmdTotal}\n**Memory Usage:** ${memUsed}MB\n**Total Guilds:** ${totalGuilds}\n**Version:** ${bot.settings.version}`,
        [],
        `${message.guild.name}`,
        bot
      )
      .then((embed) => message.channel.send(embed))
      .catch((error) => console.error(error));
  },
};
