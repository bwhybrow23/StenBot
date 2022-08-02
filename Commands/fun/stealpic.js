const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stealpic').setDescription('Steal a user\'s avatar.')
    .addUserOption(option => option.setName('user').setDescription('The user to steal the avatar from.').setRequired(true)),
  category: 'fun',
  usage: '<@USER>',
  example: '@Jake#4012',
  options: { permission: 'EVERYONE', enabled: true, guildOnly: true },
  run: async (bot, interaction) => {

    const Discord = require('discord.js');

    let stolen = interaction.options.getUser('user');
    let stolenPic = stolen.avatarURL();

    let embed = new Discord.EmbedBuilder()
      .setColor(bot.settings.color.yellow)
      .setDescription(`**${interaction.user.username}** has stolen **${stolen.username}**'s profile picture!\n\nFind it here: [${stolen.username}'s Profile Picture](${stolenPic})`)
      .setImage(stolenPic)
      .setFooter({ text: interaction.guild.name, iconURL: 'https://i.imgur.com/klY5xCe.png' });

    interaction.reply({ embeds: [embed.toJSON()] });
  },
};