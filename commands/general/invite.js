module.exports = {
  name: "invite",
  category: "general",
  description: "Information on how to invite the bot to your Discord.",
  usage: "sb!invite",
  permission: "EVERYONE",
  run: async (bot, message, args) => {
    
    const Discord = require("discord.js");
    if (!message.guild) return;

    let bicon = bot.user.avatarURL;

    let inviteEmbed = new Discord.MessageEmbed()
      .setDescription("Invite StenBot to your Discord Server")
      .setColor(bot.settings.color.blue)
      .addField("Default Help Command", "`sb!help`")
      .addField("How to Invite","Click the link below to go to Discord's invite page where you can choose which server you want StenBot to be added to. Make sure to give the bot all permissions so it can function properly.")
      .addField("Invite Link 1", "https://sbinvite.benwhybrow.com")
      .addField("Invite Link 2", "http://bit.ly/2MDLj7hh")
      .addField("Support Server", "https://discord.benwhybrow.com")
      .setThumbnail(bicon)
      .setFooter(`${message.guild.name}`, `https://i.imgur.com/BkZY6H8.png`);

    message.channel.send(inviteEmbed);
  },
};
