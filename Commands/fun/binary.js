import { SlashCommandBuilder } from '@discordjs/builders';

export default {
  data: new SlashCommandBuilder()
    .setName('binary').setDescription('Convert text to binary.')
    .addStringOption(option => option.setName('text').setDescription('The text to convert to binary.').setRequired(true)),
  category: 'fun',
  usage: '<MESSAGE>',
  example: 'Hello There',
  options: { permission: 'EVERYONE', enabled: true, guildOnly: false },
  run: async (bot, interaction) => {

    var output = '';
    var input = interaction.options.getString('text');
    for (var i = 0; i < input.length; i++) {
      output += input[i].charCodeAt(0).toString(2) + ' ';
    }

    bot.createEmbed('success', '', '', [{
      name: 'Original Text',
      value: `${input}`
    }, {
      name: 'Binary',
      value: `${output}`
    }, ], `${interaction.guild.name}`, interaction)
      .then((embed) => interaction.reply({ embeds: embed }))
      .catch((error) => bot.log.post('error', error));
  },
};