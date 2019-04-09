exports.run = (bot, message, args) => {

    const Discord = require("discord.js");
    const fs = require("fs");
    const colors = require("colors");

    //Check if the command was sent in the team guild
    if (message.guild.id != 455782308293771264) {
        return message.channel.send({
            embed: {
                color: bot.settings.red,
                description: 'Error! You do not have permission to do that!'
            }
        });
    };

    const targetserver = args[0];

    //Check if args have been included
    if (targetserver == undefined) {
        return message.channel.send({
            embed: {
                color: bot.settings.red,
                description: 'Error! You need to include the id of the server to blacklist'
            }
        });
    };

    if (targetserver == 346246641595973633) {
        return message.channel.send({
            embed: {
                color: bot.settings.red,
                description: `Error! Screw you **${message.author.tag}**`
            }
        });
    };


    //Attempt to read the servers stats file
    try {
        var targetserverfile = JSON.parse(fs.readFileSync(`./data/servers/server-${targetserver}/serverstats.json`, "utf8"));
    } catch (err) {
        return message.channel.send({
            embed: {
                color: bot.settings.red,
                description: 'Error! Sorry, I couldnt find that server!'
            }
        });
    };

    //Get the target guilds guild object
    const targetguild = bot.guilds.get(targetserver);


    //Set blacklist to true
    targetserverfile.blacklisted = true;

    fs.writeFileSync(`./data/servers/server-${targetserver}/serverstats.json`, JSON.stringify(targetserverfile, null, 4), (err) => {
        if (err) return console.log("[SYSTEM]".grey + err);
    });

    //Black list success mssage
    message.channel.send({
        embed: {
            color: bot.settings.green,
            description: `Success. Server: **${targetguild.name} | ${targetguild.id}** has been blacklisted.`
        }
    });

    //Log message
    bot.channels.get('460910822722502658').send({
        embed: {
            color: bot.settings.yellow,
            description: `Server **${targetguild.name} | ${targetguild.id}** has been blacklisted by **${message.author.tag}**`
        }
    });

    //Leave the blacklisted guild
    targetguild.leave();


};
