module.exports = {
  name: "delwarn",
  category: "mod",
  description: "Clear a specific warning from a user",
  usage: "<@USER> <WARNING ID>",
  example: "@Mel#4012 2",
  options: { permission: "STAFF", enabled: true, cooldown: 0, guildOnly: true },
  run: async (bot, message, args) => {
    
    const Discord = require("discord.js");

    var config = await bot.mutils.getGuildById(message.guild.id);
    
    //Perm Check
    if (!message.member.permissions.has("MANAGE_MESSAGES")) {
      return bot.noPermsEmbed(`${message.guild.name}`, bot);
    };
    
    //Args Check
    var targetuser = message.mentions.members.first();
    if (!targetuser || args[0] == "help") {
      return bot.helpEmbed("delwarn", bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    };
    
    let warnings = config.moderation.warnings.filter(function(warning) {
      return warning.user = targetuser.id;
    });
    
    if (Object.keys(warnings).length < 0) {
      return bot.createEmbed("error", "", "Error! This user has no warnings.", [], `${message.guild.name}`, message)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }

    let removedID = parseInt(args[1]);
    if(removedID === NaN) {
      return bot.createEmbed("error", "", "Error! The ID you have provided isn't a valid number.", [], `${message.guild.name}`, message)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logg.post("error", error));
    }

    if (!warnings[removedID]) {
      return bot.createEmbed("error", "", "Error! The ID you have provided doesn't exist as a warning on this user.", [], `${message.guild.name}`, message)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }

    //Magic stuffs
    warnings.splice(removedID, 1);
    config.moderation.warnings = warnings;
    //Save it
    await bot.mutils.updateGuildById(message.guild.id, config);
    //Post success embed to user
    bot.createEmbed("success", "", `Successfully removed warning ID ${removedID} from **${targetuser.user.tag}**. They now have ${Object.keys(warnings).length} warnings.`, [], `${message.guild.name}`, message)
    .then((embed) => message.channel.send(embed))
    .catch((error) => bot.log.post("error", error));

    //Logging
    const efunctions = require('../../main/functions/eventUtils.js');
    if (config.logging.enabled == true) {
      if (efunctions.checkChannel(config.logging.channel, bot) == true) {
        let lchannel = bot.channels.cache.get(config.logging.channel);
        bot.eventEmbed("c70011", targetuser.user, "Warning Removed", `**User tag:** ${targetuser.user.tag}\n**User ID:** ${targetuser.user.id}\n**Warning ID:** ${removedID}\n\n**Removed on:** ${new Date()}\n**Removed by:** ${message.author.tag}`, [], `${message.guild.name}`, bot)
          .then(embed => lchannel.send(embed))
          .catch(error => console.error(error))
      }
    };


  },
}