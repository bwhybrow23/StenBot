exports.run = async (bot, message, args) => {

    const Discord = require("discord.js");
    const fs = require("fs");
    const eco = require("discord-economy");

    var user = message.mentions.users.first();
    var amount = args[1];

    if (!user) return message.reply(`You need to specify a user to transfer the money to.`);
    if (!amount) return message.reply(`You need to specify the amount of money you want to transfer.`);

    var output = await eco.FetchBalance(message.author.id)
    if (output.balance < amount) return message.reply(`You do not have enough money to transfer.`);

    var transfer = await eco.Transfer(message.author.id, user.id, amount);
    message.reply(`Transfer complete! Your new balance is ${transfer.FromUser}`);

}