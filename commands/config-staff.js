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
                color: bot.settings.red,
                description: `Error! You are not the owner or an admin!`
            }
        });
    };

    //Check if they included a setting
    let setting = args[0];

    if (setting == undefined) {
        return message.channel.send({
            embed: {
                color: bot.settings.red,
                description: `Error! You forgot to include a staff setting.`
            }
        });
    };

    //Get the server config
    const config = JSON.parse(fs.readFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, "utf8"));


    //settings library
    switch (setting) {
        case "role":
            var targetrole = message.mentions.roles.first();
            if (targetrole == undefined) {
                return message.channel.send({
                    embed: {
                        color: bot.settings.red,
                        description: `Error! You forgot to mention a role to set as the new staff role!`
                    }
                });
            };

            config.staffrole = targetrole.id;

            fs.writeFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, JSON.stringify(config, null, 4), (err) => {
                if (err) return;
            });

            message.channel.send({
                embed: {
                    color: bot.settings.green,
                    description: `Your servers staff role has been set! Users with this role can now use staff commands!`
                }
            });
            break;
        case "admin":

            var status = args[1];
            if (status == undefined) {
                return message.channel.send({
                    embed: {
                        color: bot.settings.red,
                        description: `Error! You forgot to include a status, enable/disable!`
                    }
                });
            };

            if (status == "enable") {
                if (config.staffadminenabled == true) {
                    return message.channel.send({
                        embed: {
                            color: bot.settings.red,
                            description: `Error! It is already **enabled**!`
                        }
                    });
                };

                config.staffadminenabled = true;
                fs.writeFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, JSON.stringify(config, null, 4), (err) => {
                    if (err) return;
                });
                return message.channel.send({
                    embed: {
                        color: bot.settings.green,
                        description: `Admin commands have been **enabled**`
                    }
                });

            } else if (status == "disable") {
                if (config.staffadminenabled == false) {
                    return message.channel.send({
                        embed: {
                            color: bot.settings.red,
                            description: `Error! It is already **disabled**!`
                        }
                    });
                };

                config.staffadminenabled = false;
                fs.writeFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, JSON.stringify(config, null, 4), (err) => {
                    if (err) return;
                });
                return message.channel.send({
                    embed: {
                        color: bot.settings.green,
                        description: `Admin commands have been **disabled**`
                    }
                });
            } else {
                return;
            };


            break;
        case "linkblock":

            var status = args[1];
            if (status == undefined) {
                return message.channel.send({
                    embed: {
                        color: bot.settings.red,
                        description: `Error! You forgot to include a status, enable/disable!`
                    }
                });
            };

            if (status == "enable") {
                if (config.stafflinkblocker == true) {
                    return message.channel.send({
                        embed: {
                            color: bot.settings.red,
                            description: `Error! Linkblocker is already **enabled**!`
                        }
                    });
                };

                config.stafflinkblocker = true;
                fs.writeFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, JSON.stringify(config, null, 4), (err) => {
                    if (err) return;
                });
                return message.channel.send({
                    embed: {
                        color: bot.settings.green,
                        description: `Link blocker has been **enabled**`
                    }
                });

            } else if (status == "disable") {
                if (config.stafflinkblocker == false) {
                    return message.channel.send({
                        embed: {
                            color: bot.settings.red,
                            description: `Error! Link blocker is already **disabled**!`
                        }
                    });
                };

                config.stafflinkblocker = false;
                fs.writeFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, JSON.stringify(config, null, 4), (err) => {
                    if (err) return;
                });
                return message.channel.send({
                    embed: {
                        color: bot.settings.green,
                        description: `Link blocker has been **disabled**`
                    }
                });
            } else {
                return;
            };
            break;

        case "filteradd":

            var word = args[1];
            if (word == "8") {
                return message.channel.send({
                    embed: {
                        color: bot.settings.red,
                        description: `You can't add the number 8 to the filter.`,
                        footer: {
                            text: 'StenBot Word Filter  :)'
                        }
                    }
                });
            };

            let filter = config.stafffilter;
            if (filter.includes(word)) {
                return message.channel.send({
                    embed: {
                        color: bot.settings.red,
                        description: `Error! That word is already in the filter!`,
                    }
                });
            };

            config.stafffilter.push(word);

            fs.writeFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, JSON.stringify(config, null, 4), (err) => {
                if (err) return;
            });

            message.channel.send({
                embed: {
                    color: bot.settings.green,
                    description: `The word **${word}** has been added to the filter!`
                }
            });

            break;
        case "filterremove":

            var word = args[1];

            let thefilter = config.stafffilter;
            if (!thefilter.includes(word)) {
                return message.channel.send({
                    embed: {
                        color: bot.settings.red,
                        description: `Error! **${word}** is not in the filter.`
                    }
                });
            };

            let indexofword = thefilter.indexOf(word);

            config.stafffilter.splice(indexofword, 1);

            fs.writeFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, JSON.stringify(config, null, 4), (err) => {
                if (err) return;
            });

            message.channel.send({
                embed: {
                    color: bot.settings.green,
                    description: `The word **${word}** has been removed from the filter!`
                }
            });

            break;
        case "warncap":

            var cap = args[1];
            if (isNaN(cap)) {
                return message.channel.send({
                    embed: {
                        color: bot.settings.red,
                        description: `Error! **${cap}** is not a number!`
                    }
                });
            };

            if (parseInt(cap) == config.staffautoban) {
                return message.channel.send({
                    embed: {
                        color: bot.settings.red,
                        description: `Error! The warn cap is already set to **${cap}**`
                    }
                });
            };

            if (parseInt(cap) == 0) {
                config.staffautoban = 0;
                fs.writeFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, JSON.stringify(config, null, 4), (err) => {
                    if (err) return;
                });
                return message.channel.send({
                    embed: {
                        color: bot.settings.green,
                        description: `Warn Cap has been disabled!`
                    }
                });
            };

            if (parseInt(cap) > 100) {
                return message.channel.send({
                    embed: {
                        color: bot.settings.red,
                        description: `Error! The warncap cannot be over 100!`
                    }
                });
            };

            if (parseInt(cap) < 0) {
                return message.channel.send({
                    embed: {
                        color: bot.settings.red,
                        description: `Error! The warncap cannot be less than 0!`
                    }
                });
            };

            config.staffautoban = parseInt(cap);
            fs.writeFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, JSON.stringify(config, null, 4), (err) => {
                if (err) return;
            });


            message.channel.send({
                embed: {
                    color: bot.settings.green,
                    description: `The warncap has been set to **${cap}**`
                }
            });

            break;
        default:
            message.channel.send({
                embed: {
                    color: bot.settings.red,
                    description: `Error! No staff setting called **${setting}**`
                }
            });
    };
};