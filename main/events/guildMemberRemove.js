module.exports = async (bot, member) => {
  const Discord = require("discord.js");
  const efunctions = require("../functions/eventUtils.js");

  if (newMember.user === bot.user) return;

  let config = await bot.mutils.getGuildById(member.guild.id);

  if (config.logging_enabled == true) {
    if (config.logging_level == "low" || config.logging_level == "medium" || config.logging_level == "high") {
      if (efunctions.checkChannel(config.logging_channel, bot)) {
        let lchannel = bot.channels.cache.get(config.logging_channel);
        bot.eventEmbed("c9c600", member.user, "Member Left", `**Name:** ${member.user.tag}\n**Id:** ${member.id}\n**Created At:** ${member.user.createdAt}`, [], `${lchannel.guild.name}`, bot)
          .then(embed => lchannel.send(embed))
          .catch(error => console.error(error))
      }
    }
  }
};