module.exports = {
  name: 'config-moderation',
  category: 'config',
  description: 'Change all config variables related to moderation.',
  usage: '<SUBCOMMAND>',
  example: 'role @Staff',
  options: { permission: 'ADMIN', aliases: ['c-mod', 'c-moderation'], enabled: true, guildOnly: true },
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
      bot.createEmbed('error', '', 'Error! You forgot to include a staff setting.', [], `${interaction.guild.name}`, interaction)
        .then((embed) => interaction.reply({ embeds: embed }))
        .catch((error) => bot.log.post('error', error));
    }
  
    //Get the server config
    let config = await bot.mutils.getGuildById(interaction.guild.id);
  
    //settings library
    switch (setting) {
    case 'role':
      var targetrole = message.mentions.roles.first();
      if (targetrole === undefined | 'None') {
        config.moderation.staff_role = '0';
        bot.mutils.updateGuildById(interaction.guild.id, config);
        return bot.createEmbed('success', '', 'Your server\'s staff role has now been removed.', [], `${interaction.guild.name}`, interaction)
          .then((embed) => interaction.reply({ embeds: embed }))
          .catch((error) => bot.log.post('error', error));
      }
  
      config.moderation.staff_role = targetrole.id;
      bot.mutils.updateGuildById(interaction.guild.id, config);
      bot.createEmbed('success', '', 'Your servers staff role has been set! Users with this role can now use staff commands!', [], `${interaction.guild.name}`, interaction)
        .then((embed) => interaction.reply({ embeds: embed }))
        .catch((error) => bot.log.post('error', error));
  
      break;
    case 'linkblock':
      var status = args[1];
      if (status === undefined) {
        return bot.createEmbed('error', '', 'Error! You forgot to include a status, enable/disable.', [], `${interaction.guild.name}`, interaction)
          .then((embed) => interaction.reply({ embeds: embed }))
          .catch((error) => bot.log.post('error', error));
      }
  
      if (status === 'enable') {
        if (config.staff_linkblock === true) {
          return bot.createEmbed('error', '', 'Error! Link blocker is already enabled.', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));
        }
  
        config.moderation.link_block = true;
        bot.mutils.updateGuildById(interaction.guild.id, config);
        return bot.createEmbed('success', '', 'Link blocker has been enabled.', [], `${interaction.guild.name}`, interaction)
          .then((embed) => interaction.reply({ embeds: embed }))
          .catch((error) => bot.log.post('error', error));
  
      } else if (status === 'disable') {
        if (config.staff_linkblock === false) {
          return bot.createEmbed('error', '', 'Error! Link blocker is already disabled.', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));
        }
  
        config.moderation.link_block = false;
        bot.mutils.updateGuildById(interaction.guild.id, config);
        bot.createEmbed('success', '', 'Link blocker has been disabled.', [], `${interaction.guild.name}`, interaction)
          .then((embed) => interaction.reply({ embeds: embed }))
          .catch((error) => bot.log.post('error', error));
      } else {
        return;
      }
      break;
  
    case 'filter':
  
      let option = args[1];
      switch (option) {
      case 'add':
  
        var word = args[2];
        var lowerWord = word.toLowerCase();
        let filter = config.moderation.filter;
        if (filter.includes(lowerWord)) {
          return bot.createEmbed('error', '', 'Error! That word is already in the filter!', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));
        }
  
        config.moderation.filter.push(lowerWord);
        bot.mutils.updateGuildById(interaction.guild.id, config);
        bot.createEmbed('success', '', `The word **${word}** has been added to the filter!`, [], `${interaction.guild.name}`, interaction)
          .then((embed) => interaction.reply({ embeds: embed }))
          .catch((error) => bot.log.post('error', error));
  
        break;
  
      case 'remove':
  
        var word = args[2];
        var lowerWord = word.toLowerCase();
        let thefilter = config.moderation.filter;
        if (!thefilter.includes(lowerWord)) {
          return bot.createEmbed('error', '', `Error! The word **${lowerWord}** is not in the filter.`, [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));
        }
  
        let indexofword = thefilter.indexOf(lowerWord);
  
        config.moderation.filter.splice(indexofword, 1);
        bot.mutils.updateGuildById(interaction.guild.id, config);
        bot.createEmbed('success', '', `The word **${word}** has been removed from the filter!`, [], `${interaction.guild.name}`, interaction)
          .then((embed) => interaction.reply({ embeds: embed }))
          .catch((error) => bot.log.post('error', error));
  
        break;
  
      case 'clear':
  
        config.moderation.filter = [];
        bot.mutils.updateGuildById(interaction.guild.id, config);
        bot.createEmbed('success', '', 'The logging ignore list has been succesfully cleared.', [], `${interaction.guild.name}`, interaction)
          .then((embed) => interaction.reply({ embeds: embed }))
          .catch((error) => bot.log.post('error', error));
  
        break;
  
      default:
        break;
      }
  
      break;
  
      // case "warncap":
      //   var cap = args[1];
      //   if (isNaN(cap)) {
      //     return bot.createEmbed("error","",`Error! **${cap}** is not a number!`,[],`${interaction.guild.name}`,interaction)
      //       .then((embed) => interaction.reply({ embeds: embed }))
      //       .catch((error) => bot.log.post("error", error));
      //   }
  
      //   if (parseInt(cap) == config.staffautoban) {
      //     return bot.createEmbed("error","",`Error! The warn cap is already set to **${cap}**.`,[],`${interaction.guild.name}`,interaction)
      //       .then((embed) => interaction.reply({ embeds: embed }))
      //       .catch((error) => bot.log.post("error", error));
      //   }
  
      //   if (parseInt(cap) == 0) {
      //     bot.mutils.updateGuildById(interaction.guild.id, { staff_autoban: 0 })
      //     return bot.createEmbed("success","",`Warn cap has been disabled`,[],`${interaction.guild.name}`,interaction)
      //       .then((embed) => interaction.reply({ embeds: embed }))
      //       .catch((error) => bot.log.post("error", error));
      //   }
  
      //   if (parseInt(cap) > 100) {
      //     return bot.createEmbed("error","",`Error! The warncap cannot be over 100!`,[],`${interaction.guild.name}`,interaction)
      //       .then((embed) => interaction.reply({ embeds: embed }))
      //       .catch((error) => bot.log.post("error", error));
      //   }
  
      //   if (parseInt(cap) < 0) {
      //     return bot.createEmbed("error","",`Error! The warncap cannot be less than 0!`,[],`${interaction.guild.name}`,interaction)
      //       .then((embed) => interaction.reply({ embeds: embed }))
      //       .catch((error) => bot.log.post("error", error));
      //   }
  
      //   bot.mutils.updateGuildById(interaction.guild.id, { staff_autoban: parseInt(cap) })
      //   bot.createEmbed("success","",`The warncap has been set to **${cap}**`,[],`${interaction.guild.name}`,interaction)
      //     .then((embed) => interaction.reply({ embeds: embed }))
      //     .catch((error) => bot.log.post("error", error));
  
      //   break;
    default:
      bot.createEmbed('error', '', `Error! There isn't a staff config setting called **${setting}**`, [], `${interaction.guild.name}`, interaction)
        .then((embed) => interaction.reply({ embeds: embed }))
        .catch((error) => bot.log.post('error', error));
    }
  },
};