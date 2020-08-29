module.exports = async (bot, guild, user) => {
  const Discord = require("discord.js");
  const efunctions = require("../functions/eventUtils.js");

  let config = efunctions.getConfig(guild.id);
  if (config.loggingenabled == true) {
    if (config.logginglevel == "medium" || config.logginglevel == "high") {
      if (efunctions.checkChannel(config.loggingchannel, bot) == true) {
        let lchannel = bot.channels.cache.get(config.loggingchannel);
        bot.createEmbed("warning", "", `**Member Banned**\n**User tag:** ${user.tag}\n**User ID:** ${user.id}\n**Ban Date:** ${new Date()}`, [], `${lchannel.guild.name}`, bot)
              .then(embed => lchannel.send(embed))
              .catch(error => console.error(error))
      }
    }
  }
};
