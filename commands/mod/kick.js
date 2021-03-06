module.exports = {
  name: "kick",
  category: "mod",
  description: "Kick a user from the server.",
  usage: "<@USER> [REASON]",
  example: "@Dan#9124 Rude Name",
  options: { permission: "STAFF", enabled: true, guildOnly: true },
  run: async (bot, message, args) => {

    const Discord = require("discord.js");

    var config = await bot.mutils.getGuildById(message.guild.id);

    if (!message.member.permissions.has("KICK_MEMBERS")) {
      return bot.noPermsEmbed(`${message.guild.name}`, bot);
    }

    var targetuser = message.mentions.members.first();
    if (!targetuser || args[0] == "help") {
      return bot.helpEmbed("kick", bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }

    if (targetuser.roles.cache.has(config.moderation.staff_role)) {
      return bot.createEmbed("error", "", `Error! You are not allowed to mute this person!`, [], `${message.guild.name}`, message)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }

    let reason = args.slice(1).join(" ");
    let msg = `Succesfully kicked **${targetuser.user.tag}** for **${reason}**`;

    if (reason.length < 1) {
      reason = "N/A";
      msg = `Succesfully kicked **${targetuser.user.tag}**`;
    }

    if (!targetuser.kickable) {
      return bot.createEmbed("error", "", `Error! I do not have permission to kick this user!`, [], `${message.guild.name}`, message)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }

    targetuser.kick(`By ${message.author.tag}\nReason: ${reason}`)
      .catch(console.error)
      .then(
        bot.createEmbed("success", "", `${msg}`, [], `${message.guild.name}`, message)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error))
        )
      .then(
        //Send user a message
        bot.eventEmbed("c70011", targetuser.user, "You have been kicked!", `**Kick Date:** ${new Date()}\n**Kicked By:** ${message.author.tag}\n**Reason:** ${reason}`, [], `${message.guild.name}`, bot)
            .then(embed => targetuser.send(embed))
            .catch(error => console.error(error))
      );

    //Logging
    const efunctions = require('../../main/functions/eventUtils.js');
    if (config.logging.enabled == true) {
      if (config.logging.level == "low" || config.logging.level == "medium" || config.logging.level == "high") {
        if (efunctions.checkChannel(config.logging.channel, bot) == true) {
          let lchannel = bot.channels.cache.get(config.logging.channel);
          bot.eventEmbed("c70011", targetuser.user, "Member Kicked", `**User tag:** ${targetuser.user.tag}\n**User ID:** ${targetuser.user.id}\n**Kick Date:** ${new Date()}\n**Kicked By:** ${message.author.tag}\n**Reason:** ${reason}`, [], `${message.guild.name}`, bot)
            .then(embed => lchannel.send(embed))
            .catch(error => console.error(error))
        }
      }
    }
  },
};