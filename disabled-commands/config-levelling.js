module.exports = {
  name: "config-levelling",
  category: "config",
  description: "Change all config variables related to levelling.",
  usage: "sb!config-levelling <SUBCOMMAND>",
  permission: "ADMIN",
  run: async (bot, message, args) => {

    const Discord = require("discord.js");
    if (!message.guild) return;
    const fs = require("fs");
    const checker = require("typechecker");

    let servertag = message.guild.name;

    const ownersid = message.guild.ownerID;
    const adminperm = message.member.hasPermission("ADMINISTRATOR");

    var access = true;

    if (adminperm == false) {
      var access = false;
    }

    if (access == false) {
      if (ownersid == message.author.id) {
        var access = true;
      }
    }

    if (access == false) {
      bot.createEmbed("error", "", `Error! You are not the owner or admin of this guild!`, [], `${message.guild.name}`, message)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }

    //Check if they included a setting
    let setting = args[0];

    if (setting == undefined) {
      bot.createEmbed("error","",`Error! You forgot to include a levelling setting.`,[],`${message.guild.name}`, message)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }

    //Get the server config
    const config = await bot.mutils.getGuildById(message.guild.id);

    //Settings library
    switch (setting) {
      case "enable":
        if (config.levelling_enabled == true) {
          bot.createEmbed("error","",`Error! Levelling is already enabled.`,[],`${message.guild.name}`,message)
            .then((embed) => message.channel.send(embed))
            .catch((error) => bot.log.post("error", error));
        }

        bot.mutils.updateGuildById(message.guild.id, { levelling_enabled: true })
        bot.createEmbed("success","",`Levelling has now been enabled.`,[],`${message.guild.name}`,message)
          .then((embed) => message.channel.send(embed))
          .catch((error) => bot.log.post("error", error));

        break;

      case "disable":
        if (config.levelling_enabled == false) {
          bot.createEmbed("error","",`Error! Levelling is already disabled. `,[],`${message.guild.name}`,message)
            .then((embed) => message.channel.send(embed))
            .catch((error) => bot.log.post("error", error));
        }

        bot.mutils.updateGuildById(message.guild.id, { levelling_enabled: false })
        bot.createEmbed("success","",`Levelling has now been disabled.`,[],`${message.guild.name}`,message)
          .then((embed) => message.channel.send(embed))
          .catch((error) => bot.log.post("error", error));
        break;

      default:
        bot.createEmbed("error","",`Error! No levelling setting called **${setting}**`,[],`${message.guild.name}`,message)
          .then((embed) => message.channel.send(embed))
          .catch((error) => bot.log.post("error", error));
    }
  },
};
