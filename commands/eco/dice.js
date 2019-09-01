exports.run = async (bot, message, args) => {

    const Discord = require("discord.js");
    const fs = require("fs");
    const eco = require("stenbot-economy");

    var roll = args[0];
    var amount = args[1];

    if (!roll || ![1, 2, 3, 4, 5, 6].includes(parseInt(roll))) return message.reply(`You need to specify the number you want to roll. It has to be from 1-6.`);
    if (!amount) return message.reply(`You need to specify the amount of money you want to bet.`);

    var output = eco.FetchBalance(message.author.id);
    if (output.balance < amount) return message.reply(`You do not have enough money to roll the dice.`);

    var gamble = await eco.Dice(message.author.id, roll, amount).catch(console.error);

    if (gamble.output === `Won`) {
        message.reply(`Congratulations! You won! Your new balance is ${gamble.newbalance}`);
    }

    if (gamble.output === `Lost`) {
        message.reply(`Aww. Better luck next time. New Balance: ${gamble.newbalance}`);
    }

}