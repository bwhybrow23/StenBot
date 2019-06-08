exports.run = (bot, message, args) => {

    const Discord = require("discord.js");
    const fs = require("fs");

    const config = JSON.parse(fs.readFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, "utf8"));

    if (config.staffadminenabled == false) {
        return message.channel.send({
            embed: {
                color: bot.settings.red,
                description: `Error! Admin commands are disabled. To use them, enable them with **.config-staff admin enable**`
            }
        });
    };

    var n = args.slice(0).join(" ");


    if (n.length < 1) {
        return message.channel.send({
            embed: {
                color: bot.settings.red,
                description: `Error! You forgot to include a name for the channel!`
            }
        });
    };



    if (message.member.hasPermission("ADMINISTRATOR") == false) {
        return message.channel.send({
            embed: {
                color: bot.settings.red,
                description: `Error! You do not have permission to issue this command!`
            }
        });
    };

    if (n.length > 100) {
        return message.channel.send({
            embed: {
                color: bot.settings.red,
                description: `The voice channel name has to be between 1 and 100 in **length**`
            }
        })
    };

    message.guild.createChannel(`${n}`, "voice").then(channel => {
        message.channel.send({
            embed: {
                color: bot.settings.green,
                description: `The voice channel **${channel.name}** has been created.`
            }
        });
    });
};