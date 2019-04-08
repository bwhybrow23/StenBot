exports.run = (bot, message, args) => {

    //const settings = require('../main/settings.json');
    const Discord = require("discord.js");

    let userimage = message.author.avatarURL;
    let usertag = message.author.tag;

    message.channel.send({
        embed: {
            title: 'About StenBot',
            color: bot.settings.green,
            description: '\n**StenBot** is a multi-purpose bot designed to make your life easier and your server better. StenBot is coded in JavaScript and uses the Discord.JS library to make coding easier.\n\nYou can find out a lot more in our docs!\n[**https://docs.stenbot.co.uk/**]'
        }
    });


};
