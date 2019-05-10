exports.run = async (bot, message, args) => {

    const Discord = require("discord.js");

    let bicon = bot.user.avatarURL;

    let inviteEmbed = new Discord.RichEmbed()
        .setDescription("Invite StenBot to your Discord Server")
        .addField("Default Help Command", "`.help`")
        .addField("How to Invite", "At this current moment in time, StenBot is only limited to this server because Per Server Settings haven't been added yet. If you want to help then feel free to message Stentorian.")
        .addField("Support Server", "https://discord.gg/JUFkfbG")
        .setThumbnail(bicon)
        .setFooter(`${message.author.tag}`, `${message.author.avatarURL}`);

    message.channel.send(inviteEmbed);
};