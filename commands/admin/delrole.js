module.exports = {
  name: "delrole",
  category: "admin",
  description: "Removes the mentioned role.",
  usage: "<@ROLE>",
  example: "@Members",
  permission: "ADMIN",
  run: async (bot, message, args) => {
    
    const Discord = require("discord.js");
    if (!message.guild) return;
    const fs = require("fs");
    var r = message.mentions.roles.first();

    if (!r || args[0] == "help") {
      return bot.helpEmbed("delrole", bot)
      .then((embed) => message.channel.send(embed))
      .catch((error) => bot.logger("error", error));
    }

    const config = await bot.mutils.getGuildById(message.guild.id);

    if (config.staff_admin == false) {
      return bot.createEmbed("error", "", `Error! Admin commands are disabled. To use them, enable them with **sb!config-staff admin enable**`, [], `${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }

    if (r == undefined) {
      return bot.createEmbed("error", "", `Error! You forgot to mention a role to remove!`, [], `${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }

    if (message.member.hasPermission("ADMINISTRATOR") == false) {
      return bot.noPermsEmbed(`${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }

    var bm = await message.guild.members.fetch(bot.user.id);

    if (r.position > bm.roles.highest.position) {
      return bot.createEmbed("error", "", `Error! I am unable to delete this role!`, [], `${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    } else {
      var name = r.name;
      r.delete();
      return bot.createEmbed("success", "", `Deleted role **${name}** requested by **${message.author.tag}**`, [], `${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }
  },
};
