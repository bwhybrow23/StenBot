module.exports = {
  name: "txtcreate",
  category: "admin",
  description: "Creates a text channel. (Category must pre-exist)",
  usage: "sb!txtcreate <NAME> [CATEGORY]",
  permission: "ADMINS",
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

    var n = args[0];

    if (n == undefined) {
      return bot.createEmbed("error", "", `Error! You forgot to include a name for the channel!`, [], `${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }

    if (message.member.hasPermission("ADMINISTRATOR") == false) {
      return bot.noPermsEmbed(`${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }

    var t = args.slice(1).join(" ") || "None";

    if (n.length > 100) {
      return bot.createEmbed("error", "", `The channel name has to be between 1 and 100 in **length**`, [], `${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }

    if (t.length > 1024) {
      return bot.createEmbed("error", "", `The channel topic has to be less that 1024 characters.`, [], `${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }

    message.guild.channels.create(`${n}`, { type: 'text', reason: `Created by ${message.author.tag}` }).then((channel) => {
      channel.setTopic(`${t}`);
      return bot.createEmbed("success", "", `The channel **${channel.name}** has been created.`, [], `${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    });
  },
};
