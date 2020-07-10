module.exports = {
  name: "tempmute",
  category: "mod",
  description: "Temporarily mute someone from talking in chat.",
  usage: "sb!tempmute <@USER> <TIME IN MINS> <REASON>",
  permission: "STAFF",
  run: async (bot, message, args) => {
    const Discord = require("discord.js");
    const fs = require("fs");

    var config = JSON.parse(
      fs.readFileSync(
        `./data/servers/server-${message.guild.id}/serverconfig.json`,
        "utf8"
      )
    );

    if (config.staffrole == false) {
      return bot
        .createEmbed(
          "error",
          "",
          `Error! A staff role has not been set. An owner or admin can set one using \`sb!config-staff role <@ROLE>\``,
          [],
          `${message.guild.name}`,
          bot
        )
        .then((embed) => message.channel.send(embed))
        .catch((error) => console.error(error));
    }

    let staffrole = message.guild.roles.get(config.staffrole);

    if (staffrole == undefined) {
      return bot
        .createEmbed(
          "error",
          "",
          `Error! The staff role that has been set is invalid. An owner or admin can set a new one using \`sb!config-staff role <@ROLE>\``,
          [],
          `${message.guild.name}`,
          bot
        )
        .then((embed) => message.channel.send(embed))
        .catch((error) => console.error(error));
    }

    if (!message.member.roles.has(config.staffrole)) {
      return bot.noPermsEmbed(`${message.guild.name}`, bot);
    }

    var targetuser = message.mentions.members.first();

    if (targetuser == undefined) {
      return bot
        .createEmbed(
          "error",
          "",
          `Error! You forgot to mention a user!`,
          [],
          `${message.guild.name}`,
          bot
        )
        .then((embed) => message.channel.send(embed))
        .catch((error) => console.error(error));
    }

    var reason = args.slice(2).join(" ");

    if (reason.length < 1) {
      return bot
        .createEmbed(
          "error",
          "",
          `Error! You forgot to include a reason!`,
          [],
          `${message.guild.name}`,
          bot
        )
        .then((embed) => message.channel.send(embed))
        .catch((error) => console.error(error));
    }

    var time = args[1];
    if (time == undefined) {
      return bot
        .createEmbed(
          "error",
          "",
          `Error! You forgot to include a time in minutes!`,
          [],
          `${message.guild.name}`,
          bot
        )
        .then((embed) => message.channel.send(embed))
        .catch((error) => console.error(error));
    }

    if (isNaN(time)) {
      return bot
        .createEmbed(
          "error",
          "",
          `Error! The time has to be a number.`,
          [],
          `${message.guild.name}`,
          bot
        )
        .then((embed) => message.channel.send(embed))
        .catch((error) => console.error(error));
    }

    if (time < 1) {
      return bot
        .createEmbed(
          "error",
          "",
          `Error! The time needs to be bigger than **1 minute**.`,
          [],
          `${message.guild.name}`,
          bot
        )
        .then((embed) => message.channel.send(embed))
        .catch((error) => console.error(error));
    }

    if (time > 43200) {
      return bot
        .createEmbed(
          "error",
          "",
          `Error! The time cannot be longer than **30 days**.`,
          [],
          `${message.guild.name}`,
          bot
        )
        .then((embed) => message.channel.send(embed))
        .catch((error) => console.error(error));
    }

    let muterole = message.guild.roles.find(`name`, `Mute`);
    let botasmember = message.guild.members.get(bot.user.id);

    if (muterole == undefined) {
      message.guild
        .createRole({
          name: `Mute`,
          reason: `StenBot Mute Role Auto-create`,
        })
        .then((role) => {
          message.guild.channels.forEach(function (channel) {
            channel.overwritePermissions(role, {
              SEND_MESSAGES: false,
            });
            let muterole = role;
          });

          role.setPosition(botasmember.highestRole.position - 1);
        });
    }

    if (targetuser.roles.has(muterole.id) == true) {
      return message.channel.send({
        embed: {
          color: bot.settings.color.red,
          description: `Error! That user is already muted!`,
        },
      });
    }

    targetuser.addRole(muterole.id);

    message.channel.send({
      embed: {
        color: bot.settings.color.green,
        description: `Successfully muted **${targetuser.user.tag}** for **${time}** minutes.`,
      },
    });

    let ms = time * 60 * 1000;

    bot.setTimeout(function () {
      targetuser.removeRole(muterole.id);
    }, ms);
  },
};
