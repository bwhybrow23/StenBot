exports.run = async (bot, message, args) => {

    const Discord = require("discord.js");
    const fs = require("fs");
    const eco = require("discord-economy");

    let person = message.mentions.users.first() || message.author;

    if (person.id === message.author.id) {
    var output = await eco.FetchBalance(message.author.id)
    message.reply(`You have a balance of **${output.balance}** coins.`);
    } else {
        var output = await eco.FetchBalance(person.id);
        message.channel.send(`**${person.username}** has a balance of **${output.balance}** coins.`)
    }

}