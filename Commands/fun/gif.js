import { SlashCommandBuilder } from '@discordjs/builders';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('gif').setDescription('Search for a specific GIF')
    .addStringOption(option => option.setName('query').setDescription('The query to search for.').setRequired(true)),
  category: 'fun',
  usage: '<QUERY>',
  example: 'monkeys',
  options: { permission: 'EVERYONE', enabled: true, cooldown: 3, guildOnly: false },
  run: async (bot, interaction) => {

    let Discord = require('discord.js');
    let fetch = require('node-fetch');

    let query = interaction.options.getString('query');

    let response;
    await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${bot.settings.connections.giphyAPI}&q=${query}&limit=10&offset=0&rating=pg-13&lang=en`)
      .then(res => res.json())
      .then(json => response = json)
      .catch(error => {
        bot.log.post('error', error);
        interaction.reply({ content: 'An error occured, please contact support if this continues to happen.', ephemeral: true });
      });

    let toBeUsed = response.data[Math.floor(Math.random() * response.data.length)];
    if (!toBeUsed) return interaction.reply('There was no result for this query.');

    let embed = new Discord.EmbedBuilder()
      .setTitle(`Giphy Image: ${toBeUsed.slug}`)
      .setImage(toBeUsed.images.original.url)
      .setURL(toBeUsed.url)
      .setColor(bot.settings.color.yellow)
      .setFooter({ text: 'Powered by GIPHY', iconURL: 'https://i.imgur.com/gJMxGvU.gif' });

    interaction.reply({ embeds: [embed.toJSON()] });

  }
};