module.exports = {
  name: "ban",
  category: "mod",
  description: "Permanently ban a user from the server.",
  usage: "<@USER> [REASON]",
  example: "@Ash#2307 Bullying",
  permission: "STAFF",
  aliases: [],
  enabled: true,
  run: async (bot, message, args) => {
    
      const Discord = require("discord.js");
      if (!message.guild) return;

      var config = await bot.mutils.getGuildById(message.guild.id);

      if (!message.member.permissions.has("BAN_MEMBERS")) {
        return bot.noPermsEmbed(`${message.guild.name}`, bot);
      }

      var targetuser = message.mentions.members.first();

      if (!targetuser || args[0] == "help") {
        return bot.helpEmbed("ban", bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
      }

      let reason = args.slice(1).join(" ");
    let msg = `Succesfully banned **${targetuser.user.tag}** for **${reason}**`;

    if (reason.length < 1) {
      reason = "N/A";
      msg = `Succesfully banned **${targetuser.user.tag}**`;
    }

      if (!targetuser.bannable) {
          return bot.createEmbed("error", "", `Error! I do not have permission to ban this user!`, [], `${message.guild.name}`, bot)
              .then((embed) => message.channel.send(embed))
              .catch((error) => bot.log.post("error", error));
      }

      targetuser.ban({reason: `By ${message.author.tag}\nReason: ${reason}`})
          .catch(console.error)
          .then(
              bot.createEmbed("success", "", `${msg}`, [], `${message.guild.name}`, bot)
              .then((embed) => message.channel.send(embed))
              .catch((error) => bot.log.post("error", error)));

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