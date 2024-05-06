import { SlashCommandBuilder } from '@discordjs/builders';
import { PermissionFlagsBits } from 'discord-api-types/v10';

export default {
  data: new SlashCommandBuilder()
    .setName('clearwarn').setDescription('Clear all warnings from a user.')
    .addUserOption(option => option.setName('user').setDescription('The user to clear the warnings of.').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  category: 'mod',
  usage: '<@USER>',
  example: '@Josh#4012',
  options: { permission: 'STAFF', enabled: true, cooldown: 0, guildOnly: true },
  run: async (bot, interaction) => {

    const config = await bot.mutils.getGuildById(interaction.guild.id);

    //Perm Check
    if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
      return bot.noPermsEmbed(`${interaction.guild.name}`, bot);
    }

    //Args Check
    let targetuser = interaction.options.getMember('user');

    //Fetch warnings
    let warnings = config.moderation.warnings.filter(function(warning) {
      return warning.user = targetuser.id;
    });

    //If no warnings
    if (Object.keys(warnings).length < 0) {
      return bot.createEmbed('error', '', 'Error! This user has no warnings.', [], `${interaction.guild.name}`, interaction)
        .then((embed) => interaction.reply({ embeds: embed }))
        .catch((error) => bot.log.post('error', error));
    }

    //Make empty array and override config
    warnings = [];
    config.moderation.warnings = warnings;
    //Save it
    await bot.mutils.updateGuildById(interaction.guild.id, config);

    //Post success embed to user
    bot.createEmbed('success', '', `Successfully removed all warnings from **${targetuser.user.tag}**.`, [], `${interaction.guild.name}`, interaction)
      .then((embed) => interaction.reply({ embeds: embed }))
      .catch((error) => bot.log.post('error', error));

    //Logging
    if (config.logging.enabled === true) {
      if (bot.efunctions.checkChannel(config.logging.channel, bot) === true) {
        let lchannel = bot.channels.cache.get(config.logging.channel);
        bot.eventEmbed('c70011', targetuser.user, 'Warnings Cleared', `**User tag:** ${targetuser.user.tag}\n**User ID:** ${targetuser.user.id}\n\n**Removed on:** ${new Date()}\n**Removed by:** ${interaction.user.tag}`, [], `${interaction.guild.name}`, bot)
          .then(embed => lchannel.send(embed))
          .catch(error => bot.log.post('error', error));
      }
    }


  },
};