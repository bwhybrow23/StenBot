import { SlashCommandBuilder } from '@discordjs/builders';
import fetch from 'node-fetch';

export default {
  data: new SlashCommandBuilder()
    .setName('lewd').setDescription('A randomly generated photo of *you know what*.'),
  category: 'fun',
  usage: '',
  example: '',
  options: { permission: 'EVERYONE', enabled: true, cooldown: 3, guildOnly: true },
  run: async (bot, interaction) => {

    if (interaction.channel.nsfw === false) {
      return interaction.reply('Run this command in an **NSFW** channel.');
    }

    let url;
    await fetch('https://akaneko.cuteasfubuki.xyz/api/lewdneko')
      .then(res => res.json())
      .then(json => url = json.url)
      .then(url => { if(!url) return interaction.reply('An error occurred. Please try again.') });

    const lewdEmbed = {
      'title': 'Here you go, you filthy animal:',
      'image': {
        'url': url
      },
      'color': bot.settings.color.yellow,
      'footer': {
        'text': 'Powered by nekos.life'
      }
    };

    interaction.reply({ embeds: [lewdEmbed] });

  },
};