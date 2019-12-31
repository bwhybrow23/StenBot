module.exports = {
    name: "account",
    category: "bot",
    description: "Command to manage your StenBot account.",
    example: ".account create",
    permission: "EVERYONE",
    run: async (bot, message, args) => {

    const Discord = require("discord.js");
    const fs = require("fs");
    var format = require("string-template");
    const download = require('image-downloader');

    //Accesschecking:
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
    let helpE = new Discord.RichEmbed()
    .setColor(bot.settings.color.blue)
    .setTitle("Command: Account")
    .addField("Description:", "Create and manage your StenBot account.", true)
    .addField("Usage", "`.account <query>`", true)
    .addField("Example", "`.account create`")
    .setFooter(message.author.tag, message.author.avatarURL)
    .setTimestamp();

    if (!args[0]) return message.channel.send(helpE);
    //Get the server config
    const config = JSON.parse(fs.readFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, "utf8"));
    //actions library
    switch (setting) {
        case "create":
            //Creating a StenBot Account Command
            //Check if an account already exists
            let accountexists = fs.existsSync(`./data/accounts/${message.author.id}.json`);
            if (accountexists == true) {
                return message.channel.send({
                    embed: {
                        color: bot.settings.color.red,
                        description: `You already have StenBot Account.`
                    }
                });
            };

            //Create new account file since it doesnt exist!
            //Create the user config file
            var currentDate = new Date()
            userconfigfile = {
                accountcreated: currentDate,
                accounttype: "normal",
                accountid: message.author.id,
                accountname: message.author.username,
                accountdiscrim: message.author.discriminator
            };

            fs.writeFileSync(`./data/accounts/${message.author.id}.json`, JSON.stringify(userconfigfile, null, 4), (err) => {
                if (err) return;
            });

            //Create the gallery folder for the pictures :D
            fs.mkdir(`./data/galleries/${message.author.id}`, err => {
                if (err && err.code != 'EEXIST') return;
            });

            //And return..
            message.channel.send({
                embed: {
                    color: bot.settings.color.green,
                    description: `Your StenBot Account has been created! :white_check_mark:`
                }
            });

            break;
        default:
            message.channel.send({
                embed: {
                    color: bot.settings.color.red,
                    description: `Error! No account command called **${setting}**`
                }
            });
    };
}};