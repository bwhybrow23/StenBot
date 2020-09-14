module.exports = {
  name: "kick",
  category: "mod",
  description: "Kick a user from your server.",
  usage: "sb!kick @Danny Spamming stuff",
  permission: "STAFF",
  run: async (bot, message, args) => {
    const Discord = require("discord.js");
    if (!message.guild) return;
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

    var targetuser = message.mentions.members.first();

    if (targetuser == undefined) {
      return bot.createEmbed("error","",`Error! You forgot to mention a user!`,[],`${message.guild.name}`,bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }

    var reason = args.slice(1).join(" ");

    if (reason.length < 1) {
      return bot.createEmbed("error","",`Error! You forgot to include a reason!`,[],`${message.guild.name}`,bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }

    if (!targetuser.kickable) {
      return bot.createEmbed("error","",`Error! I do not have permission to kick this user!`,[],`${message.guild.name}`,bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }

    targetuser.kick(`By ${message.author.tag}\nReason: ${reason}`)
      .catch(console.error)
      .then(
        bot.createEmbed("success","",`Succesfully kicked **${targetuser.user.tag}** for **${reason}**`,[],`${message.guild.name}`,bot)
          .then((embed) => message.channel.send(embed))
          .catch((error) => bot.logger("error", error)));
  },
};
