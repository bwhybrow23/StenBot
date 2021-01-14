module.exports = {
  name: "server",
  category: "bot",
  description: "Get some information about the server the command is ran in.",
  usage: "",
  example: "",
  options: { permission: "EVERYONE", aliases: ["server-info", "serverinfo"], enabled: true, guildOnly: true },
  run: async (bot, message, args) => {

    const Discord = require("discord.js");

    let txtChannelCount = 0;
    let vcChannelChannel = 0;
    message.guild.channels.cache.forEach(channel => {
      if (channel.type === "text") return txtChannelCount++;
      if (channel.type === "voice") return vcChannelChannel++;
    });

    let embed = new Discord.MessageEmbed()
      .setColor(bot.settings.color.blue)
      .setThumbnail(message.guild.iconURL())
      .addField(`Name:`, `${message.guild.name}`, true)
      .addField(`Owner:`, `${bot.users.cache.get(message.guild.ownerID).tag}`, true)
      .addField(`Region:`, `${message.guild.region.charAt(0).toUpperCase() + message.guild.region.slice(1)}`, true)
      .addField(`Text Channels:`, `${txtChannelCount}`, true)
      .addField(`Voice Channels:`, `${vcChannelChannel}`, true)
      .addField(`Roles:`, `${message.guild.roles.cache.size}`, true)
      .addField(`Member Count:`, `${message.guild.memberCount}`, true)
      .addField(`Bot Count:`, `${message.guild.members.cache.filter(member => member.user.bot).size}`, true)
      .setFooter(`Created`)
      .setTimestamp(message.guild.createdAt);

    message.channel.send(embed);

  }
};