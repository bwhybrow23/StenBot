module.exports = {
    name: "server",
    category: "bot",
    description: "Gain information about the server the command is ran in..",
    example: ".serverinfo",
    permission: "BOT OWNER",
    run: async (bot, message, args) => {

    const Discord = require("discord.js");
   
    let channelcount = message.guild.channels.size;
    let gcreated = message.guild.createdAt;
    let gid = message.guild.id;
    let totalmembers = message.guild.memberCount;
    let gname = message.guild.name;
    let rolecount = message.guild.roles.size;
   
    message.channel.send({
     embed: {
      color: bot.settings.color.green,
      description: '**' + gname + ' Information**\n\nGuild Id **' + gid + '**\nGuild Channels: **' + channelcount + '**\nCreated: **' + gcreated + '**\nTotal Members: **' + totalmembers + '**\nTotal Roles: **' + rolecount + '**'
     }
    });
   
   
   }};