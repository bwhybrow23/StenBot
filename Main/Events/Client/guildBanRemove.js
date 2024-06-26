export default {
  name: 'guildBanRemove',
  once: false,
  async execute(bot, guild, user) {

    let config = await bot.mutils.getGuildById(guild.id);
    if (!config) return;

    if (config.logging.enabled === true) {
      if (config.logging.level === 'low' || config.logging.level === 'medium' || config.logging.level === 'high') {
        if (bot.efunctions.checkChannel(config.logging.channel, bot) === true) {
          let lchannel = bot.channels.cache.get(config.logging.channel);
          bot.eventEmbed('c70011', user, 'Member Unbanned', `**User:** ${user.tag}\n**Unban Date:** ${new Date()}`, [], `${lchannel.guild.name}`, bot)
            .then(embed => lchannel.send(embed))
            .catch(error => bot.log.post('error', error));
        }
      }
    }
  }
};