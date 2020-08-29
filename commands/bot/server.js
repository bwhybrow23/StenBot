module.exports = {
  name: "server",
  category: "bot",
  description: "Gain information about the server the command is ran in..",
  usage: "sb!serverinfo",
  permission: "BOT OWNER",
  run: async (bot, message, args) => {
    
    const Discord = require("discord.js");
    if (!message.guild) return;

    let channelCount = message.guild.channels.cache.size;
    let gCreated = message.guild.createdAt;
    let gID = message.guild.id;
    let totalMembers = message.guild.memberCount;
    let gName = message.guild.name;
    let roleCount = message.guild.roles.cache.size;

    bot.createEmbed("success", `${gName} Information`, ``, [{ name: `Guild ID`, value: `${gID}`}, { name: `Date Created`, value: `${gCreated}`}, { name: `Number of Channels`, value: `${channelCount}`}, { name: `Number of Roles`, value: `${roleCount}`}, { name: `Total Members`, value: `${totalMembers}`}], `${message.guild.name}`, bot)
      .then((embed) => message.channel.send(embed))
      .catch((error) => bot.logger("error", error));

  }
};
