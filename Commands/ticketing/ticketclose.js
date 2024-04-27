import { SlashCommandBuilder } from '@discordjs/builders';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ticketclose').setDescription('Close an ongoing ticket'),
  category: 'ticketing',
  usage: '',
  example: '',
  options: { permission: 'EVERYONE', aliases: ['tclose'], enabled: true, guildOnly: true },
  run: async (bot, interaction) => {

    const config = await bot.mutils.getGuildById(interaction.guild.id);
    const eventFunctions = require('../../Main/Functions/eventUtils.js');

    if (interaction.channel.parent.name === 'Tickets') {
      if (interaction.channel.name.startsWith('ticket-')) {
        if (config.logging.enabled) {
          if (eventFunctions.checkChannel(config.logging.channel, bot)) {
            interaction.guild.channels.cache.get(config.logging.channel).send({
              embeds: [{
                color: bot.settings.color.yellow,
                description: `**Ticket Closed**\n**Channel:** ${interaction.channel.name}\n**ID:** ${interaction.channel.id}`,
              }],
            });
          }
        }
        interaction.channel.delete();
      } else {
        interaction.reply(
          'This channel does not start with "ticket-". Please delete the channel manually or change the name of the channel.'
        );
      }
    } else {
      interaction.reply(
        'This channel is not in the "Tickets" category. Please delete the channel manually or move it to the correct category.'
      );
    }
  },
};