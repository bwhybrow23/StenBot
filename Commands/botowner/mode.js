const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mode').setDescription('Freely switch the bot between production and development mode.')
    .addStringOption(option => option.setName('mode').setDescription('The mode to switch to').setRequired(true)),
  category: 'botowner',
  usage: '<MODE>',
  example: 'production',
  options: { permission: 'BOTOWNER', enabled: true, guildOnly: true },
  run: async (bot, interaction) => {

    const fs = require('fs');
    const packageJSON = require('../../package.json');

    //Permission Check
    if (interaction.user.id !== bot.settings.ids.botOwner) {
      return;
    }

    //Args
    let newMode = interaction.options.getString('mode');
    let date = new Date();

    //Subcommand Stuff
    switch (newMode) {
    //Production
    case 'production':
      //Check if bot is already in Production mode
      if (bot.settings.mode === 'production') {
        return interaction.channel.send('The bot is already in that mode.');
      }
      //Change Setting
      bot.settings.mode = 'production';
      fs.writeFileSync('./Main/settings.json', JSON.stringify(bot.settings, null, 4), (err) => {
        if (err) return bot.log.post('error', err);
      });
      //Change Status
      // eslint-disable-next-line no-case-declarations
      let guilds = bot.guilds.cache.size;
      bot.user.setPresence({
        activities: [{
          name: `sb!help on ${guilds} servers!`,
          type: 'WATCHING'
        }],
        status: 'online'
      });
      //Console Log
      bot.log.post('info', `StenBot has been converted to Production Mode. Running version: ${packageJSON.version} | Changed at ${date}`);
      //Reply interaction
      bot.createEmbed('success', '', 'Bot Mode has been Sucessfully Updated to **Production**.', [], `${interaction.guild.name}`, interaction)
        .then((embed) => interaction.reply(embed))
        .catch((error) => bot.log.post('error', error));

      break;

      //Development
    case 'development':
      //Check if bot is already in Development mode
      if (bot.settings.mode === 'development') {
        return interaction.channel.send('The bot is already in that mode.');
      }

      //Change Setting
      bot.settings.mode = 'development';
      fs.writeFileSync('./Main/settings.json', JSON.stringify(bot.settings, null, 4), (err) => {
        if (err) return bot.log.post('error', err);
      });

      //Change Status
      bot.user.setPresence({
        activities: [{
          name: 'In Development Mode',
          type: 'PLAYING'
        }],
        status: 'dnd'
      });

      //Console Log
      bot.log.post('info', `StenBot has been converted to Development Mode. | Changed at ${date}`);

      //Reply interaction
      bot.createEmbed('success', '', 'Bot Mode has been Sucessfully Updated to **Development**.', [], `${interaction.guild.name}`, interaction)
        .then((embed) => interaction.reply(embed))
        .catch((error) => bot.log.post('error', error));

      break;

    default:
      bot.createEmbed('error', '', 'Error! You haven\'t included a new mode for the bot to be switched to.', [], `${interaction.guild.name}`, interaction)
        .then((embed) => interaction.reply(embed))
        .catch((error) => bot.log.post('error', error));
      break;
    }
  },
};