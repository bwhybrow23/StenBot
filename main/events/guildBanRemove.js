module.exports = async (bot, guild, user) => {
  const Discord = require("discord.js");
  const efunctions = require("../functions/eventUtils.js");

  let config = await bot.mutils.getGuildById(guild.id)

  if (config.logging_enabled == true) {
    if (config.logging_level == "medium" || config.logging_level == "high") {
      if (efunctions.checkChannel(config.logging_channel, bot) == true) {
        let lchannel = bot.channels.cache.get(config.logging_channel);
        bot.createEmbed("warning", "", `**Member Unbanned**\n**User:** ${user.tag}\n**Unban Date:** ${new Date()}`, [], `${lchannel.guild.name}`, bot)
              .then(embed => lchannel.send(embed))
              .catch(error => console.error(error))
      }
    }
  }
};
