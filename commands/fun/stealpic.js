exports.run = (bot, message, args) => {

    const Discord = require("discord.js");

    let stolen = message.mentions.users.first();
    let stolenPic = stolen.avatarURL;

    let embed = new Discord.RichEmbed()
        .setColor(bot.settings.color.yellow)
        .setTitle("StealPic Command")
        .setDescription(`**${message.author.username}** has stolen **${stolen.username}**'s profile picture!`)
        .addField("Here's their avatar anyways", stolenPic)
        .setImage(stolenPic)
        .setFooter(message.author.tag, message.author.avatarURL);

    message.channel.send(embed);

}