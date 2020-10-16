module.exports = {
    name: "reload",
    category: "botowner",
    description: "Reload a command",
    usage: "<COMMAND>",
    example: "bash",
    permission: "BOT OWNER",
    run: async (bot, message, args) => {

        const Discord = require("discord.js");
        if (!message.guild) return;
        const fs = require("fs");

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


    }
}