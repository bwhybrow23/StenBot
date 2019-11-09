module.exports = {
    name: "me",
    category: "fun",
    description: "Steal a user's avatar.",
    example: ".stealpic @Dave",
    permission: "EVERYONE",
    run: async (bot, message, args) => {

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

}};
