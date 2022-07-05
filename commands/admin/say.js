const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say').setDescription('Get StenBot to say whatever you want')
        .addStringOption(option => option.setName('message').setDescription('The message that you want the bot to say').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    category: 'admin',
    usage: '<MESSAGE>',
    example: 'Hello World!',
    options: { permission: 'ADMIN', enabled: true, cooldown: 5, guildOnly: true },
    run: async (bot, interaction) => {

        //Permission Check
        if (interaction.member.permissions.has('ADMINISTRATOR') === false) {
            return bot.noPermsEmbed(`${interaction.guild.name}`, bot)
                .then((embed) => interaction.reply({ embeds: embed }))
                .catch((error) => bot.log.post('error', error));
        }

        //Input validation
        let msg = interaction.options.getString('message');

        if (msg.length > 500) {
            return bot.createEmbed('error', '', 'Error! Your message it too long. It must be less that **500** characters.', [], `${interaction.guild.name}`, interaction, true)
                .then((embed) => interaction.reply({ embeds: embed }))
                .catch((error) => bot.log.post('error', error));
        }

        if (msg.length < 2) {
            return bot.createEmbed('error', '', 'Error! Your message is too short.', [], `${interaction.guild.name}`, interaction, true)
                .then((embed) => interaction.reply({ embeds: embed }))
                .catch((error) => bot.log.post('error', error));
        }

        //Send the Message
        return bot.createEmbed('success', '', `${msg}`, [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));
    },
};