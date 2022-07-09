const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warn').setDescription('Warn a user')
    .addUserOption(option => option.setName('user').setDescription('The user to warn.').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('The reason for the warning.').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  category: 'mod',
  usage: '<@USER> <REASON>',
  example: '@Max#5192 Excessive swearing',
  options: { permission: 'STAFF', enabled: true, cooldown: 0, guildOnly: true },
  run: async (bot, interaction) => {

    var config = await bot.mutils.getGuildById(interaction.guild.id);

    //Perm Check
    if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
      return bot.noPermsEmbed(`${interaction.guild.name}`, bot);
    }

    //Args Check
    var targetuser = interaction.options.getMember('user');

    if (targetuser.roles.cache.has(config.moderation.staff_role)) {
      return bot.createEmbed('error', '', 'Error! You are not allowed to warn this person!', [], `${interaction.guild.name}`, interaction)
        .then((embed) => interaction.reply({ embeds: embed }))
        .catch((error) => bot.log.post('error', error));
    }

    let reason = interaction.options.getString('reason');

    await bot.punishments.new('warn', interaction.guild.id, targetuser.id, interaction.user.id, reason)
      .then(async () => {

        //Calculate total
        let total;
        await bot.punishments.fetch(interaction.guild.id, targetuser.id)
          .then((punishments) => {
            total = punishments.warns;
          });

        // User Output
        bot.createEmbed('success', '', `**${targetuser.user.tag}** has been warned for **${reason}**.\nThey are on a total of ${Object.keys(total).length} warnings.`, [], `${interaction.guild.name}`, interaction)
          .then((embed) => interaction.reply({ embeds: embed }))
          .catch((error) => bot.log.post('error', error));

        //DM User
        bot.eventEmbed('c70011', targetuser.user, 'You have been warned!', `**Warn Date:** ${new Date()}\n**Warned By:** ${interaction.user.tag}\n\n**Reason:** ${reason}`, [], `${interaction.guild.name}`, bot)
          .then((embed) => {
            try {
              targetuser.send(embed);
            } catch (e) {
              return;
            }
          })
          .catch(error => bot.log.post('error', error));

        //Logging
        if (config.logging.enabled === true) {
          if (bot.efunctions.checkChannel(config.logging.channel, bot) === true) {
            let lchannel = bot.channels.cache.get(config.logging.channel);
            bot.eventEmbed('c70011', targetuser.user, 'Member Warned', `**User tag:** ${targetuser.user.tag}\n**User ID:** ${targetuser.user.id}\n**Warn Date:** ${new Date()}\n**Warned By:** ${interaction.user.tag}\n\n**Reason:** ${reason}`, [], `${interaction.guild.name}`, bot)
              .then(embed => lchannel.send(embed))
              .catch(error => bot.log.post('error', error));
          }
        }

      });

  },
};