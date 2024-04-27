import { SlashCommandBuilder } from '@discordjs/builders';
import Discord from 'discord.js';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('meme').setDescription('Generate a random Reddit meme.'),
  category: 'fun',
  usage: '',
  example: '',
  options: { permission: 'EVERYONE', enabled: true, cooldown: 2, guildOnly: false },
  run: async (bot, interaction) => {

    let fetch = require('node-fetch');

    let meme;
    await fetch('https://meme-api.herokuapp.com/gimme')
      .then(res => res.json())
      .then(json => meme = json)
      .catch((error) => {
        bot.log.post('error', error);
        return interaction.reply({ content: 'An error occured while generating a meme. This could be because the API is down. Please try again later and if the issue persists, contact the bot owner.', ephemeral: 'true' });
      });

    //Generate random RGB color
    let num = Math.round(0xffffff * Math.random());
    let r = num >> 16;
    let g = num >> 8 & 255;
    let b = num & 255;

    let embed = new Discord.EmbedBuilder()
      .setTitle(`r/${meme.subreddit} - ${meme.title}`)
      .setURL(meme.postLink)
      .setColor([r, g, b])
      .setImage(meme.url)
      .setFooter({ text: `👍 ${meme.ups.toString()}` });

    interaction.reply({ embeds: [embed] });

  },
};