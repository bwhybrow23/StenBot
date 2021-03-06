module.exports = {
  name: "say",
  category: "admin",
  description: "Get StenBot to say something",
  usage: "<MESSAGE>",
  example: "Hello World!",
  options: { permission: "ADMIN", enabled: true, cooldown: 5, guildOnly: true, cooldown: 5 },
  run: async (bot, message, args) => {

    const Discord = require("discord.js");

    //Permission Check
    if (message.member.hasPermission("ADMINISTRATOR") == false) {
      return bot.noPermsEmbed(`${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }

    //Input Validation
    var msg = args.slice(0).join(" ");
    if (!msg || args[0] == "help") {
      return bot.helpEmbed("say", bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }

    if (msg.length > 500) {
      return bot.createEmbed("error", "", `Error! Your message it too long. It must be less that **500** characters.`, [], `${message.guild.name}`, message)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }

    if (msg.length < 2) {
      return bot.createEmbed("error", "", `Error! Your message is too short.`, [], `${message.guild.name}`, message)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }

    //Send the Message
    return bot.createEmbed("success", "", `${msg}`, [], `${message.guild.name}`, message)
      .then((embed) => message.channel.send(embed))
      .catch((error) => bot.log.post("error", error));
  },
};