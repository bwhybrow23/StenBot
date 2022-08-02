const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits, ChannelType } = require('discord-api-types/v10');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('vccreate').setDescription('Create a voice channel')
    .addStringOption(option => option.setName('name').setDescription('The name of the channel you want to create').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  category: 'admin',
  usage: '<NAME>',
  example: 'General VC',
  options: { permission: 'ADMIN', aliases: ['vc'], enabled: true, guildOnly: true, cooldown: 5 },
  run: async (bot, interaction) => {

    if (interaction.member.permissions.has('ADMINISTRATOR') === false) {
      return bot.noPermsEmbed(`${interaction.guild.name}`, bot)
        .then((embed) => interaction.reply({ embeds: embed }))
        .catch((error) => bot.log.post('error', error));
    }

    //Input Validation
    var channelName = interaction.options.getString('name');

    if (channelName.length > 100) {
      return bot.createEmbed('error', '', 'The voice channel name has to be between 1 and 100 in **length**', [], `${interaction.guild.name}`, interaction, true)
        .then((embed) => interaction.reply({ embeds: embed }))
        .catch((error) => bot.log.post('error', error));
    }

    //Create the channel and do the stuff
    interaction.guild.channels.create({
      name: channelName,
      type: ChannelType.GuildVoice,
      reason: `Created by ${interaction.user.tag}`
    }).then((channel) => {
      return bot.createEmbed('success', '', `The voice channel **${channel.name}** has been created.`, [], `${interaction.guild.name}`, interaction)
        .then((embed) => interaction.reply({ embeds: embed }))
        .catch((error) => bot.log.post('error', error));
    });
  },
};