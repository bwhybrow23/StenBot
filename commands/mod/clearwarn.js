module.exports = {
  name: "clearwarn",
  category: "mod",
  description: "Clear all warnings from a user",
  usage: "<@USER>",
  example: "@Josh#4012",
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
      return bot.helpEmbed("clearwarn", bot)
        .then((embed) => message.reply(embed))
        .catch((error) => bot.log.post("error", error));
    };
    
    let warnings = config.moderation.warnings.filter(function(warning) {
      return warning.user = targetuser.id;
    });
    
    if (Object.keys(warnings).length < 0) {
      return bot.createEmbed("error", "", "Error! This user has no warnings.", [], `${message.guild.name}`, message)
        .then((embed) => message.reply(embed))
        .catch((error) => bot.log.post("error", error));
    }

    //Magic stuffs
    warnings = [];
    config.moderation.warnings = warnings;
    //Save it
    await bot.mutils.updateGuildById(message.guild.id, config);
    //Post success embed to user
    bot.createEmbed("success", "", `Successfully removed all warnings from **${targetuser.user.tag}**.`, [], `${message.guild.name}`, message)
    .then((embed) => message.reply(embed))
    .catch((error) => bot.log.post("error", error));

    //Logging
    const efunctions = require('../../main/functions/eventUtils.js');
    if (config.logging.enabled == true) {
      if (efunctions.checkChannel(config.logging.channel, bot) == true) {
        let lchannel = bot.channels.cache.get(config.logging.channel);
        bot.eventEmbed("c70011", targetuser.user, "Warnings Cleared", `**User tag:** ${targetuser.user.tag}\n**User ID:** ${targetuser.user.id}\n\n**Removed on:** ${new Date()}\n**Removed by:** ${message.author.tag}`, [], `${message.guild.name}`, bot)
          .then(embed => lchannel.send(embed))
          .catch(error => console.error(error))
      }
    };


  },
}