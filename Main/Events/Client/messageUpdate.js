module.exports = {
  name: 'messageUpdate',
  once: false,
  async execute(bot, oldMessage, newMessage) {

    const checker = require('is-url');

    if (newMessage.type === 'DM') return;
    if (!newMessage) return;
    if (!newMessage.guild) return;
    let config = await bot.mutils.getGuildById(newMessage.guild.id);
    if (!config) return;

    if (config.logging.enabled === true) {
      if (config.logging.ignore.includes(oldMessage.channel.id)) return;
      if (config.logging.level === 'low' || config.logging.level === 'medium' || config.logging.level === 'high') {
        if (bot.efunctions.checkChannel(config.logging.channel, bot) === true) {
          if (oldMessage.author.bot) return;
          if (
            oldMessage.createdTimestamp === newMessage.createdTimestamp &&
            checker(oldMessage)
          )
            return;
          if (oldMessage.content === newMessage.content) return;
          let lchannel = bot.channels.cache.get(config.logging.channel);
          bot.eventEmbed('006187', newMessage.author, 'Message Edited', `**Channel:** ${newMessage.channel}\n**Before:**\n${oldMessage.content}\n**After:**\n${newMessage.content}`, [], `${lchannel.guild.name}`, bot)
            .then(embed => lchannel.send(embed))
            .catch(error => bot.log.post('error', error));
        }
      }
    }
  }
};