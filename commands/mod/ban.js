module.exports = {
  name: "ban",
  category: "mod",
  description: "Permanently Ban a user from your server.",
  usage: "<@USER> [REASON]",
  example: "@Ben#2307 Spamming",
  permission: "STAFF",
  run: async (bot, message, args) => {
      const Discord = require("discord.js");
      if (!message.guild) return;
      const fs = require("fs");

      var config = await bot.mutils.getGuildById(message.guild.id);

      if (config.staff_role == false) {
          return bot.createEmbed("error", "", `Error! A staff role has not been set. An owner or admin can set one using \`sb!config-staff role <@ROLE>\``, [], `${message.guild.name}`, bot)
              .then((embed) => message.channel.send(embed))
              .catch((error) => bot.logger("error", error));
      }

      let staffrole = message.guild.roles.cache.find(
          (r) => r.id === config.staff_role
      );

      if (staffrole == undefined) {
          return bot.createEmbed("error", "", `Error! The staff role that has been set is invalid. An owner or admin can set a new one using \`sb!config-staff role <@ROLE>\``, [], `${message.guild.name}`, bot)
              .then((embed) => message.channel.send(embed))
              .catch((error) => bot.logger("error", error));
      }

      if (!message.member.roles.cache.has(config.staff_role)) {
          return bot.noPermsEmbed(`${message.guild.name}`, bot);
      }

      var targetuser = message.mentions.members.first();

      if (!targetuser || args[0] == "help") {
        return bot.helpEmbed("ban", bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
      }

      let reason = args.slice(1).join(" ");
    let message1 = `Succesfully banned **${targetuser.user.tag}** for **${reason}**`;

    if (reason.length < 1) {
      reason = "N/A";
      message1 = `Succesfully banned **${targetuser.user.tag}**`;
    }

      if (!targetuser.bannable) {
          return bot.createEmbed("error", "", `Error! I do not have permission to ban this user!`, [], `${message.guild.name}`, bot)
              .then((embed) => message.channel.send(embed))
              .catch((error) => bot.logger("error", error));
      }

      targetuser.ban({reason: `By ${message.author.tag}\nReason: ${reason}`})
          .catch(console.error)
          .then(
              bot.createEmbed("success", "", `${message1}`, [], `${message.guild.name}`, bot)
              .then((embed) => message.channel.send(embed))
              .catch((error) => bot.logger("error", error)));

      //Logging
      const efunctions = require('../../main/functions/eventUtils.js');
      if (config.logging_enabled == true) {
        if (config.logging_level == "low" || config.logging_level == "medium" || config.logging_level == "high") {
          if (efunctions.checkChannel(config.logging_channel, bot) == true) {
            let lchannel = bot.channels.cache.get(config.logging_channel);
            bot.eventEmbed("c70011", targetuser.user, "Member Banned", `**User tag:** ${targetuser.user.tag}\n**User ID:** ${targetuser.user.id}\n**Ban Date:** ${new Date()}\n**Banned By:** ${message.author.tag}\n**Reason:** ${reason}`, [], `${message.guild.name}`, bot)
                  .then(embed => lchannel.send(embed))
                  .catch(error => console.error(error))
          }
        }
      }
  },
};