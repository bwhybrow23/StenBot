module.exports = {
  name: "pay",
  category: "eco",
  description: "Give some money to another user.",
  usage: "sb!pay <@USER> <VALUE>",
  permission: "EVERYONE",
  run: async (bot, message, args) => {
    const Discord = require("discord.js");
    const fs = require("fs");
    const db = require("quick.db");

    let user = message.mentions.users.first();
    let member = db.fetch(`money_${message.author.id}`);
    let amount = args[1];

    if (!user)
      return message.reply(
        `You need to specify a user to transfer the money to.`
      );
    if (!amount)
      return message.reply(
        `You need to specify the amount of money you want to transfer.`
      );

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
