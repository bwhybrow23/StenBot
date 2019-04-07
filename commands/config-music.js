exports.run = (bot, message, args) => {

    const Discord = require("discord.js");
    const fs = require("fs");
    const checker = require("typechecker");

    let servertag = message.guild.name;

    const ownersid = message.guild.ownerID;
    const adminperm = message.member.hasPermission("ADMINISTRATOR");


    var access = true;

    if (adminperm == false) {
        var access = false;
    };

    if (access == false) {
        if (ownersid == message.author.id) {
            var access = true;
        };
    };

    if (access == false) {
        return message.channel.send({
            embed: {
                color: bot.bot.settings.red,
                description: `Error! You are not the owner or an admin!`
            }
        });
    };

    //Check if they included a setting
    let setting = args[0];

    if (setting == undefined) {
        return message.channel.send({
            embed: {
                color: bot.bot.settings.red,
                description: `Error! You forgot to include a music setting.`
            }
        });
    };

    //Get the server config
    const config = JSON.parse(fs.readFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, "utf8"));


    //Settings library
    switch (setting) {
        case "enable":

        if (config.musicenabled==true) {
          return message.channel.send({embed: {color: bot.settings.yellow, description: `Oh no. Looks like music is already enabled!`}});
        };
        config.musicenabled =true;

        fs.writeFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, JSON.stringify(config, null, 4), (err) => {
            if (err) return;
        });

        message.channel.send({embed: {color: bot.settings.green, description: `Music has been enabled!`}});
            break;
       case "disable":

        if (config.musicenabled==false) {
              return message.channel.send({embed: {color: bot.settings.yellow, description: `Oh no. Looks like music is already disabled!`}});
        };
        config.musicenabled =false;

        fs.writeFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, JSON.stringify(config, null, 4), (err) => {
            if (err) return;
        });

        message.channel.send({embed: {color: bot.settings.green, description: `Music has been disabled!`}});
            break;

        default:
            message.channel.send({
                embed: {
                    color: bot.settings.red,
                    description: `Error! No music setting called **${setting}**`
                }
            });
    };
};
