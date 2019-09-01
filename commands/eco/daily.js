exports.run = async (bot, message, args) => {

    const Discord = require("discord.js");
    const fs = require("fs");
    const eco = require("stenbot-economy");

    var output = await eco.Daily(message.author.id);

    if (output.updated) {
        const embed = new Discord.RichEmbed()
        .setColor(bot.settings.color.green)
        .setDescription(`Daily reward claimed for today! You can claim again tomorrow!`)
        .setFooter(message.author.tag, message.author.avatarURL)
        .setTimestamp();

        var profile = await eco.AddToBalance(message.author.id, 50)
        message.channel.send(embed);
    } else {
        const embed1 = new Discord.RichEmbed()
        .setColor(bot.settings.color.green)
        .setDescription(`Your daily reward has already been claimed for today! You can claim again in ${output.timetowait}`)
        .setFooter(message.author.tag, message.author.avatarURL)
        .setTimestamp();
        message.channel.send(embed1);
    }

}