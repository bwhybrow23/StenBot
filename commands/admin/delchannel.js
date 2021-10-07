module.exports = {
  name: "delchannel",
  category: "admin",
  description: "Deletes a mentioned channel",
  usage: "<#CHANNEL>",
  example: "#general",
  options: { permission: "ADMIN", aliases: ["dchannel"], enabled: true, guildOnly: true, cooldown: 5 },
  run: async (bot, message, args) => {

    const Discord = require("discord.js");
    var c = message.mentions.channels.first();

    //Permission, Args and Config Check
    if (!c || args[0] == "help") {
      return bot.helpEmbed("delchannel", bot)
        .then((embed) => message.reply(embed))
        .catch((error) => bot.log.post("error", error));
    }

    const config = await bot.mutils.getGuildById(message.guild.id);

    if (message.member.permissions.has("ADMINISTRATOR") == false) {
      return bot.noPermsEmbed(`${message.guild.name}`, bot)
        .then((embed) => message.reply(embed))
        .catch((error) => bot.log.post("error", error));
    }

    if (!c) {
      return bot.createEmbed("error", "", "Error! You forgot to mention a channel to remove!", [], `${message.guild.name}`, message)
        .then((embed) => message.reply(embed))
        .catch((error) => bot.log.post("error", error));
    }

    if (c.deletable == false) {
      return bot.createEmbed("error", "", "Error! I am unable to delete that channel!", [], `${message.guild.name}`, message)
        .then((embed) => message.reply(embed))
        .catch((error) => bot.log.post("error", error));
    }

    //Do the Magic
    c.delete().then((deleted) => {
      return bot.createEmbed("success", "", `The channel **${deleted.name}** has been removed by administrator **${message.author}**`, [], `${message.guild.name}`, message)
        .then((embed) => message.reply(embed))
        .catch((error) => bot.log.post("error", error))
    });
  },
};