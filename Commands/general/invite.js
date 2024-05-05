import { SlashCommandBuilder } from '@discordjs/builders';
import Discord from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('invite').setDescription('Information on how to invite the bot to your Discord server!'),
  category: 'general',
  usage: '',
  example: '',
  options: { permission: 'EVERYONE', enabled: true, guildOnly: false },
  run: async (bot, interaction) => {

    let bicon = bot.user.avatarURL();

    let inviteEmbed = new Discord.EmbedBuilder()
      .setDescription('Invite StenBot to your Discord Server')
      .setColor(bot.settings.color.blue)
      .addFields([ { name: 'Default Help Command', value: '`/help`'}, { name: 'How to Invite', value: 'Click the link below to go to Discord\'s invite page where you can choose which server you want StenBot to be added to. Make sure to give the bot all permissions so it can function properly.'}, { name: 'Invite Link 1', value: 'https://sbinvite.benwhybrow.com'}, { name: 'Invite Link 2', value: 'http://bit.ly/2MDLj7hh'}, { name: 'Support Server', value: 'https://discord.benwhybrow.com'}, { name: 'Donation Link', value: 'https://paypal.me/benwhybrow'} ])
      .setThumbnail(bicon)
      .setFooter({ text: `${interaction.guild.name}`, iconURL: 'https://i.imgur.com/klY5xCe.png' });

    interaction.reply({ embeds: [inviteEmbed.toJSON()] });
  },
};