exports.run = (bot, message, args) => {

    const Discord = require("discord.js");
    const fs = require("fs");
    var c = message.mentions.channels.first();

    const config = JSON.parse(fs.readFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, "utf8"));

    if (config.staffadminenabled == false) {
        return message.channel.send({
            embed: {
                color: bot.settings.red,
                description: `Error! Admin commands are disabled. To use them, enable them with **.config-staff admin enable**`
            }
        });
    };



    if (c == undefined) {
        return message.channel.send({
            embed: {
                color: bot.settings.red,
                description: `Error! You forgot to mention a channel to remove!`
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



    if (c.deletable == false) {
        return message.channel.send({
            embed: {
                color: bot.settings.red,
                description: `Error! I am unable to delete that channel!`
            }
        });
    };

    c.delete().then(deleted =>
        message.channel.send({
            embed: {
                color: bot.settings.yellow,
                description: `The channel **${deleted.name}** has been removed by administrator **${message.author}**`
            }
        })
    );
};
