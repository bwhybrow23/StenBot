exports.run = (bot, message, args) => {

    //const settings = require('../main/settings.json');
    const Discord = require("discord.js");

    let userimage = message.author.avatarURL;
    let usertag = message.author.tag;

    let aboutEmbed = new Discord.RichEmbed()
    .setColor(bot.settings.yellow)
    .setTitle("About StenBot")
    .setDescription("**StenBot** is a multi-purpose bot designed to make your life easier and your server better. StenBot is coded in JavaScript and uses the Discord.JS library to make coding it easier for the developers.")
    .addField("Documentation", "At this current moment in time, no documentation has been created for StenBot. Eventually we do hope to have documentation!")
    .setFooter(usertag, userimage);

    message.channel.send(aboutEmbed);

};
