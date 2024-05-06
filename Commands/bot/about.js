import { SlashCommandBuilder } from '@discordjs/builders';
import { EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('about').setDescription('Get some information about StenBot'),
  category: 'bot',
  usage: '',
  example: '',
  options: { permission: 'EVERYONE', enabled: true, guildOnly: false },
  run: async (bot, interaction) => {

    const embed = new EmbedBuilder()
      .setTitle('Bot Information')
      .setColor(bot.settings.color.blue)
      .setThumbnail(bot.user.avatarURL())
      .addFields([ { name: 'Bot Name', value: `${bot.user.tag}` }, { name: 'Founded By', value: 'Ben Whybrow (Stentorian#6969)' }, { name: 'Created On', value: `${bot.user.createdAt}` }, { name: 'Credit', value: '- <@285447788827770881> - Original Code & Occasional Help \n- <@236379670961061889> - Dealing with my code errors in his DMs' }, { name: 'Why was StenBot Created?', value: 'StenBot was originally created with the idea in mind of reducing the amount of Discord bots every server needs. It was also to take the stress off making so many Discord bots for friends and just giving them this bot instead. It contains a plethra of features and more to come in the future with consistent updates.' } ])
      .setFooter({ text: `${interaction.guild.name}`, iconURL: bot.user.avatarURL() });

    return interaction.reply({ embeds: [embed] });

  }
};