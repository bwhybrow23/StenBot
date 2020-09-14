module.exports = async (bot, member) => {
  const Discord = require("discord.js");
  const efunctions = require("../functions/eventUtils.js");

  let config = await bot.mutils.getGuildById(member.guild.id);

  if (config.logging_enabled == true) {
    if (efunctions.checkChannel(config.logging_channel, bot)) {
      let lchannel = bot.channels.cache.get(config.logging_channel);
      lchannel.send({
        embed: {
          color: bot.settings.color.yellow,
          description: `**Member Left**\n**Name:** ${member.user.tag}\n**Id:** ${member.id}\n**Created At:** ${member.user.createdAt}`,
          footer: { icon_url: member.user.avatarURL, text: "Member Left" },
          timestamp: new Date(),
        },
      });
    }
  }
};
