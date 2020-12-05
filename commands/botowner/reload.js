module.exports = {
    name: "reload",
    category: "botowner",
    description: "Reload the bot.",
    usage: "[TYPE]",
    example: "docker",
    permission: "BOT OWNER",
    run: async (bot, message, args) => {

        const Discord = require("discord.js");
        if (!message.guild) return;
        const fs = require("fs");
        const cp = require("child_process");

        //Perm Checker
        const ownersid = message.guild.ownerID;
        if (message.author.id != ownersid) {
            return bot.noPermsEmbed(`${message.guild.name}`, bot)
                .then((embed) => message.channel.send(embed))
                .catch((error) => bot.logger("error", error));
        }

        //Check for Arg
        let command = args[0];
        if (!command || args[0] == "help") {
            return bot.helpEmbed("reload", bot)
            .then((embed) => message.channel.send(embed))
            .catch((error) => bot.logger("error", error));
          }

        // message.reply("Not working atm")

        switch (args[0]) {
            case "normal":
                
            cp.execFile("../../restart.bat");
            process.exit();

                break;

            case "docker":

            cp.exec('docker restart StenBot');

            break;
        
            default:

            message.reply("not done");
            
                break;
        }

    }
}