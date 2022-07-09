module.exports = {
  name: 'config-log',
  category: 'config',
  description: 'Change all config variables related to logging.',
  usage: '<SUBCOMMAND>',
  example: 'enable',
  options: { permission: 'ADMIN', aliases: ['c-log'], enabled: true, guildOnly: true },
  run: async (bot, interaction) => {
  
    const Discord = require('discord.js');
  
    if (message.member.permissions.has('ADMINISTRATOR') === false) {
      return bot.noPermsEmbed(`${interaction.guild.name}`, bot)
        .then((embed) => interaction.reply({ embeds: embed }))
        .catch((error) => bot.log.post('error', error));
    }
  
    //Check if they included a setting
    let setting = args[0];
  
    if (!setting) {
      bot.createEmbed('error', '', 'Error! You forgot to include a log setting.', [], `${interaction.guild.name}`, interaction)
        .then((embed) => interaction.reply({ embeds: embed }))
        .catch((error) => bot.log.post('error', error));
    }
  
    //Get the server config
    let config = await bot.mutils.getGuildById(interaction.guild.id);

    let targetchannel;
  
    //Settings library
    switch (setting) {
    case 'channel':

      targetchannel = message.mentions.channels.first();
  
      if (!targetchannel || targetchannel === 'None') {
        config.logging.channel = '0';
        bot.mutils.updateGuildById(interaction.guild.id, config);
        return bot.createEmbed('success', '', 'Your logging channel has been removed', [], `${interaction.guild.name}`, interaction)
          .then((embed) => interaction.reply({ embeds: embed }))
          .catch((error) => bot.log.post('error', error));
      }
  
      if (targetchannel.id === config.logging.channel) {
        return bot.createEmbed('error', '', 'Error! That channel is already set as the log channel.', [], `${interaction.guild.name}`, interaction)
          .then((embed) => interaction.reply({ embeds: embed }))
          .catch((error) => bot.log.post('error', error));
      }
  
      config.logging.channel = targetchannel.id;
      bot.mutils.updateGuildById(interaction.guild.id, config);
      bot.createEmbed('success', '', `Your logging channel has been set to **${targetchannel.name}**`, [], `${interaction.guild.name}`, interaction)
        .then((embed) => interaction.reply({ embeds: embed }))
        .catch((error) => bot.log.post('error', error));
  
      break;
    case 'level':
      var level = args[1];
      if (!level) {
        return bot.createEmbed('error', '', 'Error! You didn\'t mention a logging level. Choose between low, medium or high. For more information, check out the [documentation](https://docs.benwhybrow.com).', [], `${interaction.guild.name}`, interaction)
          .then((embed) => interaction.reply({ embeds: embed }))
          .catch((error) => bot.log.post('error', error));
      }
  
      switch (level) {
      case 'low':
        if (config.logging.level === 'low') {
          return bot.createEmbed('error', '', 'Error! Logging is already set to that level.', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));
        }
  
        config.logging.level = 'low';
        bot.mutils.updateGuildById(interaction.guild.id, config);
        bot.createEmbed('success', '', 'Logging level has been set to **LOW**.', [], `${interaction.guild.name}`, interaction)
          .then((embed) => interaction.reply({ embeds: embed }))
          .catch((error) => bot.log.post('error', error));
        break;

      case 'medium':
        if (config.logging.level === 'medium') {
          return bot.createEmbed('error', '', 'Error! Logging is already set to that level.', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));
        }
  
        config.logging.level = 'medium';
        bot.mutils.updateGuildById(interaction.guild.id, config);
        bot.createEmbed('success', '', 'Logging level has been set to **MEDIUM**.', [], `${interaction.guild.name}`, interaction)
          .then((embed) => interaction.reply({ embeds: embed }))
          .catch((error) => bot.log.post('error', error));
        break;

      case 'high':
        if (config.logging.level === 'high') {
          return bot.createEmbed('error', '', 'Error! Logging is already set to that level.', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));
        }
  
        config.logging.level = 'high';
        bot.mutils.updateGuildById(interaction.guild.id, config);
        bot.createEmbed('success', '', 'Logging level has been set to **HIGH**.', [], `${interaction.guild.name}`, interaction)
          .then((embed) => interaction.reply({ embeds: embed }))
          .catch((error) => bot.log.post('error', error));
        break;

      default:
        return bot.createEmbed('error', '', 'Error! There is no logging level called that.', [], `${interaction.guild.name}`, interaction)
          .then((embed) => interaction.reply({ embeds: embed }))
          .catch((error) => bot.log.post('error', error));
      }
      break;

    case 'enable':
      if (config.logging.enabled === true) {
        return bot.createEmbed('error', '', 'Error! Logging is already enabled.', [], `${interaction.guild.name}`, interaction)
          .then((embed) => interaction.reply({ embeds: embed }))
          .catch((error) => bot.log.post('error', error));
      }
  
      config.logging.enabled = true;
      bot.mutils.updateGuildById(interaction.guild.id, config);
      bot.createEmbed('success', '', 'Logging is now enabled.', [], `${interaction.guild.name}`, interaction)
        .then((embed) => interaction.reply({ embeds: embed }))
        .catch((error) => bot.log.post('error', error));
      break;
  
    case 'disable':
      if (config.logging.enabled === false) {
        bot.createEmbed('error', '', 'Error! Logging is already disabled', [], `${interaction.guild.name}`, interaction)
          .then((embed) => interaction.reply({ embeds: embed }))
          .catch((error) => bot.log.post('error', error));
      }
  
      config.logging.enabled = true;
      bot.mutils.updateGuildById(interaction.guild.id, config);
      bot.createEmbed('success', '', 'Logging is now disabled.', [], `${interaction.guild.name}`, interaction)
        .then((embed) => interaction.reply({ embeds: embed }))
        .catch((error) => bot.log.post('error', error));
          
      break;
  
    case 'ignore':
  
      let option = args[1];
      switch (option) {
  
      case 'add':
  
        targetchannel = message.mentions.channels.first();
        if (!targetchannel) {
          return bot.createEmbed('error', '', 'Error! You didn\'t mention a channel.', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));
        }
  
        if (config.logging.ignore.includes(targetchannel.id)) {
          return bot.createEmbed('error', '', 'Error! This channel is already in the ignored list.', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));
        }
  
        config.logging.ignore.push(targetchannel.id);
        bot.mutils.updateGuildById(interaction.guild.id, config);
        bot.createEmbed('success', '', `The channel <#${targetchannel.id}> has been successfully added to the logging ignore list!`, [], `${interaction.guild.name}`, interaction)
          .then((embed) => interaction.reply({ embeds: embed }))
          .catch((error) => bot.log.post('error', error));
  
        break;
  
      case 'remove':
  
        targetchannel = message.mentions.channels.first();
        if (targetchannel === undefined) {
          return bot.createEmbed('error', '', 'Error! You didn\'t mention a channel.', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));
        }
  
        if (!config.logging.ignore.includes(targetchannel.id)) {
          return bot.createEmbed('error', '', 'Error! This channel is currently not in the ignored list.', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));
        }
  
        let index = config.logging.ignore.indexOf(targetchannel.id);
  
        config.logging.ignore.splice(index, 1);
        bot.mutils.updateGuildById(interaction.guild.id, config);
        bot.createEmbed('success', '', `The channel <#${targetchannel.id}> has been successfully removed from the logging ignore list!`, [], `${interaction.guild.name}`, interaction)
          .then((embed) => interaction.reply({ embeds: embed }))
          .catch((error) => bot.log.post('error', error));
  
        break;
  
      case 'clear':
  
        config.logging.ignore = [];
        bot.mutils.updateGuildById(interaction.guild.id, config);
        bot.createEmbed('success', '', 'The logging ignore list has been succesfully cleared.', [], `${interaction.guild.name}`, interaction)
          .then((embed) => interaction.reply({ embeds: embed }))
          .catch((error) => bot.log.post('error', error));
  
        break;
  
      default:
        bot.createEmbed('error', '', 'Error! No valid option given. Please specify whether you would like to add, remove or clear ignored channels.', [], `${interaction.guild.name}`, interaction)
          .then((embed) => interaction.reply({ embeds: embed }))
          .catch((error) => bot.log.post('error', error));
  
      }
  
      break;
  
    default:
      bot.createEmbed('error', '', `Error! No log setting called **${setting}**`, [], `${interaction.guild.name}`, interaction)
        .then((embed) => interaction.reply({ embeds: embed }))
        .catch((error) => bot.log.post('error', error));
    }
  },
};