module.exports = {
  name: "gay",
  category: "fun",
  description: "The bot will tell you how gay you are.",
  usage: "sb!gay",
  permission: "EVERYONE",
  run: async (bot, message, args) => {
    const Discord = require("discord.js");

    let gay = Math.round(Math.random() * 100);

    let person =
      message.mentions.users.first().username || message.author.user.username;

    let gayembed = new Discord.RichEmbed()
      .setColor("#f442d4")
      .setTitle(
        `:gay_pride_flag: **I think ${person} is ${gay}% gay!** :gay_pride_flag:`
      );

    return message.channel.send(gayembed);
  },
};
