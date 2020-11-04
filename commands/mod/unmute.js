module.exports = {
    name: "unmute",
    category: "mod",
    description: "Unute a user that has previously been muted by StenBot.",
    usage: "<@USER> [REASON]",
    example: "@Geoff#3010 Has shut up",
    permission: "STAFF",
    run: async (bot, message, args) => {

      const Discord = require("discord.js");
      if (!message.guild) return;

      //Permission Check
      const fs = require("fs");

    var config = await bot.mutils.getGuildById(message.guild.id);

    if (config.staff_role == false) {
      return bot.createEmbed("error","",`Error! A staff role has not been set. An owner or admin can set one using \`sb!config-staff role <@ROLE>\``,[],`${message.guild.name}`,bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }

    let staffrole = message.guild.roles.cache.find(
      (r) => r.id === config.staff_role
    );

    if (staffrole == undefined) {
      return bot.createEmbed("error","",`Error! The staff role that has been set is invalid. An owner or admin can set a new one using \`sb!config-staff role <@ROLE>\``,[],`${message.guild.name}`,bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }

    if (!message.member.roles.cache.has(config.staff_role)) {
      return bot.noPermsEmbed(`${message.guild.name}`, bot);
    }
      
    //Args Check
    var targetuser = message.mentions.members.first();
    if (!targetuser || args[0] == "help") {
      return bot.helpEmbed("unmute", bot)
      .then((embed) => message.channel.send(embed))
      .catch((error) => bot.logger("error", error));
    }

    if (targetuser.roles.cache.has(config.staffrole)) {
        return bot.createEmbed("error","",`Error! You are not allowed to mute this person!`,[],`${message.guild.name}`,bot)
          .then((embed) => message.channel.send(embed))
          .catch((error) => bot.logger("error", error));
      }

    let reason = args.slice(1).join(" ");
    let message1 = `Succesfully unmuted **${targetuser.user.tag}** for **${reason}**`;

    if (reason.length < 1) {
      reason = "N/A";
      message1 = `Succesfully unmuted **${targetuser.user.tag}**`;
    }

      //Role Check
      let muteRole = message.guild.roles.cache.find(r=>r.name=="Muted")
      if (!muteRole) {
        return bot.createEmbed("error","",`Error! There is no valid "Muted" role which means that the role has been deleted or was never created. In order for the role to be created, a user has to be muted by StenBot.`,[],`${message.guild.name}`,bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
      }

      //Unmute them
      bot.moderator.unmute(message.guild.members.cache.get(targetuser.id), {
          reason: reason,
          author: message.member,
          mutedRoleID: muteRole
      }).then((muteData) => {
        //Response
        bot.createEmbed("success","",`${message1}`,[],`${message.guild.name}`,bot)
          .then((embed) => message.channel.send(embed))
          .catch((error) => bot.logger("error", error));
        //Logging
        const efunctions = require('../../main/functions/eventUtils.js');
        if (config.logging_enabled == true) {
          if (config.logging_level == "low" || config.logging_level == "medium" || config.logging_level == "high") {
              if (efunctions.checkChannel(config.logging_channel, bot) == true) {
                let lchannel = bot.channels.cache.get(config.logging_channel);
                bot.eventEmbed("7ae727", targetuser.user, "Member Unmuted", `**User tag:** ${targetuser.user.tag}\n**User ID:** ${targetuser.user.id}\n**Unmute Date:** ${new Date()}\n**Unmuted By:** ${message.author.tag}\n**Reason:** ${reason}`, [], `${message.guild.name}`, bot)
                .then(embed => lchannel.send(embed))
                .catch(error => console.error(error))
              }
          }
        }
      });
    },
  };