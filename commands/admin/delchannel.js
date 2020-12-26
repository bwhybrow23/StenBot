module.exports = {
  name: "delchannel",
  category: "admin",
  description: "Removes the mentioned channel.",
  usage: "<#CHANNEL>",
  example: "#general",
  permission: "ADMIN",
  run: async (bot, message, args) => {

    const Discord = require("discord.js");
    if (!message.guild) return;
    const fs = require("fs");
    var c = message.mentions.channels.first();

    if (!c || args[0] == "help") {
      return bot.helpEmbed("delchannel", bot)
      .then((embed) => message.channel.send(embed))
      .catch((error) => bot.log.post("error", error));
    }

    const config = await bot.mutils.getGuildById(message.guild.id);

    if (config.staff_admin == false) {
      return bot.createEmbed("error", "", `Error! Admin commands are disabled. To use them, enable them with **sb!config-staff admin enable**`, [], `${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }

    if (c == undefined) {
      return bot.createEmbed("error", "", "Error! You forgot to mention a channel to remove!", [], `${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }

    if (message.member.hasPermission("ADMINISTRATOR") == false) {
      return bot.noPermsEmbed(`${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }

    if (c.deletable == false) {
      return bot.createEmbed("error", "", "Error! I am unable to delete that channel!", [], `${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }

    c.delete().then((deleted) => {
      return bot.createEmbed("success", "", `The channel **${deleted.name}** has been removed by administrator **${message.author}**`, [], `${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error))
  });
  },
};
