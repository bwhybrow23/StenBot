module.exports = {
  name: "balance",
  category: "eco",
  description: "Check your balance.",
  usage: "[@USER]",
  example: "@Steve#1234",
  options: { permission: "EVERYONE", aliases: ["bal", "money"], enabled: true, cooldown: 5, guildOnly: false },
  run: async (bot, message, args) => {

    const Discord = require("discord.js");
    const ecoUtils = require("../../main/functions/ecoUtils");

    let person = message.mentions.users.first() || message.author;

    if (!person || args[0] == "help") {
      return bot.helpEmbed("balance", bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }

    await ecoUtils.getUser(person.id).then(async (user) => {
      return bot.createEmbed("info", "", `${person} has ${user.balance} credits.`, [], ``, message)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    })

  }
};