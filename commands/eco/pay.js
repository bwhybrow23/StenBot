const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pay').setDescription('Give some money to another user.')
        .addUserOption(option => option.setName('user').setDescription('The user to give money to.').setRequired(true))
        .addIntegerOption(option => option.setName('amount').setDescription('The amount of money to give.').setRequired(true)),
    category: 'eco',
    usage: '<@USER> <VALUE>',
    example: '@Steve#6942 100',
    options: { permission: 'EVERYONE', enabled: true, cooldown: 10, guildOnly: true },
    run: async (bot, interaction) => {

        const ecoUtils = require('../../Main/Functions/ecoUtils');

        let toBePaid = await ecoUtils.getUser(interaction.options.getUser('user').id);

        let payee = await ecoUtils.getUser(interaction.user.id);
        let amount = interaction.options.getInteger('amount');

        // if (amount.includes("-")) {
        //   // if the message includes "-" do this.
        //   return interaction.reply("Negative money can not be paid.");
        // }

        if (payee.balance < amount) {
            return interaction.reply({ content: 'You do not have enough money to pay that amount.', ephemeral: 'true' });
        }

        await ecoUtils.updateUser(payee.discordID, payee.balance - amount).then(async () => {
            await ecoUtils.updateUser(toBePaid.discordID, toBePaid.balance + amount).then(async (user) => {
                return bot.createEmbed('success', '', `${amount} has now been transferred to ${interaction.options.getUser('user').tag}'s balance. Their new balance is ${user.balance}.`, [], '', interaction)
                    .then((embed) => interaction.reply({ embeds: embed }))
                    .catch((error) => bot.log.post('error', error));
            });
        });

    },
};