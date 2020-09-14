module.exports = async (bot, role) => {
  const Discord = require("discord.js");
  const efunctions = require("../functions/eventUtils.js");

  let config = await bot.mutils.getGuildById(role.guild.id)
  if (config.logging_enabled == true) {
    if (efunctions.checkChannel(config.logging_channel, bot) == true) {
      let lchannel = bot.channels.cache.get(config.logging_channel);
      lchannel.send({
        embed: {
          color: bot.settings.color.yellow,
          description: `**Role Created**\n**Name:** ${role.name}\n**Id:** ${role.id}`,
          footer: { text: "Role Created" },
          timestamp: new Date(),
        },
      });
    }
  }
};
