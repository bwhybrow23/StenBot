module.exports = {
  name: "delrole",
  category: "admin",
  description: "Removes the mentioned role.",
  usage: "<@ROLE>",
  example: "@Members",
  options: { permission: "ADMIN", aliases: ["drole"], enabled: true, guildOnly: true },
  run: async (bot, message, args) => {

    const Discord = require("discord.js");
    var r = message.mentions.roles.first();

    //Help Embed
    if (!r || args[0] == "help") {
      return bot.helpEmbed("delrole", bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }

    //Config, Args and Permission Check
    const config = await bot.mutils.getGuildById(message.guild.id);

    if (config.staff_admin == false) {
      return bot.createEmbed("error", "", `Error! Admin commands are disabled. To use them, enable them with **sb!config-staff admin enable**`, [], `${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }

    if (r == undefined) {
      return bot.createEmbed("error", "", `Error! You forgot to mention a role to remove!`, [], `${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }

    if (message.member.hasPermission("ADMINISTRATOR") == false) {
      return bot.noPermsEmbed(`${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }

    var bm = await message.guild.members.fetch(bot.user.id);

    //Permission Check
    if (r.position > bm.roles.highest.position) {
      return bot.createEmbed("error", "", `Error! I am unable to delete this role!`, [], `${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    } else {
      //Do The Magic
      var name = r.name;
      r.delete();
      return bot.createEmbed("success", "", `Deleted role **${name}** requested by **${message.author.tag}**`, [], `${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }
  },
};