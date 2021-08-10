module.exports = {
  name: "warn",
  category: "mod",
  description: "Warn a user",
  usage: "<@USER> <REASON>",
  example: "@Marc#5192 Excessive swearing",
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
      return bot.helpEmbed("warn", bot)
        .then((embed) => message.reply(embed))
        .catch((error) => bot.log.post("error", error));
    };

    if (targetuser.roles.cache.has(config.moderation.staff_role)) {
      return bot.createEmbed("error", "", `Error! You are not allowed to warn this person!`, [], `${message.guild.name}`, message)
        .then((embed) => message.reply(embed))
        .catch((error) => bot.log.post("error", error));
    };

    let reason = args.slice(1).join(" ");
    if (!reason) {
      return bot.createEmbed("error", "", `Error! You have not provided a reason for the warning.`, [], `${message.guild.name}`, message)
        .then((embed) => message.reply(embed))
        .catch((error) => bot.log.post("error", error));
    };

    //Push the warning to the storage
    config.moderation.warnings.push({
      "user": targetuser.id,
      "reason": reason,
      "issuer": message.author.id,
      "timestamp": Date.now()
    });
    //Save the storage
    await bot.mutils.updateGuildById(message.guild.id, config);

    //Calculate total
    let total = config.moderation.warnings.filter(function(user) {
      return user.user == targetuser.id;
    });

    // User Output
    bot.createEmbed("success", "", `**${targetuser.user.tag}** has been warned for **${reason}**.\nThey are on a total of ${Object.keys(total).length} warnings.`, [], `${message.guild.name}`, message)
      .then((embed) => message.reply(embed))
      .catch((error) => bot.log.post("error", error));

    //DM User
    bot.eventEmbed("c70011", targetuser.user, "You have been warned!", `**Warn Date:** ${new Date()}\n**Warned By:** ${message.author.tag}\n\n**Reason:** ${reason}`, [], `${message.guild.name}`, bot)
          .then(embed => targetuser.send(embed))
          .catch(error => console.error(error))

    //Logging
    const efunctions = require('../../main/functions/eventUtils.js');
    if (config.logging.enabled == true) {
      if (efunctions.checkChannel(config.logging.channel, bot) == true) {
        let lchannel = bot.channels.cache.get(config.logging.channel);
        bot.eventEmbed("c70011", targetuser.user, "Member Warned", `**User tag:** ${targetuser.user.tag}\n**User ID:** ${targetuser.user.id}\n**Warn Date:** ${new Date()}\n**Warned By:** ${message.author.tag}\n\n**Reason:** ${reason}`, [], `${message.guild.name}`, bot)
          .then(embed => lchannel.send(embed))
          .catch(error => console.error(error))
      }
    };

  },
}