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
                description: `Error! You forgot to include a ticket setting.`
            }
        });
    };

    //Get the server config
    const config = JSON.parse(fs.readFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, "utf8"));


    //settings library
    switch (setting) {
        case "enable":

            if (config.ticketsenabled == true) {
                return message.channel.send({
                    embed: {
                        color: bot.settings.yellow,
                        description: `Oh no. Looks like tickets are already enabled!`
                    }
                });
            };
            config.ticketsenabled = true;

            fs.writeFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, JSON.stringify(config, null, 4), (err) => {
                if (err) return;
            });

            //Check for a category called tickets, if it does not exist create one
            function isCatTickets(element) {
                if (element.constructor.name != "CategoryChannel") { return false };
                if (element.name != "Tickets") { return false };
                return true;
            };
            if(!message.guild.channels.some(isCatTickets)) {
                message.guild.createChannel("Tickets", "category");
            };

            message.channel.send({
                embed: {
                    color: bot.settings.green,
                    description: `Tickets have been enabled!`
                }
            });
            break;
        case "disable":

            if (config.ticketsenabled == false) {
                return message.channel.send({
                    embed: {
                        color: bot.settings.yellow,
                        description: `Oh no. Looks like tickets are already disabled!`
                    }
                });
            };
            config.ticketsenabled = false;

            fs.writeFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, JSON.stringify(config, null, 4), (err) => {
                if (err) return;
            });

            //Check for a category called tickets, if it does not exist create one
            function isCatTickets(element) {
                if (element.constructor.name = "CategoryChannel") { return false };
                if (element.name = "Tickets") { return false };
                return true;
            };
            if(message.guild.channels.some(isCatTickets)) {
                message.guild.channel.delete("Tickets", "category");
            };

            message.channel.send({
                embed: {
                    color: bot.settings.green,
                    description: `Tickets have been disabled!`
                }
            });
            break;
        case "message":

            var tmessage = args.slice(1).join(" ");

            if (tmessage.length < 1) {
                return message.channel.send({
                    embed: {
                        color: bot.settings.yellow,
                        description: `Make sure you include a message!`
                    }
                });
            };

            if (tmessage.length > 256) {
                return message.channel.send({
                    embed: {
                        color: bot.settings.yellow,
                        description: `Welp! Looks like the message is too long! Make sure it is less than **256** charactors!`
                    }
                });
            };

            config.ticketsmsg = tmessage;

            fs.writeFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, JSON.stringify(config, null, 4), (err) => {
                if (err) return;
            });

            message.channel.send({
                embed: {
                    color: bot.settings.green,
                    description: `Ticket message set!`
                }
            });
            break;
        default:
            message.channel.send({
                embed: {
                    color: bot.settings.red,
                    description: `Error! No ticket setting called **${setting}**`
                }
            });
    };
};
