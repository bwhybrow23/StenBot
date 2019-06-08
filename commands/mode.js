exports.run = (bot, message, args) => {

    const Discord = require("discord.js");
    const fs = require("fs");
    const colors = require("colors");

    //Check if the command was sent in the team guild
    if (message.guild.id != 451793622430646272) {
        return message.channel.send({
            embed: {
                color: bot.settings.red,
                description: 'Error! You do not have permission to do that!'
            }
        });
    };

    const targetmode = args[0];

    //Check if args have been included
    if (targetmode == undefined) {
        return message.channel.send({
            embed: {
                color: bot.settings.red,
                description: 'Error! You need to include the name of the mode to set the bot into.'
            }
        });
    };


    //Get bot data
    var botdata = JSON.parse(fs.readFileSync(`./data/global/bot-data.json`, "utf8"));

    //Check if arg is correct
    if (targetmode == "normal" || targetmode == "maintenance") {
        switch (targetmode) {
            case "normal":
                if (botdata.mode == "normal") {
                    return message.channel.send("The bot is already in that mode.");
                };
                botdata.mode = "maintenance";
                fs.writeFileSync(`./data/global/bot-data.json`, JSON.stringify(botdata, null, 4), (err) => {
                    if (err) return console.log("[SYSTEM]".grey + err);
                });
                break;
                message.channel.send("Bot set to maintenance mode.");
                bot.user.setPresence({
                    game: {
                        name: 'Under Maintenance.'
                    },
                    status: 'dnd'
                });
            default:
                break;
        }
    }




};