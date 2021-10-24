module.exports = {
  name: "unban",
  category: "mod",
  description: "Unban a user",
  usage: "<USER ID> [REASON]",
  example: "346246641595973633 Received punishment",
  options: { permission: "STAFF", enabled: true, guildOnly: true },
  run: async (bot, message, args) => {

    const Discord = require("discord.js");

    var config = await bot.mutils.getGuildById(message.guild.id);

    if (!message.member.permissions.has("BAN_MEMBERS")) {
      return bot.noPermsEmbed(`${message.guild.name}`, bot);
    }

    var targetuser = args[0];
    if (!targetuser || typeof targetuser == 'number' || args[0] === "help") {
      return bot.helpEmbed("unban", bot)
        .then((embed) => message.reply(embed))
        .catch((error) => bot.log.post("error", error));
    }

    let reason = args.slice(1).join(" ");
    let msg = `Succesfully unbanned the user with the ID of **${targetuser}** for **${reason}**`;

    if (reason.length < 1) {
      reason = "N/A";
      msg = `Succesfully unbanned the user with the ID of **${targetuser}**`;
    }

    message.guild.members.unban(targetuser, {
        reason: `By ${message.author.tag}\nReason: ${reason}`
      })
      .catch((error) => bot.log.post("error", error))
      .then(
        bot.createEmbed("success", "", `${msg}`, [], `${message.guild.name}`, message)
        .then((embed) => message.reply(embed))
        .catch((error) => bot.log.post("error", error)));

    //Logging
    if (config.logging.enabled === true) {
      if (config.logging.level === "low" || config.logging.level === "medium" || config.logging.level === "high") {
        if (bot.efunctions.checkChannel(config.logging.channel, bot) === true) {
          let lchannel = bot.channels.cache.get(config.logging.channel);
          bot.eventEmbed("7ae727", message.author, "Member Unbanned", `**User ID:** ${targetuser}\n**Unban Date:** ${new Date()}\n**Unbanned By:** ${message.author.tag}\n**Reason:** ${reason}`, [], `${message.guild.name}`, bot)
            .then(embed => lchannel.send(embed))
            .catch(error => bot.log.post("error", error));
        }
      }
    }
  },
};