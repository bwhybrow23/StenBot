module.exports = {
  name: "vccreate",
  category: "admin",
  description: "Creates a voice channel.",
  usage: "<NAME>",
  example: "General VC",
  permission: "ADMIN",
  run: async (bot, message, args) => {

    const Discord = require("discord.js");
    if (!message.guild) return;
    const fs = require("fs");

    const config = await bot.mutils.getGuildById(message.guild.id);

    if (config.staff_admin == false) {
      return bot.createEmbed("error", "", `Error! Admin commands are disabled. To use them, enable them with **sb!config-staff admin enable**`, [], `${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }

    var n = args.slice(0).join(" ");
    if (!n || args[0] == "help") {
      return bot.helpEmbed("vccreate", bot)
      .then((embed) => message.channel.send(embed))
      .catch((error) => bot.logger("error", error));
    }

    if (n.length < 1) {
      return bot.createEmbed("error", "", `Error! You forgot to include a name for the channel!`, [], `${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }

    if (message.member.hasPermission("ADMINISTRATOR") == false) {
      return bot.noPermsEmbed(`${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }

    if (n.length > 100) {
      return bot.createEmbed("error", "", `The voice channel name has to be between 1 and 100 in **length**`, [], `${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }

    message.guild.channels.create(`${n}`, { type: 'voice', reason: `Created by ${message.author.tag}` }).then((channel) => {
      return bot.createEmbed("success", "", `The voice channel **${channel.name}** has been created.`, [], `${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    });
  },
};
