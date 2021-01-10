module.exports = async (bot, channel) => {
  const Discord = require("discord.js");
  const efunctions = require("../functions/eventUtils.js");

  if ((channel.type === "dm")) return;

  if (channel.name.startsWith("ticket-")) return;

  //Get Config
  let config = await bot.mutils.getGuildById(channel.guild.id);

  //Check config and send message
  if (config.logging_enabled == true) {
    if (config.logging_level == "low" || config.logging_level == "medium" || config.logging_level == "high") {
      if (efunctions.checkChannel(config.logging_channel, bot) == true) {
        let lchannel = bot.channels.cache.get(config.logging_channel);
        bot.eventEmbed("7ae727", "None", "Channel Created", `**Name:** ${channel.name}\n**Id:** ${channel.id}`, [], `${channel.guild.name}`, bot)
          .then(embed => lchannel.send(embed))
          .catch(error => console.error(error))
      }
    }
  }
};