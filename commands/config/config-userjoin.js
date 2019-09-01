exports.run = (bot, message, args) => {

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
                description: `Error! You forgot to include a userjoin setting.`
            }
        });
    };

    //Get the server config
    const config = JSON.parse(fs.readFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, "utf8"));


    //settings library
    switch (setting) {
        case "enable":
            if (config.userjoinenabled) {
                return message.channel.send({
                    embed: {
                        color: bot.settings.color.yellow,
                        description: `Welp, looks like its already enabled! To disable it do **.config-userjoin disable**`
                    }
                })
            };
            config.userjoinenabled = true;
            fs.writeFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, JSON.stringify(config, null, 4), (err) => {
                if (err) return;
            });
            message.channel.send({
                embed: {
                    color: bot.settings.color.green,
                    description: `User join has been enabled!`
                }
            });
            break;
        case "disable":
            if (!config.userjoinenabled) {
                return message.channel.send({
                    embed: {
                        color: bot.settings.color.yellow,
                        description: `Uhm, userjoin is alread disabled, you can enable it by doing **.config-userjoin enable**`
                    }
                })
            };
            config.userjoinenabled = false;
            fs.writeFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, JSON.stringify(config, null, 4), (err) => {
                if (err) return;
            });
            message.channel.send({
                embed: {
                    color: bot.settings.color.green,
                    description: `User join has been disabled!`
                }
            });
            break;
        case "role":

            var targetrole = message.mentions.roles.first();

            if (!config.userjoinenabled) {
                return message.channel.send({
                    embed: {
                        color: bot.settings.color.red,
                        description: `Error! User join is not enabled! You can enable it with **.config-userjoin enable**`
                    }
                });
            };
            if (targetrole == undefined) {
                return message.channel.send({
                    embed: {
                        color: bot.settings.color.red,
                        description: `Error! You forgot to mention a role to set!`
                    }
                });
            };

            let botmember = message.guild.members.get(bot.user.id);
            let comparedpos = targetrole.comparePositionTo(botmember.highestRole);


            if (comparedpos > 0) {
                return message.channel.send({
                    embed: {
                        color: bot.settings.color.red,
                        description: `Error! I will be unable to add that role to people!`
                    }
                });
            };

            if (targetrole.id == config.userjoinedrole) {
                return message.channel.send({
                    embed: {
                        color: bot.settings.color.red,
                        description: `Error! That role is already set as the auto-role!`
                    }
                });
            };

            config.userjoinedrole = targetrole.id;

            fs.writeFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, JSON.stringify(config, null, 4), (err) => {
                if (err) return;
            });

            message.channel.send({
                embed: {
                    color: bot.settings.color.green,
                    description: `Auto-role is set to **${targetrole.name}**`
                }
            });
            break;
        case "name":

            var name = args.slice(1).join(" ");

            if (name == undefined) {
                return message.channel.send({
                    embed: {
                        color: bot.settings.color.red,
                        description: `Error! You didnt include a name!`
                    }
                });
            };

            if (name.length > 32) {
                return message.channel.send({
                    embed: {
                        color: bot.settings.color.red,
                        description: `Error! The name you have written is too long! It has to be less than **32** characters!`
                    }
                });
            };

            config.userjoinedname = name;
            fs.writeFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, JSON.stringify(config, null, 4), (err) => {
                if (err) return;
            });
            message.channel.send({
                embed: {
                    color: bot.settings.color.green,
                    description: `Auto-name is set to **${name}**`
                }
            });
            break;
        default:
            message.channel.send({
                embed: {
                    color: bot.settings.color.red,
                    description: `Error! No user join setting called **${setting}**`
                }
            });
    };
};