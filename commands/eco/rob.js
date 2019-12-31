module.exports = {
    name: "rob",
    category: "eco",
    description: "Try and rob a user of their money.",
    example: ".rob @Steve",
    permission: "EVERYONE",
    run: async (bot, message, args) => {

    const Discord = require("discord.js");
    const fs = require("fs");
    const db = require('quick.db');
    const ms = require('parse-ms');


    let user = message.mentions.members.first();
    if (!user) {
        return message.reply('You need to mention somebody to rob.')
    };
    let targetuser = await db.fetch(`money_${user.id}`) // fetch mentioned users balance
    let author = await db.fetch(`money_${message.author.id}`) // fetch authors balance

    if (author < 250) { // if the authors balance is less than 250, return this.
        return message.reply(':x: You need atleast 250$ to rob somebody.')
    }

    if (targetuser < 0) { // if mentioned user has 0 or less, it will return this.
        return message.reply(`:x: ${user.user.username} does not have anything to rob.`)
    }

    let timeout = 14400000; //4 hours
    let random = Math.floor(Math.random() * targetuser) + 1; // random number from target's balance

    if (targetuser == author) return message.reply("You cannot rob yourself of money silly.");

    let robTimeout = await db.fetch(`robTimeout_${message.author.id}`);

    if (robTimeout !== null && timeout - (Date.now() - robTimeout) > 0) {
        let time = ms(timeout - (Date.now() - robTimeout));

        let embed = new Discord.RichEmbed()
            .setColor(bot.settings.color.red)
            .setTitle(`Rob Timeout`)
            .setDescription(`Unfortunately you have already robbed someone. \nYou can redeem it again in **${time.hours}h ${time.minutes}m and ${time.seconds}s**!`)
            .setTimestamp()
            .setFooter(message.author.tag, message.author.displayURL);
        message.channel.send(embed);

    } else {

        let embed1 = new Discord.RichEmbed()
            .setColor(bot.settings.color.green)
            .setTitle(`Successfly Robbed ${user}!`)
            .setDescription(`Congrats! You manage to rob ${user} and got away with ${random} coins! Good job!`)
            .setTimestamp()
            .setFooter(message.author.tag, message.author.displayURL);

        message.channel.send(embed1);

        db.subtract(`money_${user.id}`, random)
        db.add(`money_${message.author.id}`, random)
        db.set(`robTimeout_${message.author.id}`, Date.now());
    }

}};