const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tempmute').setDescription('Temporarily mute a user for a period of time.')
        .addUserOption(option => option.setName('user').setDescription('The user to mute.').setRequired(true))
        .addStringOption(option => option.setName('time').setDescription('The time to mute the user for.').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason for the mute.'))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    category: 'mod',
    usage: '<@USER> <TIME> [REASON]',
    example: '@Jess#8022 1d Being annoying',
    options: { permission: 'STAFF', aliases: ['tmute'], enabled: true, guildOnly: true },
    run: async (bot, interaction) => {

        const config = await bot.mutils.getGuildById(interaction.guild.id);

        if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
            return bot.noPermsEmbed(`${interaction.guild.name}`, bot);
        }

        //Args Check
        let targetuser = interaction.options.getMember('user');

        let reason = interaction.options.getString('reason');
        let msg = `Succesfully tempmuted **${targetuser.user.tag}** for **${interaction.options.getString('time')}** ${reason ? `for **${reason}**.` : '.'}`;

        //Role Check by config
        let muteRole = interaction.guild.roles.cache.find(r => r.id === config.moderation.mute_role);
        if (!muteRole) {
            //Role check by search
            muteRole = interaction.guild.roles.cache.find(r => r.name === 'Muted');

            //If search is sucessful, update config with mute role
            if (muteRole) {
                config.moderation.mute_role = muteRole.id;
                await bot.mutils.updateGuildById(interaction.guild.id, config);
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
                    interaction.guild.channels.cache.forEach(async (channel,) => {
                        await channel.permissionOverwrites.create(muteRole, {
                            SEND_MESSAGES: false,
                            ADD_REACTIONS: false
                        });
                    });

                    //Save new role to config
                    config.moderation.mute_role = muteRole.id;
                    await bot.mutils.updateGuildById(interaction.guild.id, config);

                } catch (error) {
                    interaction.reply('Error, check console');
                    bot.log.post('error', error);
                }
            }

        }

        //Check if user is already muted
        await bot.punishments.fetch(interaction.guild.id, targetuser.id)
            .then((punishments) => {
                punishments.tempmutes.forEach(punishment => {
                    if (!punishment.expiry) return;

                    return interaction.reply('This user already has an ongoing mute. Please unmute them and try again.');

                });
            });

        //Mute the user
        targetuser.roles.add(muteRole, `Temporarily muted by ${interaction.user.tag} for the duration of ${interaction.options.getString('time')} ${reason ? `with reason: **${reason}` : ''}`);

        //Log to database
        await bot.punishments.new('tempmute', interaction.guild.id, targetuser.id, interaction.user.id, reason, interaction.options.getString('time'));

        //Success message 
        bot.createEmbed('success', '', `${msg}`, [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));

        //DM User
        bot.eventEmbed('c70011', targetuser.user, 'You have been temporarily muted!', `**Mute Date:** ${new Date()}\n**Muted By:** ${interaction.user.tag}\n\n**Reason:** ${reason ? `${reason}\n` : 'None provided\n'}**Duration:** ${interaction.options.getString('time')}`, [], `${interaction.guild.name}`, bot)
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
                bot.eventEmbed('c70011', targetuser.user, 'Member Temporarily Muted', `**User tag:** ${targetuser.user.tag}\n**User ID:** ${targetuser.user.id}\n**Mute Date:** ${new Date()}\n**Muted By:** ${interaction.user.tag}\n\n**Reason:** ${reason ? `${reason}\n` : 'None provided\n'}**Duration:** ${interaction.options.getString('time')}`, [], `${interaction.guild.name}`, bot)
                    .then(embed => lchannel.send(embed))
                    .catch(error => bot.log.post('error', error));
            }
        }

    },
};