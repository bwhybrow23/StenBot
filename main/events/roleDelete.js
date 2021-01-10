module.exports = async (bot, role) => {
  const Discord = require("discord.js");
  const efunctions = require("../functions/eventUtils.js");

  let config = await bot.mutils.getGuildById(role.guild.id)
  if (config.logging_enabled == true) {
    if (config.logging_level == "medium" || config.logging_level == "high") {
      if (efunctions.checkChannel(config.logging_channel, bot) == true) {
        let lchannel = bot.channels.cache.get(config.logging_channel);
        bot.eventEmbed("c70011", "None", "Role Deleted", `**Name:** ${role.name}\n**Id:** ${role.id}`, [], `${role.guild.name}`, bot)
          .then(embed => lchannel.send(embed))
          .catch(error => console.error(error))
      }
    }
  }
};