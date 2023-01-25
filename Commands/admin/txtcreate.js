const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits, ChannelType } = require('discord-api-types/v10');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('txtcreate').setDescription('Create a text channel')
    .addStringOption(option => option.setName('name').setDescription('The name of the channel you want to create').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
  category: 'admin',
  usage: '<NAME> [CATEGORY]',
  example: 'general-chat Community',
  options: { permission: 'ADMIN', aliases: ['txt'], enabled: true, guildOnly: true, cooldown: 5 },
  run: async (bot, interaction) => {

    if (interaction.member.permissions.has('MANAGE_CHANNELS') === false) {
      return bot.noPermsEmbed(`${interaction.guild.name}`, bot)
        .then((embed) => interaction.reply({ embeds: embed }))
        .catch((error) => bot.log.post('error', error));
    }

    //Get inputs and validate them
    let channelName = interaction.options.getString('name');

    if (channelName.length > 100) {
      return bot.createEmbed('error', '', 'The channel name has to be between 1 and 100 in **length**', [], `${interaction.guild.name}`, interaction, true)
        .then((embed) => interaction.reply({ embeds: embed }))
        .catch((error) => bot.log.post('error', error));
    }

    //Create the channel and do the stuff
    await interaction.guild.channels.create({
      name: channelName,
      type: ChannelType.GuildText,
      reason: `Created by ${interaction.user.tag}`
    }).then((channel) => {
      return bot.createEmbed('success', '', `The channel **${channel.name}** has been created.`, [], `${interaction.guild.name}`, interaction)
        .then((embed) => interaction.reply({ embeds: embed }))
        .catch((error) => bot.log.post('error', error));
    });
  },
};