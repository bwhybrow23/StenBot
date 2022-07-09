const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ship').setDescription('Calculate the love between two people.')
    .addStringOption(option => option.setName('person1').setDescription('The first person to ship.').setRequired(true))
    .addStringOption(option => option.setName('person2').setDescription('The second person to ship.').setRequired(true)),
  category: 'fun',
  usage: '<USER1> <USER2>',
  example: 'Trump Boris',
  options: { permission: 'EVERYONE', aliases: ['love'], enabled: true, guildOnly: true },
  run: async (bot, interaction) => {

    let person1 = interaction.options.getString('person1');
    let person2 = interaction.options.getString('person2');

    const love = Math.random() * 100;
    const loveIndex = Math.floor(love / 10);
    const loveLevel = '💓'.repeat(loveIndex) + '💔'.repeat(10 - loveIndex);

    bot.createEmbed('info', `${person1} x ${person2}`, `💟${Math.floor(love)}%\n\n${loveLevel}`, [], '', interaction)
      .then((embed) => interaction.reply({ embeds: embed }))
      .catch((error) => bot.log.post('error', error));
  },
};