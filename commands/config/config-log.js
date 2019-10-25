module.exports = {
    name: "config-log",
    category: "config",
    description: "Change all config variables related to logging.",
    example: ".config-log enable",
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
                description: `Error! You forgot to include a log setting.`
            }
        });
    };

    //Get the server config
    const config = JSON.parse(fs.readFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, "utf8"));


    //Settings library
    switch (setting) {
        case "channel":
            var targetchannel = message.mentions.channels.first();

            if (targetchannel == undefined) {
                return message.channel.send({
                    embed: {
                        color: bot.settings.color.red,
                        description: `Error! You didnt mention a channel!`
                    }
                })
            };

            if (targetchannel.id == config.loggingchannel) {
                return message.channel.send({
                    embed: {
                        color: bot.settings.color.red,
                        description: `Error! That channel is already set as the log channel!`
                    }
                });
            };

            config.loggingchannel = targetchannel.id;
            message.channel.send({
                embed: {
                    color: bot.settings.color.green,
                    description: `Your logging channel has been set to **${targetchannel.name}**`
                }
            });

            fs.writeFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, JSON.stringify(config, null, 4), (err) => {
                if (err) return;
            });
            break;
        case "level":

            var level = args[1];
            if (level == undefined) {
                return message.channel.send({
                    embed: {
                        color: bot.settings.color.red,
                        descriptions: `Error! You didn't mention a logging level. Choose between low, medium or high. For more information check our docs at **docs.benwhybrow.xyz**`
                    }
                });
            };

            switch (level) {
                case "low":
                    if (config.logginglevel == "low") {
                        return message.channel.send({
                            embed: {
                                color: bot.settings.color.red,
                                description: `Error! Logging is already set to that level.`
                            }
                        });
                    };

                    config.logginglevel = "low";
                    fs.writeFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, JSON.stringify(config, null, 4), (err) => {
                        if (err) return;
                    });
                    message.channel.send({
                        embed: {
                            color: bot.settings.color.green,
                            description: `Logging level has been set to **low**`
                        }
                    });
                    break;
                case "medium":
                    if (config.logginglevel == "medium") {
                        return message.channel.send({
                            embed: {
                                color: bot.settings.color.red,
                                description: `Error! Logging is already set to that level.`
                            }
                        });
                    };

                    config.logginglevel = "medium";
                    fs.writeFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, JSON.stringify(config, null, 4), (err) => {
                        if (err) return;
                    });
                    message.channel.send({
                        embed: {
                            color: bot.settings.color.green,
                            description: `Logging level has been set to **medium**`
                        }
                    });
                    break;
                case "high":
                    if (config.logginglevel == "high") {
                        return message.channel.send({
                            embed: {
                                color: bot.settings.color.red,
                                description: `Error! Logging is already set to that level.`
                            }
                        });
                    };

                    config.logginglevel = "high";
                    fs.writeFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, JSON.stringify(config, null, 4), (err) => {
                        if (err) return;
                    });
                    message.channel.send({
                        embed: {
                            color: bot.settings.color.green,
                            description: `Logging level has been set to **high**`
                        }
                    });
                    break;
                default:
                    return message.channel.send({
                        embed: {
                            color: bot.settings.color.red,
                            description: `Error! There is no logging level called **${level}**`
                        }
                    });
            };
            break;
        case "enable":

            if (config.loggingenabled == true) {
                return message.channel.send({
                    embed: {
                        color: bot.settings.color.red,
                        description: `Error! Logging is already enabled.`
                    }
                });
            };

            config.loggingenabled = true;
            fs.writeFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, JSON.stringify(config, null, 4), (err) => {
                if (err) return;
            });
            message.channel.send({
                embed: {
                    color: bot.settings.color.green,
                    description: `Logging has now been enabled.`
                }
            });
            break;

        case "disable":

            if (config.loggingenabled == false) {
                return message.channel.send({
                    embed: {
                        color: bot.settings.color.red,
                        description: `Error! Logging is already disabled.`
                    }
                });
            };

            config.loggingenabled = false;
            fs.writeFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, JSON.stringify(config, null, 4), (err) => {
                if (err) return;
            });
            message.channel.send({
                embed: {
                    color: bot.settings.color.green,
                    description: `Logging has now been disabled.`
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
