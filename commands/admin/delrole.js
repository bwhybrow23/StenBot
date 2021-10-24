module.exports = {
  name: "delrole",
  category: "admin",
  description: "Removes a mentioned role",
  usage: "<@ROLE>",
  example: "@Members",
  options: { permission: "ADMIN", aliases: ["drole"], enabled: true, guildOnly: true, cooldown: 5 },
  run: async (bot, message, args) => {

    const Discord = require("discord.js");
    var r = message.mentions.roles.first();

    //Help Embed
    if (!r || args[0] === "help") {
      return bot.helpEmbed("delrole", bot)
        .then((embed) => message.reply(embed))
        .catch((error) => bot.log.post("error", error));
    }

    //Config, Args and Permission Check
    const config = await bot.mutils.getGuildById(message.guild.id);

    if (r === undefined) {
      return bot.createEmbed("error", "", `Error! You forgot to mention a role to remove!`, [], `${message.guild.name}`, message)
        .then((embed) => message.reply(embed))
        .catch((error) => bot.log.post("error", error));
    }

    if (message.member.permissions.has("ADMINISTRATOR") === false) {
      return bot.noPermsEmbed(`${message.guild.name}`, bot)
        .then((embed) => message.reply(embed))
        .catch((error) => bot.log.post("error", error));
    }

    var bm = await message.guild.members.fetch(bot.user.id);

    //Permission Check
    if (r.position > bm.roles.highest.position) {
      return bot.createEmbed("error", "", `Error! I am unable to delete this role!`, [], `${message.guild.name}`, message)
        .then((embed) => message.reply(embed))
        .catch((error) => bot.log.post("error", error));
    } else {
      //Do The Magic
      var name = r.name;
      r.delete();
      return bot.createEmbed("success", "", `Deleted role **${name}** requested by **${message.author.tag}**`, [], `${message.guild.name}`, message)
        .then((embed) => message.reply(embed))
        .catch((error) => bot.log.post("error", error));
    }
  },
};