exports.run = async (bot, message, args) => {

    const Discord = require("discord.js");
    const fs = require("fs");
    const eco = require("discord-economy");

    var flip = args[0];
    var amount = args[1];

    if (!flip || !['heads', 'tails'].includes(flip)) return message.reply(`You need to specify if it's heads or tails.`);
    if (!amount) return message.reply(`You need to specify the amount of money you want to bet.`);

    var output = await eco.FetchBalance(message.author.id);
    if (output.balance < amount) return message.reply(`You do not have enough money to bet.`);

    var gamble = await eco.Coinflip(message.author.id, flip, amount).catch(console.error);

    if (gamble.output === `Won`) {
        message.reply(`Congratulations! You won! Your new balance is ${gamble.newbalance}`);
    }

    if (gamble.output === `Lost`) {
        message.reply(`Aww. Better luck next time. New Balance: ${gamble.newbalance}`);
    }

}