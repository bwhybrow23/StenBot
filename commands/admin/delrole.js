const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('delrole').setDescription('Deletes a mentioned role')
    .addRoleOption(option => option.setName('role').setDescription('The role to delete').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  category: 'admin',
  usage: '<@ROLE>',
  example: '@Members',
  options: { permission: 'ADMIN', aliases: ['drole'], enabled: true, guildOnly: true, cooldown: 5 },
  run: async (bot, interaction) => {

    let role = interaction.options.getRole('role');

    //Permission Check
    if (interaction.member.permissions.has('ADMINISTRATOR') === false) {
      return bot.noPermsEmbed(`${interaction.guild.name}`, bot)
        .then((embed) => interaction.reply({ embeds: embed }))
        .catch((error) => bot.log.post('error', error));
    }

    let botMember = await interaction.guild.members.fetch(bot.user.id);

    //Permission Check
    if (role.position > botMember.roles.highest.position) {
      return bot.createEmbed('error', '', 'Error! I am unable to delete this role as it is above my highest role.', [], `${interaction.guild.name}`, interaction, true)
        .then((embed) => interaction.reply({ embeds: embed }))
        .catch((error) => bot.log.post('error', error));
    } else {
      //Delete the role
      let name = role.name;
      role.delete();
      return bot.createEmbed('success', '', `Deleted role **${name}** requested by **${interaction.user.tag}**`, [], `${interaction.guild.name}`, interaction)
        .then((embed) => interaction.reply({ embeds: embed }))
        .catch((error) => bot.log.post('error', error));
    }
  },
};