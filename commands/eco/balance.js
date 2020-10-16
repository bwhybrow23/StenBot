module.exports = {
  name: "balance",
  category: "eco",
  description: "Check your balance.",
  usage: "[@USER]",
  example: "@Steve#1234",
  permission: "EVERYONE",
  aliases: [ "bal" ],
  run: async (bot, message, args) => {

    const Discord = require("discord.js");
    if (!message.guild) return;
    const fs = require("fs");
    const db = require("quick.db");

    let person = message.mentions.users.first() || message.author;

    if (!person || args[0] == "help") {
      return bot.helpEmbed("balance", bot)
      .then((embed) => message.channel.send(embed))
      .catch((error) => bot.logger("error", error));
    }

    if (person.id === message.author.id) {
      let bal = db.fetch(`money_${message.author.id}`);
      if (bal === null) bal = 0;
      bot.createEmbed("info","Balance",`You currently have a balance of **${bal}** coins.`,[],`${message.guild.name}`,bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    } else {
      let bal = db.fetch(`money_${message.author.id}`);
      if (bal === null) bal = 0;
      bot.createEmbed("info",`${person.tag}'s Balance`,`${person.tag} currently has a balance of **${bal}** coins.`,[],`${message.guild.name}`,bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }
  },
};
