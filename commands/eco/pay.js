module.exports = {
  name: "pay",
  category: "eco",
  description: "Give some money to another user.",
  usage: "<@USER> <VALUE>",
  example: "@Steve#6942 100",
  permission: "EVERYONE",
  run: async (bot, message, args) => {

    const Discord = require("discord.js");
    if (!message.guild) return;
    const fs = require("fs");
    const db = require("quick.db");

    let user = message.mentions.users.first();
    let member = db.fetch(`money_${message.author.id}`);
    let amount = args[1];

    if (!user || !amount || args[0] == "help") {
      return bot.helpEmbed("pay", bot)
      .then((embed) => message.channel.send(embed))
      .catch((error) => bot.logger("error", error));
    }

    if (message.content.includes("-")) {
      // if the message includes "-" do this.
      return message.channel.send("Negative money can not be paid.");
    }

    if (member < amount) {
      return message.reply(
        `That's more money than you've got in your balance.`
      );
    }

    message.channel.send(
      `${message.author.tag}, You successfully paid ${user.username} ${args[1]} coins.`
    );
    db.add(`money_${user.id}`, args[1]);
    db.subtract(`money_${message.author.id}`, args[1]);
  },
};
