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
    if (!targetuser || args[0] === "help") {
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

    await bot.punishments.new("warn", message.guild.id, targetuser.id, message.author.id, reason)
    .then(async () => {

    //Calculate total
    let total;
    await bot.punishments.fetch(message.guild.id, targetuser.id)
    .then((punishments) => {
      total = punishments.warns;
    });

    // User Output
    bot.createEmbed("success", "", `**${targetuser.user.tag}** has been warned for **${reason}**.\nThey are on a total of ${Object.keys(total).length} warnings.`, [], `${message.guild.name}`, message)
      .then((embed) => message.reply(embed))
      .catch((error) => bot.log.post("error", error));

    //DM User
    bot.eventEmbed("c70011", targetuser.user, "You have been warned!", `**Warn Date:** ${new Date()}\n**Warned By:** ${message.author.tag}\n\n**Reason:** ${reason}`, [], `${message.guild.name}`, bot)
          .then((embed) => {
                try {
                  targetuser.send(embed);
                } catch (e) {
                  return;
                }
              })
          .catch(error => bot.log.post("error", error));

    //Logging
    if (config.logging.enabled === true) {
      if (bot.efunctions.checkChannel(config.logging.channel, bot) === true) {
        let lchannel = bot.channels.cache.get(config.logging.channel);
        bot.eventEmbed("c70011", targetuser.user, "Member Warned", `**User tag:** ${targetuser.user.tag}\n**User ID:** ${targetuser.user.id}\n**Warn Date:** ${new Date()}\n**Warned By:** ${message.author.tag}\n\n**Reason:** ${reason}`, [], `${message.guild.name}`, bot)
          .then(embed => lchannel.send(embed))
          .catch(error => bot.log.post("error", error));
      }
    };

  })

  },
}