module.exports = {
  name: "say",
  category: "admin",
  description: "Get StenBot to say something",
  usage: "sb!say <MESSAGE>",
  permission: "ADMINS",
  run: async (bot, message, args) => {
    const Discord = require("discord.js");
    const ownersid = message.guild.ownerID;
    const adminperm = message.member.hasPermission("ADMINISTRATOR");

    var access = true;

    if (adminperm == false) {
      var access = false;
    }

    if (access == false) {
      if (ownersid == message.author.id) {
        var access = true;
      }
    }

    if (access == false) {
      bot
        .createEmbed(
          "error",
          "",
          `Error! You are not the owner or an admin!`,
          [],
          `${message.guild.name}`,
          bot
        )
        .then((embed) => message.channel.send(embed))
        .catch((error) => console.error(error));
    }

    var msg = args.slice(0).join(" ");
    if (msg.length > 500) {
      bot
        .createEmbed(
          "error",
          "",
          `Error! Your message it too long. It must be less that **500** characters.`,
          [],
          `${message.guild.name}`,
          bot
        )
        .then((embed) => message.channel.send(embed))
        .catch((error) => console.error(error));
    }
    if (msg.length < 2) {
      bot
        .createEmbed(
          "error",
          "",
          `Error! Your message is too short.`,
          [],
          `${message.guild.name}`,
          bot
        )
        .then((embed) => message.channel.send(embed))
        .catch((error) => console.error(error));
    }

    bot
      .createEmbed("success", "", `${msg}`, [], `${message.guild.name}`, bot)
      .then((embed) => message.channel.send(embed))
      .catch((error) => console.error(error));
  },
};
