/* eslint-disable no-inner-declarations */
import checker from 'is-url';

export default {
  name: 'messageCreate',
  once: false,
  async execute(bot, message) {

    if (!message) return;

    //Link Blocker & Filter
    if (message.author.bot) return;
    if (message.content.indexOf(bot.settings.prefix) !== 0) {
      if (message.guild) {
        const config = await bot.mutils.getGuildById(message.guild.id);
        if (!config) return;
        //Check if its an url
        if (config.moderation.link_block) {
          if (checker(message.content)) {
            if (message.member.permissions.has('ADMINISTRATOR') === true) return;
            message.delete();
            return;
          }
        }
        //Check if it contains words from filter
        if (config.moderation.filter.some((word) => message.content.toLowerCase().includes(word))) {
          if (message.member.permissions.has('ADMINISTRATOR') === true) return;
          message.delete();
          return;
        }
        return;
      }
    }

    //Message about new slash commands
    if (message.content.startsWith(bot.settings.prefix)) {
      message.reply('StenBot has now moved over to using slash commands. Please ensure that the bot has the correct permissions. If you\'re unsure, invite the bot again through https://sbinvite.benwhybrow.com. \n\nFrom there, you can do `/` and it will show what commands are available. \n\nIf you have any questions, please join the Discord server and we\'ll be glad to help! https://discord.gg/PGfSYct');
    }

  }
};