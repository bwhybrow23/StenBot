const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('delchannel').setDescription('Deletes a mentioned channel')
    .addChannelOption(option => option.setName('channel').setDescription('The channel to delete').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  category: 'admin',
  usage: '<#CHANNEL>',
  example: '#general',
  options: { permission: 'ADMIN', aliases: ['dchannel'], enabled: true, guildOnly: true, cooldown: 5 },
  run: async (bot, interaction) => {

    let channel = interaction.options.getChannel('channel');

    //Permission Check
    if (interaction.member.permissions.has('ADMINISTRATOR') === false) {
      return bot.noPermsEmbed(`${interaction.guild.name}`, bot)
        .then((embed) => interaction.reply({ embeds: embed }))
        .catch((error) => bot.log.post('error', error));
    }

    //Check if channel can be deleted
    if (channel.deletable === false) {
      return bot.createEmbed('error', '', 'Error! I am unable to delete that channel!', [], `${interaction.guild.name}`, interaction, true)
        .then((embed) => interaction.reply({ embeds: embed }))
        .catch((error) => bot.log.post('error', error));
    }

    //Delete the channel
    channel.delete().then((deleted) => {
      return bot.createEmbed('success', '', `The channel **${deleted.name}** has been removed by **${interaction.user.tag}**`, [], `${interaction.guild.name}`, interaction)
        .then((embed) => interaction.reply({ embeds: embed }))
        .catch((error) => bot.log.post('error', error));
    });
  },
};