module.exports = {
  name: "delchannel",
  category: "admin",
  description: "Deletes the mentioned channel.",
  usage: "sb!delchannel <#CHANNEL>",
  permission: "ADMINS",
  run: async (bot, message, args) => {

    const Discord = require("discord.js");
    if (!message.guild) return;
    const fs = require("fs");
    var c = message.mentions.channels.first();

    const config = JSON.parse(fs.readFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, "utf8"));

    if (config.staffadminenabled == false) {
      return bot.createEmbed("error", "", `Error! Admin commands are disabled. To use them, enable them with **sb!config-staff admin enable**`, [], `${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }

    if (c == undefined) {
      return bot.createEmbed("error", "", "Error! You forgot to mention a channel to remove!", [], `${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }

    if (message.member.hasPermission("ADMINISTRATOR") == false) {
      return bot.noPermsEmbed(`${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }

    if (c.deletable == false) {
      return bot.createEmbed("error", "", "Error! I am unable to delete that channel!", [], `${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }

    c.delete().then((deleted) => {
      return bot.createEmbed("success", "", `The channel **${deleted.name}** has been removed by administrator **${message.author}**`, [], `${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error))
  });
  },
};
