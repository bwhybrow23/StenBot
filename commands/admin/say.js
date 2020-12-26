module.exports = {
  name: "say",
  category: "admin",
  description: "Get StenBot to say something",
  usage: "<MESSAGE>",
  example: "Hello World!",
  permission: "ADMIN",
  run: async (bot, message, args) => {

    const Discord = require("discord.js");
    if (!message.guild) return;
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
      return bot.createEmbed("error", "", `Error! You are not the owner or an admin!`, [], `${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }

    var msg = args.slice(0).join(" ");
    if (!msg || args[0] == "help") {
      return bot.helpEmbed("say", bot)
      .then((embed) => message.channel.send(embed))
      .catch((error) => bot.log.post("error", error));
    }
    if (msg.length > 500) {
      return bot.createEmbed("error", "", `Error! Your message it too long. It must be less that **500** characters.`, [], `${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }
    if (msg.length < 2) {
      return bot.createEmbed("error", "", `Error! Your message is too short.`, [], `${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }

    return bot.createEmbed("success", "", `${msg}`, [], `${message.guild.name}`, bot)
      .then((embed) => message.channel.send(embed))
      .catch((error) => bot.log.post("error", error));
  },
};
