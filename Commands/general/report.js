import { SlashCommandBuilder } from '@discordjs/builders';
import { ActionRowBuilder, ButtonBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('report').setDescription('Report a user, bug, or server to the StenBot Team to be investigated.'),
  category: 'general',
  usage: '',
  example: '',
  options: { permission: 'EVERYONE', enabled: true, cooldown: 300, guildOnly: false },
  run: async (bot, interaction) => {

    // Buttons
    const tRow = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('user')
          .setLabel('User')
          .setStyle('Primary'),
        new ButtonBuilder()
          .setCustomId('server')
          .setLabel('Server')
          .setStyle('Primary'),
        new ButtonBuilder()
          .setCustomId('bug')
          .setLabel('Bug')
          .setStyle('Primary'),
      );


    //Interactive Version
    bot.createEmbed('warning', 'New StenBot Report', 'Please specify the type of report:\n`User, Server or Bug`', [], `${interaction.user.tag}`, interaction)
      .then(embed => interaction.reply({ embeds: embed, components: [tRow], ephemeral: false }))
      .catch(error => bot.log.post('error', error));

    //Edit message if no interaction after 10s
    await sleep(10000);

    tRow.components[0].setDisabled(true);
    tRow.components[1].setDisabled(true);
    tRow.components[2].setDisabled(true);
    interaction.editReply({ components: [tRow] });

    //Sleep function
    function sleep(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    }

  }
};