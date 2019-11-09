module.exports = {
    name: "invite",
    category: "general",
    description: "Information on how to invite the bot to your Discord.",
    example: ".invite",
    permission: "EVERYONE",
    run: async (bot, message, args) => {
        
    const Discord = require("discord.js");

    let bicon = bot.user.avatarURL;

    let inviteEmbed = new Discord.RichEmbed()
        .setDescription("Invite StenBot to your Discord Server")
        .addField("Default Help Command", "`.help`")
        .addField("How to Invite", "Click the link below to go to Discord's invite page where you can choose which server you want StenBot to be added to. Make sure to give the bot all permissions so it can function properly.")
        .addField("Invite Link 1", "https://sbinvite.benwhybrow.xyz", true)
        .addField("Invite Link 2", "http://bit.ly/2MDLj7hh", true)
        .addField("Support Server", "https://discord.gg/JUFkfbG")
        .setThumbnail(bicon)
        .setFooter(`${message.author.tag}`, `${message.author.avatarURL}`);

    message.channel.send(inviteEmbed);
}};
