module.exports = {
  name: "delrole",
  category: "admin",
  description: "Deletes the mentioned role.",
  usage: "sb!delrole <@ROLE>",
  permission: "ADMINS",
  run: async (bot, message, args) => {
    const Discord = require("discord.js");
    const fs = require("fs");
    var r = message.mentions.roles.first();

    const config = JSON.parse(fs.readFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, "utf8"));

    if (config.staffadminenabled == false) {
      bot
        .createEmbed(
          "error",
          "",
          `Error! Admin commands are disabled. To use them, enable them with **sb!config-staff admin enable**`,
          [],
          `${message.guild.name}`,
          bot
        )
        .then((embed) => message.channel.send(embed))
        .catch((error) => console.error(error));
    }

    if (r == undefined) {
      bot
        .createEmbed(
          "error",
          "",
          `Error! You forgot to mention a role to remove!`,
          [],
          `${message.guild.name}`,
          bot
        )
        .then((embed) => message.channel.send(embed))
        .catch((error) => console.error(error));
    }

    if (message.member.hasPermission("ADMINISTRATOR") == false) {
      bot
        .noPermsEmbed(`${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => console.error(error));
    }

    var bm = message.guild.members.get(bot.user.id);

    if (r.position > bm.highestRole.position) {
      bot
        .createEmbed(
          "error",
          "",
          `Error! I am unable to delete this role!`,
          [],
          `${message.guild.name}`,
          bot
        )
        .then((embed) => message.channel.send(embed))
        .catch((error) => console.error(error));
    } else {
      var name = r.name;
      r.delete();
      return bot
        .createEmbed(
          "success",
          "",
          `Deleted role **${name}** requested by **${message.author.tag}**`,
          [],
          `${message.guild.name}`,
          bot
        )
        .then((embed) => message.channel.send(embed))
        .catch((error) => console.error(error));
    }
  },
};
