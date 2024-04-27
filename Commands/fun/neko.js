import { SlashCommandBuilder } from '@discordjs/builders';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('neko').setDescription('See a randomly generated picture of a Neko, also referred to as a Catgirl.'),
  category: 'fun',
  usage: '',
  example: '',
  options: { permission: 'EVERYONE', enabled: true, cooldown: 3, guildOnly: false },
  run: async (bot, interaction) => {

    const nekos = require('nekos.life');
    const neko = new nekos();

    let url;
    await neko.sfw.neko()
      .then(data => url = data.url);

    const nekoEmbed = {
      'title': 'I present your Neko:',
      'image': {
        'url': url
      },
      'color': bot.settings.color.yellow,
      'footer': {
        'text': 'Powered by nekos.life',
        'iconURL': 'https://nekos.life/static/icons/favicon-194x194.png'
      }
    };

    interaction.reply({ embeds: [nekoEmbed] });

  },
};