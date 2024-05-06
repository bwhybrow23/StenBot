import { SlashCommandBuilder } from '@discordjs/builders';
import Discord from 'discord.js';
import fetch from 'node-fetch';

export default {
  data: new SlashCommandBuilder()
    .setName('8ball').setDescription('Ask a question to the magic 8 ball!')
    .addStringOption(option => option.setName('question').setDescription('The question to ask the magic 8 ball.').setRequired(true)),
  category: 'fun',
  usage: '<QUESTION>',
  example: 'Will I ever stop losing the game?',
  options: { permission: 'EVERYONE', enabled: true, cooldown: 5, guildOnly: false },
  run: async (bot, interaction) => {

    let question = interaction.options.getString('question');

    //Nekos.life API integration
    let result;
    await fetch('https://nekos.life/api/v2/8ball')
      .then(res => res.json())
      .then(json => result = json);

    let ballEmbed = new Discord.EmbedBuilder()
      .setColor(bot.settings.color.yellow)
      .addFields([ { name: 'Question', value: question }, { name: 'Answer', value: result.response } ])
      .setImage(result.url)
      .setFooter({ text: `${interaction.guild.name}`, iconURL: 'https://i.imgur.com/klY5xCe.png' });

    interaction.reply({ content: 'The 8ball is working it\'s magic! :tada:' }).then(() => {
      setTimeout(() => {
        interaction.editReply({ content: 'Your result!', embeds: [ballEmbed.toJSON()] });
      }, 1000);
    }).catch((e) => {
      bot.log.post('error', e);
    });

  },
};