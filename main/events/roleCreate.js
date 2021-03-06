module.exports = async (bot, role) => {
  const Discord = require("discord.js");
  const efunctions = require("../functions/eventUtils.js");

  let config = await bot.mutils.getGuildById(role.guild.id)
  if (config.logging.enabled == true) {
    if (config.logging.level == "medium" || config.logging.level == "high") {
      if (efunctions.checkChannel(config.logging.channel, bot) == true) {
        let lchannel = bot.channels.cache.get(config.logging.channel);
        bot.eventEmbed("7ae727", "None", "Role Created", `**Name:** ${role.name}\n**Id:** ${role.id}`, [], `${role.guild.name}`, bot)
          .then(embed => lchannel.send(embed))
          .catch(error => console.error(error))
      }
    }
  }
};