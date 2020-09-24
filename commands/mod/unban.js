module.exports = {
    name: "unban",
    category: "mod",
    description: "Unban a user",
    usage: "sb!unban <@USER ID> <REASON>",
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
  
        var targetuser = args[0];
  
        if (targetuser == undefined || typeof targetuser === 'number') {
            return bot.createEmbed("error", "", `Error! You forgot to give the User's ID! You must get the user's ID and not their name.`, [], `${message.guild.name}`, bot)
                .then((embed) => message.channel.send(embed))
                .catch((error) => bot.logger("error", error));
        }
  
        var reason = args.slice(1).join(" ");
  
        if (reason.length < 1) {
            return bot.createEmbed("error", "", `Error! You forgot to include a reason!`, [], `${message.guild.name}`, bot)
                .then((embed) => message.channel.send(embed))
                .catch((error) => bot.logger("error", error));
        }
  
        message.guild.members.unban(targetuser, {
                reason: `By ${message.author.tag}\nReason: ${reason}`
            })
            .catch(console.error)
            .then(
                bot.createEmbed("success", "", `Succesfully unbanned the User with the ID of **${targetuser}** for **${reason}**`, [], `${message.guild.name}`, bot)
                .then((embed) => message.channel.send(embed))
                .catch((error) => bot.logger("error", error)));

    //Logging
      const efunctions = require('../../main/functions/eventUtils.js');
      if (config.logging_enabled == true) {
        if (config.logging_level == "low" || config.logging_level == "medium" || config.logging_level == "high") {
          if (efunctions.checkChannel(config.logging_channel, bot) == true) {
            let lchannel = bot.channels.cache.get(config.logging_channel);
            bot.eventEmbed("7ae727", message.author, "Member Unbanned", `**User ID:** ${targetuser}\n**Unban Date:** ${new Date()}\n**Unbanned By:** ${message.author.tag}\n**Reason:** ${reason}`, [], `${message.guild.name}`, bot)
                  .then(embed => lchannel.send(embed))
                  .catch(error => console.error(error))
          }
        }
      }
    },
  };