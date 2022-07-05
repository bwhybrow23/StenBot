const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban').setDescription('Unban a user from the server.')
        .addIntegerOption(option => option.setName('user-id').setDescription('The ID of the user to unban.').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason for the unban.'))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    category: 'mod',
    usage: '<USER ID> [REASON]',
    example: '346246641595973633 Received punishment',
    options: { permission: 'STAFF', enabled: true, guildOnly: true },
    run: async (bot, interaction) => {

        var config = await bot.mutils.getGuildById(interaction.guild.id);

        if (!interaction.member.permissions.has('BAN_MEMBERS')) {
            return bot.noPermsEmbed(`${interaction.guild.name}`, bot);
        }

        var targetuser = interaction.options.getInteger('user-id');

        let reason = interaction.options.getString('reason');
        let msg = `Succesfully unbanned the user with the ID of **${targetuser}** for **${reason}**`;

        if (reason.length < 1) {
            reason = 'N/A';
            msg = `Succesfully unbanned the user with the ID of **${targetuser}**`;
        }

        interaction.guild.members.unban(targetuser, {
            reason: `By ${interaction.user.tag}\nReason: ${reason}`
        })
            .catch((error) => bot.log.post('error', error))
            .then(
                bot.createEmbed('success', '', `${msg}`, [], `${interaction.guild.name}`, interaction)
                    .then((embed) => interaction.reply({ embeds: embed }))
                    .catch((error) => bot.log.post('error', error)));

        //Logging
        if (config.logging.enabled === true) {
            if (config.logging.level === 'low' || config.logging.level === 'medium' || config.logging.level === 'high') {
                if (bot.efunctions.checkChannel(config.logging.channel, bot) === true) {
                    let lchannel = bot.channels.cache.get(config.logging.channel);
                    bot.eventEmbed('7ae727', interaction.user, 'Member Unbanned', `**User ID:** ${targetuser}\n**Unban Date:** ${new Date()}\n**Unbanned By:** ${interaction.user.tag}\n**Reason:** ${reason}`, [], `${interaction.guild.name}`, bot)
                        .then(embed => lchannel.send(embed))
                        .catch(error => bot.log.post('error', error));
                }
            }
        }
    },
};