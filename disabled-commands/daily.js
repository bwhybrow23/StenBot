module.exports = {
  name: "daily",
  category: "eco",
  description: "Recieve a daily prize. Redeemable every 24 hours.",
  usage: "sb!daily",
  permission: "EVERYONE",
  run: async (bot, message, args) => {
    
    const Discord = require("discord.js");
    const fs = require("fs");
    const db = require("quick.db");
    const ms = require("parse-ms");

    let timeout = 86400000; //24 hours
    let amount = Math.floor(Math.random() * 1000) + 1; //Random number 1-1000

    let daily = await db.fetch(`daily_${message.author.id}`);

    if (daily !== null && timeout - (Date.now() - daily) > 0) {
      let time = ms(timeout - (Date.now() - daily));

      bot.createEmbed("error","Daily Reward",`Error! You have already redeemed your daily reward for today. \nYou can redeem it again in **${time.hours}h ${time.minutes} and ${time.seconds}s**!`,[],`${message.guild.name}`,bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    } else {
      bot.createEmbed("success","",`Congrats, you just won ${amount} coins for today's daily reward. Come back in 24 hours to redeem again!`,[],`${message.guild.name}`,bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));

      message.channel.send(embed1);
      db.add(`money_${message.author.id}`, amount);
      db.set(`daily_${message.author.id}`, Date.now());
    }
  },
};
