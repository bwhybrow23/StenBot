const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mute').setDescription('Mute a user to block them from sending messages.')
    .addUserOption(option => option.setName('user').setDescription('The user to mute.').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('The reason for the mute.'))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  category: 'mod',
  usage: '<@USER> [REASON]',
  example: '@Lucy#5012 Spamming',
  options: { permission: 'STAFF', enabled: true, guildOnly: true },
  run: async (bot, interaction) => {

    const config = await bot.mutils.getGuildById(interaction.guild.id);

    //Perm Check
    if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
      return bot.noPermsEmbed(`${interaction.guild.name}`, bot);
    }

    //Args Check
    var targetuser = interaction.options.getMember('user');

    let reason = interaction.options.getString('reason');
    let msg = `Succesfully muted **${targetuser.user.tag}**${reason ? ` with reason ${reason}.` : '.'}`;

    //Role Check by config
    let muteRole = interaction.guild.roles.cache.find(r => r.id === config.moderation.mute_role);
    if (!muteRole) {
      //Role check by search
      muteRole = interaction.guild.roles.cache.find(r => r.name === 'Muted');

      //If search is sucessful, update config with mute role
      if (muteRole) {
        config.moderation.mute_role = muteRole.id;
        await bot.mutils.updateGuildById(interaction.guild, config);
      }

      //If there's still no mute role, create it 
      if (!muteRole) {
        try {
          //Create role
          muteRole = await interaction.guild.roles.create({
            name: 'Muted',
            color: '#000000',
            permissions: [],
            reason: 'StenBot Muted Role'
          });

          //Overwrite permisisons
          interaction.guild.channels.cache.forEach(async (channel) => {
            await channel.permissionOverwrites.create(muteRole, {
              SendMessages: false,
              AddReactions: false
            });
          });

          //Save new role to config
          config.moderation.mute_role = muteRole.id;
          await bot.mutils.updateGuildById(interaction.guild, config);

        } catch (error) {
          interaction.reply('Error, check console');
          bot.log.post('error', error);
        }
      }

    }

    //Mute the user
    targetuser.roles.add(muteRole, `Temporarily muted by ${interaction.user.tag} ${reason ? `with reason: **${reason}` : ''}`);

    //Log to database
    await bot.punishments.new('mute', interaction.guild.id, targetuser.id, interaction.user.id, reason);

    //Success message
    bot.createEmbed('success', '', `${msg}`, [], `${interaction.guild.name}`, interaction)
      .then((embed) => interaction.reply({ embeds: embed }))
      .catch((error) => bot.log.post('error', error));

    //DM User
    bot.eventEmbed('c70011', targetuser.user, 'You have been muted!', `**Mute Date:** ${new Date()}\n**Muted By:** ${interaction.user.tag}\n\n**Reason:** ${reason}`, [], `${interaction.guild.name}`, bot)
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
        bot.eventEmbed('c70011', targetuser.user, 'Member Muted', `**User tag:** ${targetuser.user.tag}\n**User ID:** ${targetuser.user.id}\n**Mute Date:** ${new Date()}\n**Muted By:** ${interaction.user.tag}\n\n**Reason:** ${reason}`, [], `${interaction.guild.name}`, bot)
          .then(embed => lchannel.send(embed))
          .catch(error => bot.log.post('error', error));
      }
    }
  },
};