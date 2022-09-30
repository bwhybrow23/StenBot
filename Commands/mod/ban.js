const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban').setDescription('Permanently ban a user from the server')
    .addUserOption(option => option.setName('user').setDescription('The user to ban.'))
    .addNumberOption(option => option.setName('user-id').setDescription('The user ID of the person to ban (if they are no longer on the server)'))
    .addStringOption(option => option.setName('reason').setDescription('The reason for the ban.'))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
  category: 'mod',
  usage: '<@USER> [REASON]',
  example: '@James#2307 Bullying',
  options: { permission: 'STAFF', enabled: true, guildOnly: true },
  run: async (bot, interaction) => {

    const config = await bot.mutils.getGuildById(interaction.guild.id);

    //Perm Check
    if (!interaction.member.permissions.has('BAN_MEMBERS')) {
      return bot.noPermsEmbed(`${interaction.guild.name}`, bot);
    }

    //Variables            Fetch user              Removes everything but numbers
    let targetuser;
    //If user mentioned, go with that
    if (interaction.options.getUser('user')) {
      targetuser = interaction.options.getMember('user');
    } else {
      //Try looking up ID
      try {
        targetuser = await bot.users.fetch(interaction.options.getNumber('user-id'), { force: true });
      } catch (error) {
        //No user found
        return bot.createEmbed('error', '', `Error! Unable to find user with ID ${interaction.options.getNumber('user-id')}`, [], `${interaction.guild.name}`, interaction)
          .then((embed) => interaction.reply({ embeds: embed }))
          .catch((error) => bot.log.post('error', error));
      }
    }
    let reason = interaction.options.getString('reason');

    //Check if user is already banned
    if (interaction.guild.bans.fetch(targetuser, { force: true })) {
      return interaction.reply(`${targetuser.username + targetuser.discriminator} is already banned from this guild.`);
    }

    //Ban the user
    interaction.guild.bans.create(targetuser, {
      reason: `Banned by ${interaction.user.tag}${reason ? ` with reason ${reason}.` : '.'}`
    })
      .then(async () => {

        //Log it to database
        await bot.punishments.new('ban', interaction.guild.id, targetuser.id, interaction.user.id, reason);

        //Send success message
        bot.createEmbed('success', '', `Sucessfully banned ${targetuser}${reason ? ` for \`${reason}\`.` : '.'}`, [], `${interaction.guild.name}`, interaction)
          .then((embed) => interaction.reply({ embeds: embed }))
          .catch((error) => bot.log.post('error', error));

        //Logging
        if (config.logging.enabled === true) {
          if (config.logging.level === 'low' || config.logging.level === 'medium' || config.logging.level === 'high') {
            if (bot.efunctions.checkChannel(config.logging.channel, bot) === true) {
              let lchannel = bot.channels.cache.get(config.logging.channel);
              bot.eventEmbed('c70011', targetuser, 'Member Banned', `**User tag:** ${targetuser.username + targetuser.discriminator}\n**User ID:** ${targetuser.id}\n**Ban Date:** ${new Date()}\n**Banned By:** ${interaction.user.tag} ${ reason ? `\n**Reason:** ${reason}` : ''}`, [], `${interaction.guild.name}`, bot)
                .then(embed => lchannel.send(embed))
                .catch(error => bot.log.post('error', error));
            }
          }
        }
      });
  },
};