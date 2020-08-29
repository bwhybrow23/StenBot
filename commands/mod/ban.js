module.exports = {
  name: "ban",
  category: "mod",
  description: "Permanently Ban a user from your server.",
  usage: "sb!ban <@USER> <REASON>",
  permission: "STAFF",
  run: async (bot, message, args) => {
      const Discord = require("discord.js");
      if (!message.guild) return;
      const fs = require("fs");

      var config = JSON.parse(
          fs.readFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, "utf8")
      );

      if (config.staffrole == false) {
          return bot.createEmbed("error", "", `Error! A staff role has not been set. An owner or admin can set one using \`sb!config-staff role <@ROLE>\``, [], `${message.guild.name}`, bot)
              .then((embed) => message.channel.send(embed))
              .catch((error) => bot.logger("error", error));
      }

      let staffrole = message.guild.roles.cache.find(
          (r) => r.id === config.staffrole
      );

      if (staffrole == undefined) {
          return bot.createEmbed("error", "", `Error! The staff role that has been set is invalid. An owner or admin can set a new one using \`sb!config-staff role <@ROLE>\``, [], `${message.guild.name}`, bot)
              .then((embed) => message.channel.send(embed))
              .catch((error) => bot.logger("error", error));
      }

      if (!message.member.roles.cache.has(config.staffrole)) {
          return bot.noPermsEmbed(`${message.guild.name}`, bot);
      }

      var targetuser = message.mentions.members.first();

      if (targetuser == undefined) {
          return bot.createEmbed("error", "", `Error! You forgot to mention a user!`, [], `${message.guild.name}`, bot)
              .then((embed) => message.channel.send(embed))
              .catch((error) => bot.logger("error", error));
      }

      var reason = args.slice(1).join(" ");

      if (reason.length < 1) {
          return bot.createEmbed("error", "", `Error! You forgot to include a reason!`, [], `${message.guild.name}`, bot)
              .then((embed) => message.channel.send(embed))
              .catch((error) => bot.logger("error", error));
      }

      if (!targetuser.bannable) {
          return bot.createEmbed("error", "", `Error! I do not have permission to ban this user!`, [], `${message.guild.name}`, bot)
              .then((embed) => message.channel.send(embed))
              .catch((error) => bot.logger("error", error));
      }

      targetuser.ban({
              reason: `By ${message.author.tag}\nReason: ${reason}`
          })
          .catch(console.error)
          .then(
              bot.createEmbed("success", "", `Succesfully banned **${targetuser.user.tag}** for **${reason}**`, [], `${message.guild.name}`, bot)
              .then((embed) => message.channel.send(embed))
              .catch((error) => bot.logger("error", error)));
  },
};