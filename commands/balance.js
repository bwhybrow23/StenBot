exports.run = async (bot, message, args) => {

    const Discord = require("discord.js");
    const fs = require("fs");
    const eco = require("discord-economy");

    var output = await eco.FetchBalance(message.author.id)
    message.channel.reply(`You have a balance of **${output.balance} coins.`);

}