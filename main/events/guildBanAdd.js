module.exports = async (bot, guild, user) => {
  const Discord = require("discord.js");
  const efunctions = require("../functions/eventUtils.js");

  let config = await bot.mutils.getGuildById(guild.id)

  if (config.logging.enabled == true) {
    if (config.logging.level == "low" || config.logging.level == "medium" || config.logging.level == "high") {
      if (efunctions.checkChannel(config.logging.channel, bot) == true) {
        let lchannel = bot.channels.cache.get(config.logging.channel);
        bot.eventEmbed("c70011", user, "Member Banned", `**User tag:** ${user.tag}\n**User ID:** ${user.id}\n**Ban Date:** ${new Date()}`, [], `${lchannel.guild.name}`, bot)
          .then(embed => lchannel.send(embed))
          .catch(error => console.error(error))
      }
    }
  }
};