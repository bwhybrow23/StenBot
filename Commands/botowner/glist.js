const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('glist').setDescription('Gain a list of all the guilds the bot is in.'),
  category: 'botowner',
  usage: '',
  example: '',
  options: { permission: 'BOTOWNER', enabled: true, guildOnly: true },
  run: async (bot, interaction) => {

    //Permission Check
    if (interaction.user.id !== bot.settings.ids.botOwner) {
      return;
    }

    let guildList = [];
    bot.guilds.cache.forEach(function(guilds) {
      guildList.push(`${guilds.name} ||  ${guilds.id}`);
    });

    //Split arrays to every N amount
    let n = 25;
    let result = new Array(Math.ceil(guildList.length / n))
      .fill()
      // eslint-disable-next-line no-unused-vars
      .map(_ => guildList.splice(0, n));

    let page = 1;
    result.forEach((array) => {
      bot.createEmbed('info', '**Guild List**', '', [{
        name: 'Guilds',
        value: `\`\`\`${array.join('\n')}\`\`\``
      }], `Page ${page}`, interaction)
        .then((embed) => interaction.reply(embed))
        .catch((error) => bot.log.post('error', error));
      page++;
    });
  }
};