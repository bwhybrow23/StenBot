module.exports = {
  name: "unmute",
  category: "mod",
  description: "Unmute a user that has previously been muted by StenBot.",
  usage: "<@USER> [REASON]",
  example: "@Geoff#3010 Has shut up",
  options: { permission: "STAFF", enabled: true, guildOnly: true},
  run: async (bot, message, args) => {

    const Discord = require("discord.js");

    var config = await bot.mutils.getGuildById(message.guild.id);

    if (!message.member.permissions.has("MANAGE_MESSAGES")) {
      return bot.noPermsEmbed(`${message.guild.name}`, bot);
    }

    //Args Check
    var targetuser = message.mentions.members.first();
    if (!targetuser || args[0] === "help") {
      return bot.helpEmbed("unmute", bot)
        .then((embed) => message.reply(embed))
        .catch((error) => bot.log.post("error", error));
    }

    if (targetuser.roles.cache.has(config.moderation.staff_role)) {
      return bot.createEmbed("error", "", `Error! You are not allowed to mute this person!`, [], `${message.guild.name}`, message)
        .then((embed) => message.reply(embed))
        .catch((error) => bot.log.post("error", error));
    }

    let reason = args.slice(1).join(" ");
    let msg = `Succesfully unmuted **${targetuser.user.tag}** for **${reason}**`;

    if (reason.length < 1) {
      reason = "N/A";
      msg = `Succesfully unmuted **${targetuser.user.tag}**`;
    }

    //Role Check
    let muteRole = message.guild.roles.cache.find(r => r.name === "Muted");
    if (!muteRole) {
      return bot.createEmbed("error", "", `Error! There is no valid "Muted" role which means that the role has been deleted or was never created. In order for the role to be created, a user has to be muted by StenBot.`, [], `${message.guild.name}`, message)
        .then((embed) => message.reply(embed))
        .catch((error) => bot.log.post("error", error));
    }

    //Unmute them
    bot.moderator.unmute(message.guild.members.cache.get(targetuser.id), {
      reason: reason,
      author: message.member,
      mutedRoleID: muteRole
    }).then((muteData) => {
      //Response
      bot.createEmbed("success", "", `${msg}`, [], `${message.guild.name}`, message)
        .then((embed) => message.reply(embed))
        .catch((error) => bot.log.post("error", error));
      //Logging
      if (config.logging.enabled === true) {
        if (config.logging.level === "low" || config.logging.level === "medium" || config.logging.level === "high") {
          if (bot.efunctions.checkChannel(config.logging.channel, bot) === true) {
            let lchannel = bot.channels.cache.get(config.logging.channel);
            bot.eventEmbed("7ae727", targetuser.user, "Member Unmuted", `**User tag:** ${targetuser.user.tag}\n**User ID:** ${targetuser.user.id}\n**Unmute Date:** ${new Date()}\n**Unmuted By:** ${message.author.tag}\n**Reason:** ${reason}`, [], `${message.guild.name}`, bot)
              .then(embed => lchannel.send(embed))
              .catch(error => bot.log.post("error", error));
          }
        }
      }
    });
  },
};