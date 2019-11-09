module.exports = {
    name: "daily",
    category: "eco",
    description: "Recieve a daily prize. Redeemable every 24 hours.",
    example: ".daily",
    permission: "EVERYONE",
    run: async (bot, message, args) => {

    const Discord = require("discord.js");
    const fs = require("fs");
    const db = require('quick.db');
    const ms = require('parse-ms');

    let timeout = 86400000; //24 hours
    let amount = Math.floor(Math.random() * 1000) + 1; //Random number 1-1000

    let daily = await db.fetch(`daily_${message.author.id}`);

    if (daily !== null && timeout - (Date.now() - daily) > 0) {
        let time = ms(timeout - (Date.now() - daily));

        let embed = new Discord.RichEmbed()
        .setColor(bot.settings.color.red)
        .setTitle(`Daily Reward`)
        .setDescription(`Unfortunately you have already redeemed your daily reward for today. \nYou can redeem it again in **${time.hours}h ${time.minutes}m and ${time.seconds}s**!`)
        .setTimestamp()
        .setFooter(message.author.tag, message.author.displayURL);
        message.channel.send(embed);
    } else {
        let embed1 = new Discord.RichEmbed()
        .setColor(bot.settings.color.green)
        .setTitle(`Daily Reward`)
        .setDescription(`Congrats, you just won ${amount} coins for today's daily reward. Come back tomorrow for more!`)
        .setFooter(message.author.tag, message.author.displayURL)
        .setTimestamp();

        message.channel.send(embed1);
        db.add(`money_${message.author.id}`, amount);
        db.set(`daily_${message.author.id}`, Date.now());

    }

}};
