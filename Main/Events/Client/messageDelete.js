export default {
  name: 'messageDelete',
  once: false,
  async execute(bot, message) {

    if (!message || message === null) return;

    if ((message.channel.type === 'DM')) return;
    if (!message.guild) return;
    if (message.author?.bot) return;

    let config = await bot.mutils.getGuildById(message.guild.id);
    if (!config) return;

    if (config.logging.enabled === true) {
      if (config.logging.ignore.includes(message.channel.id)) return;
      if (config.logging.level === 'low' || config.logging.level === 'medium' || config.logging.level === 'high') {
        if (bot.efunctions.checkChannel(config.logging.channel, bot) === true) {
          let lchannel = bot.channels.cache.get(config.logging.channel);
          bot.eventEmbed('c70011', message.author, 'Message Deleted', `**Channel:** ${message.channel}\n**Message:**\n${message}`, [], `${lchannel.guild.name}`, bot)
            .then(embed => lchannel.send(embed))
            // .catch(error => bot.log.post('error', error));
            .catch(error => console.log(error));
        }
      }
    }
  }
};