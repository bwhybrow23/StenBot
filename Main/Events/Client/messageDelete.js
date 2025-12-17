import util from 'util';
import { readdir } from 'fs';

export default {
  name: 'messageDelete',
  once: false,
  async execute(bot, message) {

    const readdirPromisify = util.promisify(readdir);

    if (!message) return;

    if ((message.channel.type === 'DM')) return;

    let config = await bot.mutils.getGuildById(message.guild.id);
    if (!config) return;

    if (config.logging.enabled === true) {
      if (config.logging.ignore.includes(message.channel.id)) return;
      if (config.logging.level === 'low' || config.logging.level === 'medium' || config.logging.level === 'high') {
        if (bot.efunctions.checkChannel(config.logging.channel, bot) === true) {
          let files = await readdirPromisify('./Commands/');
          let possiblefilename = message.content.split(' ')[0].slice(bot.settings.prefix.length) + '.js';
          if (files.includes(possiblefilename)) return;

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