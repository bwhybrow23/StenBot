import { SlashCommandBuilder } from '@discordjs/builders';
import { PermissionFlagsBits } from 'discord-api-types/v10';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warnings').setDescription('View all warnings on a user.')
    .addUserOption(option => option.setName('user').setDescription('The user to view warnings on.').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  category: 'mod',
  usage: '<@USER>',
  example: '@Becca#4109',
  options: { permission: 'STAFF', enabled: true, cooldown: 0, guildOnly: true },
  run: async (bot, interaction) => {

    //Perm Check
    if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
      return bot.noPermsEmbed(`${interaction.guild.name}`, bot);
    }

    //Args Check
    var targetuser = interaction.options.getMember('user');

    let warnings;
    await bot.punishments.fetch(interaction.guild.id, targetuser.id)
      .then((punishments) => {
        warnings = punishments.warns;
      });

    let date = new Date();
    let embed = {
      'color': 4325423,
      'timestamp': date.toISOString(),
      'footer': {
        'text': `${Object.keys(warnings).length} total warn(s)`
      },
      'author': {
        'name': `${targetuser.user.username}'s Warnings`,
        'icon_url': targetuser.user.displayAvatarURL()
      },
      'fields': []
    };

    warnings.forEach((warning) => {
      let punisher = interaction.guild.members.cache.get(warning.punisher);

      let dateObject = new Date(warning.date);
      let date = `${dateObject.toLocaleString('en-US', {day: 'numeric'})}/${dateObject.toLocaleString('en-US', {month: 'numeric'})}/${dateObject.toLocaleString('en-US', {year: 'numeric'})}`;

      embed.fields.push({
        name: `ID: ${warning.id} | ${punisher.user.tag} (${punisher.id})`,
        value: `${warning.reason} • ${date}`
      });
    });

    return interaction.reply({
      embeds: [embed]
    });
  },
};