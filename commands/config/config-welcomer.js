module.exports = {
    name: "config-welcomer",
    category: "config",
    description: "Change all config variables related to welcomer.",
    example: ".config-welcomer enable",
    permission: "ADMIN",
    run: (bot, message, args) => {

    const Discord = require("discord.js");
    const fs = require("fs");
    var format = require("string-template")

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
                description: `Error! You forgot to include a welcomer setting.`
            }
        });
    };

    //Get the server config
    const config = JSON.parse(fs.readFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, "utf8"));


    //settings library
    switch (setting) {
        case "enable":
            if (config.welcomerenabled) {
                return message.channel.send({
                    embed: {
                        color: bot.settings.color.yellow,
                        description: `Ooof! Looks like welcomer is already enabled! To disable it, do **.config-welcomer disable**`
                    }
                })
            };
            config.welcomerenabled = true;
            fs.writeFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, JSON.stringify(config, null, 4), (err) => {
                if (err) return;
            });
            message.channel.send({
                embed: {
                    color: bot.settings.color.green,
                    description: `Welcomer has been enabled!`
                }
            });
            break;
        case "disable":
            if (!config.welcomerenabled) {
                return message.channel.send({
                    embed: {
                        color: bot.settings.color.yellow,
                        description: `Ooof! Looks like welcomer is already disabled! To enable it, do **.config-welcomer enable**`
                    }
                })
            };
            config.welcomerenabled = false;
            fs.writeFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, JSON.stringify(config, null, 4), (err) => {
                if (err) return;
            });
            message.channel.send({
                embed: {
                    color: bot.settings.color.green,
                    description: `Welcomer has been disabled!`
                }
            });
            break;
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

            if (targetchannel.id == config.welcomerchannel) {
                return message.channel.send({
                    embed: {
                        color: bot.settings.color.red,
                        description: `Error! That channel is already set as the welcomer channel!`
                    }
                });
            };

            config.welcomerchannel = targetchannel.id;
            message.channel.send({
                embed: {
                    color: bot.settings.color.green,
                    description: `Your welcomer channel has been set to **${targetchannel.name}**`
                }
            });

            fs.writeFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, JSON.stringify(config, null, 4), (err) => {
                if (err) return;
            });
            break;
        case "message":

            var setmessage = args.slice(1).join(" ");

            if (setmessage.length < 1) {
                return message.channel.send({
                    embed: {
                        color: bot.settings.color.red,
                        description: `Error! You forgot to include a message!`
                    }
                });
            };

            if (setmessage.length > 254) {
                return message.channel.send({
                    embed: {
                        color: bot.settings.color.red,
                        description: `Error! Your message needs to be less than **254** characters.`
                    }
                });
            };

            if (setmessage == config.welcomermessage) {
                return message.channel.send({
                    embed: {
                        color: bot.settings.color.red,
                        description: `Error! Your message is the same as the current one!`
                    }
                });
            };

            config.welcomermessage = setmessage;

            fs.writeFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, JSON.stringify(config, null, 4), (err) => {
                if (err) return;
            });

            message.channel.send({
                embed: {
                    color: bot.settings.color.green,
                    description: `New welcomer message set!\n\nTo:\n${setmessage}`
                }
            });

            break;
        case "placeholders":

            message.channel.send({
                embed: {
                    color: bot.settings.color.yellow,
                    description: `**Welcomer Message Placeholders**\n\nPlaceholders are words that are replaced by what they represent in the message. Here are some placeholders you can use.\n\n**{user}** - The user who joined\n**{usermention}** - Mention of the user who joined\n**{userdiscrim}** - The discriminator of the user who joined\n**{server}** - The server the user joined\n**{date}** - The date they joined`
                }
            })
            break;
        case "test":
            //Check if enabled
            if (config.welcomerenabled == false) {
                return message.channel.send({
                    embed: {
                        color: bot.settings.color.yellow,
                        description: `Oops. Looks like your configuration didnt work. This was because you havent enabled welcomer yet! You can do so by doing **.config-welcomer enable**`
                    }
                })
            };
            //Check if channel is set
            if (config.welcomerchannel == 0) {
                return message.channel.send({
                    embed: {
                        color: bot.settings.color.yellow,
                        description: `Oops. Looks like your configuration didnt work. This was because you havent set a channel for your welcome messages. You can do so by executing the following command: **.config-welcomer channel [#channel]**`
                    }
                })
            };
            //Check if channel is accessible by bot or exists
            let testingchannel = bot.channels.get("" + config.welcomerchannel + "");
            if (testingchannel == undefined) {
                return message.channel.send({
                    embed: {
                        color: bot.settings.color.yellow,
                        description: `Oops. Looks like your configuration didnt work. This is because the channel you have set no longer exists.`
                    }
                });
            };
            //Check if the bot has perms to send messages in that channel
            let botmember = message.guild.members.get(bot.user.id);
            if (botmember.permissionsIn(message.guild.channels.get("" + config.welcomerchannel + "")).has("SEND_MESSAGES") == false) {
                return message.channel.send({
                    embed: {
                        color: bot.settings.color.yellow,
                        description: `Oops. Looks like your configuration didnt work. This is because I am unable to send messages in the channel you have set.`
                    }
                });
            };


            let themsg = format(config.welcomermessage, {
                user: "Dummy#1234",
                usermention: message.author,
                userdiscrim: "1234",
                server: message.guild.name,
                date: new Date()
            });

            bot.channels.get(config.welcomerchannel).send({
                embed: {
                    color: bot.settings.color.yellow,
                    description: themsg
                }
            });
            message.react("✅");
            break;
        default:
            message.channel.send({
                embed: {
                    color: bot.settings.color.red,
                    description: `Error! No welcomer setting called **${setting}**`
                }
            });
    };
}};
