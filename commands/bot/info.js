module.exports = {
  name: "info",
  category: "bot",
  description: "Find out about all information related to the bot's connection to Discord.",
  usage: "",
  example: "",
  options: { permission: "EVERYONE", aliases: ["ping", "status", "stats", "uptime"], enabled: true, cooldown: 10, guildOnly: false },
  run: async (bot, message, args) => {

    const Discord = require("discord.js");
    const fs = require("fs");
    const memusage = JSON.parse(fs.readFileSync("./data/global/bot-data.json", "utf8"));
    const packageJSON = require("../../package.json");

    let ping = Math.floor(bot.ws.ping);
    let memUsed = Math.floor(memusage.info.memoryUsage);
    let uptime = new Date(process.uptime() * 1000).toISOString().substr(11, 8);
    let totalGuilds = bot.guilds.cache.size;
    let totalMembers = bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0);
    let totalCommands = require("../../data/global/bot-data.json").stats.commands.total;

    let embed = new Discord.MessageEmbed()
      .setColor(4886754)
      .setTitle("StenBot Info")
      .setThumbnail(bot.user.avatarURL())
      .setDescription("Here you can find all information about StenBot!")
      .addField("\u200b", "**Connection Info:**", false)
      .addField("Ping:", `${ping}ms`, true)
      .addField("Memory Usage:", `${memUsed}MB`, true)
      .addField("Uptime:", `${uptime}s`, true)
      .addField("\u200b", "**Bot Stats:**", false)
      .addField("Total Guilds:", totalGuilds, true)
      .addField("Total Members:", totalMembers, true)
      .addField("Total Commands:", totalCommands, true)
      .addField("Version:", packageJSON.version, true)
      .setFooter(message.guild.name, message.guild.iconURL());

    message.channel.send({embeds: [embed.toJSON()]});

  }
};