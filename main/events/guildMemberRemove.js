module.exports = async (bot, member) => {
  const Discord = require("discord.js");
  const efunctions = require("../functions/eventUtils.js");

  let config = efunctions.getConfig(member.guild.id);

  if (config.loggingenabled == true) {
    if (efunctions.checkChannel(config.loggingchannel, bot)) {
      let lchannel = bot.channels.cache.get(config.loggingchannel);
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
