import { SlashCommandBuilder } from '@discordjs/builders';
import ecoUtils from '../../Main/Functions/ecoUtils.js';

export default {
  data: new SlashCommandBuilder()
    .setName('balance').setDescription('Check yours or another user\'s balance.')
    .addUserOption(option => option.setName('user').setDescription('The user to check the balance of.')),
  category: 'eco',
  usage: '[@USER]',
  example: '@Steve#1234',
  options: { permission: 'EVERYONE', aliases: ['bal', 'money'], enabled: true, cooldown: 5, guildOnly: false },
  run: async (bot, interaction) => {

    let person = interaction.options.getUser('user') || interaction.user;

    await ecoUtils.getUser(person.id).then(async (user) => {
      return bot.createEmbed('info', '', `${person} has **${user.balance}** credits.`, [], '', interaction)
        .then((embed) => interaction.reply({ embeds: embed }))
        .catch((error) => bot.log.post('error', error));
    });

  }
};