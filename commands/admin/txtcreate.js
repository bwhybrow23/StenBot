module.exports = {
  name: "txtcreate",
  category: "admin",
  description: "Creates a text channel. (Category must pre-exist)",
  usage: "sb!txtcreate <NAME> [CATEGORY]",
  permission: "ADMINS",
  run: async (bot, message, args) => {
    const Discord = require("discord.js");
    const fs = require("fs");

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

    var n = args[0];

    if (n == undefined) {
      bot
        .createEmbed(
          "error",
          "",
          `Error! You forgot to include a name for the channel!`,
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

    var t = args.slice(1).join(" ") || "None";

    if (n.length > 100) {
      bot
        .createEmbed(
          "error",
          "",
          `The channel name has to be between 1 and 100 in **length**`,
          [],
          `${message.guild.name}`,
          bot
        )
        .then((embed) => message.channel.send(embed))
        .catch((error) => console.error(error));
    }

    if (t.length > 1024) {
      bot
        .createEmbed(
          "error",
          "",
          `The channel topic has to be less that 1024  characters.`,
          [],
          `${message.guild.name}`,
          bot
        )
        .then((embed) => message.channel.send(embed))
        .catch((error) => console.error(error));
    }

    message.guild.createChannel(`${n}`, "text").then((channel) => {
      channel.setTopic(`${t}`);
      bot
        .createEmbed(
          "success",
          "",
          `The channel **${channel.name}** has been created.`,
          [],
          `${message.guild.name}`,
          bot
        )
        .then((embed) => message.channel.send(embed))
        .catch((error) => console.error(error));
    });
  },
};
