export default {
  name: 'roleDelete',
  once: false,
  async execute(bot, role) {

    let config = await bot.mutils.getGuildById(role.guild.id);
    if (!config) return;

    if (config.logging.enabled === true) {
      if (config.logging.level === 'medium' || config.logging.level === 'high') {
        if (bot.efunctions.checkChannel(config.logging.channel, bot) === true) {
          let lchannel = bot.channels.cache.get(config.logging.channel);
          bot.eventEmbed('c70011', 'None', 'Role Deleted', `**Name:** ${role.name}\n**Id:** ${role.id}`, [], `${role.guild.name}`, bot)
            .then(embed => lchannel.send(embed))
            .catch(error => bot.log.post('error', error));
        }
      }
    }
  }
};