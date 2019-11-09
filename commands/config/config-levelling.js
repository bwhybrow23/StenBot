module.exports = {
    name: "config-levelling",
    category: "config",
    description: "Change all config variables related to levelling.",
    example: ".config-levelling enable",
    permission: "ADMIN",
    run: (bot, message, args) => {

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
                color: bot.settings.color.red,
                description: `Error! You are not the owner or an admin!`
            }
        });
    };

    //Check if they included a setting
    let setting = args[0];

    if (setting == undefined) {
        return message.channel.send({
            embed: {
                color: bot.settings.color.red,
                description: `Error! You forgot to include a levelling setting.`
            }
        });
    };

    //Get the server config
    const config = JSON.parse(fs.readFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, "utf8"));


    //Settings library
    switch (setting) {
        case "enable":

            if (config.levellingenabled == true) {
                return message.channel.send({
                    embed: {
                        color: bot.settings.color.red,
                        description: `Error! Levelling is already enabled.`
                    }
                });
            };

            config.levellingenabled = true;
            fs.writeFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, JSON.stringify(config, null, 4), (err) => {
                if (err) return;
            });
            message.channel.send({
                embed: {
                    color: bot.settings.color.green,
                    description: `Levelling has now been enabled.`
                }
            });
            break;

        case "disable":

            if (config.levellingenabled == false) {
                return message.channel.send({
                    embed: {
                        color: bot.settings.color.red,
                        description: `Error! Levelling is already disabled.`
                    }
                });
            };

            config.levellingenabled = false;
            fs.writeFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, JSON.stringify(config, null, 4), (err) => {
                if (err) return;
            });
            message.channel.send({
                embed: {
                    color: bot.settings.color.green,
                    description: `Levelling has now been disabled.`
                }
            });
            break;

        default:
            message.channel.send({
                embed: {
                    color: bot.settings.color.red,
                    description: `Error! No log setting called **${setting}**`
                }
            });
    };
}};
