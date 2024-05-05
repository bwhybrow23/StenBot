import { SlashCommandBuilder } from '@discordjs/builders';
import Discord from 'discord.js';
import fetch from 'node-fetch';

export default {
  data: new SlashCommandBuilder()
    .setName('fact').setDescription('Get a random fact!'),
  category: 'fun',
  usage: '',
  example: '',
  options: { permission: 'EVERYONE', enabled: true, cooldown: 10, guildOnly: false },
  run: async (bot, interaction) => {

    let fact;
    await fetch('https://nekos.life/api/v2/fact')
      .then(res => res.json())
      .then(json => fact = json.fact);

    let embed = new Discord.EmbedBuilder()
      .setTitle('Random Fact')
      .setDescription(fact)
      .setColor(bot.settings.color.yellow)
      .setFooter({ text: interaction.guild.name, iconURL: 'https://i.imgur.com/klY5xCe.png"' });

    interaction.reply({ embeds: [embed.toJSON()] });

  }
};