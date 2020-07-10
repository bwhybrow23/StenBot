module.exports = {
  name: "config-userjoin",
  category: "config",
  description:
    "Change all config variables related to when users join your server.",
  usage: "sb!config-userjoin <SUBCOMMAND>",
  permission: "ADMIN",
  run: (bot, message, args) => {
    const Discord = require("discord.js");
    const fs = require("fs");
    var format = require("string-template");

    let servertag = message.guild.name;

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
      return bot
        .createEmbed(
          "error",
          "",
          `Error! You are not the owner or the admin of this guild.`,
          [],
          `${message.guild.name}`,
          bot
        )
        .then((embed) => message.channel.send(embed))
        .catch((error) => console.error(error));
    }

    //Check if they included a setting
    let setting = args[0];

    if (setting == undefined) {
      return bot
        .createEmbed(
          "error",
          "",
          `Error! You forgot to include a userjoin config setting.`,
          [],
          `${message.guild.name}`,
          bot
        )
        .then((embed) => message.channel.send(embed))
        .catch((error) => console.error(error));
    }

    //Get the server config
    const config = JSON.parse(fs.readFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, "utf8"));

    //settings library
    switch (setting) {
      case "enable":
        if (config.userjoinenabled) {
          return bot
            .createEmbed(
              "error",
              "",
              `Error! Userjoin is already enabled.`,
              [],
              `${message.guild.name}`,
              bot
            )
            .then((embed) => message.channel.send(embed))
            .catch((error) => console.error(error));
        }
        config.userjoinenabled = true;
        fs.writeFileSync(
          `./data/servers/server-${message.guild.id}/serverconfig.json`,
          JSON.stringify(config, null, 4),
          (err) => {
            if (err) return;
          }
        );
        bot
          .createEmbed(
            "success",
            "",
            `Userjoin has been enabled!`,
            [],
            `${message.guild.name}`,
            bot
          )
          .then((embed) => message.channel.send(embed))
          .catch((error) => console.error(error));
        break;
      case "disable":
        if (!config.userjoinenabled) {
          return bot
            .createEmbed(
              "error",
              "",
              `Error! Userjoin is already disabled!`,
              [],
              `${message.guild.name}`,
              bot
            )
            .then((embed) => message.channel.send(embed))
            .catch((error) => console.error(error));
        }
        config.userjoinenabled = false;
        fs.writeFileSync(
          `./data/servers/server-${message.guild.id}/serverconfig.json`,
          JSON.stringify(config, null, 4),
          (err) => {
            if (err) return;
          }
        );
        return bot
          .createEmbed(
            "success",
            "",
            `Userjoin has been disabled!`,
            [],
            `${message.guild.name}`,
            bot
          )
          .then((embed) => message.channel.send(embed))
          .catch((error) => console.error(error));
        break;
      case "role":
        var targetrole = message.mentions.roles.first();

        if (!config.userjoinenabled) {
          return bot
            .createEmbed(
              "error",
              "",
              `Error! Userjoin is not enabled. You can enable it with **sb!config-userjoin enable**`,
              [],
              `${message.guild.name}`,
              bot
            )
            .then((embed) => message.channel.send(embed))
            .catch((error) => console.error(error));
        }
        if (targetrole == undefined) {
          return bot
            .createEmbed(
              "error",
              "",
              `Error! You haven't mentioned a role to set.`,
              [],
              `${message.guild.name}`,
              bot
            )
            .then((embed) => message.channel.send(embed))
            .catch((error) => console.error(error));
        }

        let botmember = message.guild.members.get(bot.user.id);
        let comparedpos = targetrole.comparePositionTo(botmember.highestRole);

        if (comparedpos > 0) {
          return bot
            .createEmbed(
              "error",
              "",
              `Error! That role is higher than the bot, therefore the bot cannot add the role to a user. Please fix this by moving the role below the bot's highest role.`,
              [],
              `${message.guild.name}`,
              bot
            )
            .then((embed) => message.channel.send(embed))
            .catch((error) => console.error(error));
        }

        if (targetrole.id == config.userjoinedrole) {
          return bot
            .createEmbed(
              "error",
              "",
              `Error! That role is already set as the auto-role.`,
              [],
              `${message.guild.name}`,
              bot
            )
            .then((embed) => message.channel.send(embed))
            .catch((error) => console.error(error));
        }

        config.userjoinedrole = targetrole.id;

        fs.writeFileSync(
          `./data/servers/server-${message.guild.id}/serverconfig.json`,
          JSON.stringify(config, null, 4),
          (err) => {
            if (err) return;
          }
        );

        bot
          .createEmbed(
            "success",
            "",
            `Auto-role is set to **${targetrole.name}**.`,
            [],
            `${message.guild.name}`,
            bot
          )
          .then((embed) => message.channel.send(embed))
          .catch((error) => console.error(error));
        break;
      case "name":
        var name = args.slice(1).join(" ");

        if (name == undefined) {
          return bot
            .createEmbed(
              "error",
              "",
              `Error! You didn't include a name!`,
              [],
              `${message.guild.name}`,
              bot
            )
            .then((embed) => message.channel.send(embed))
            .catch((error) => console.error(error));
        }

        if (name.length > 32) {
          return bot
            .createEmbed(
              "error",
              "",
              `Error! The name is too long! It has to be less than **32** characters!`,
              [],
              `${message.guild.name}`,
              bot
            )
            .then((embed) => message.channel.send(embed))
            .catch((error) => console.error(error));
        }

        config.userjoinedname = name;
        fs.writeFileSync(
          `./data/servers/server-${message.guild.id}/serverconfig.json`,
          JSON.stringify(config, null, 4),
          (err) => {
            if (err) return;
          }
        );
        bot
          .createEmbed(
            "success",
            "",
            `Auto-name is set to **${name}**`,
            [],
            `${message.guild.name}`,
            bot
          )
          .then((embed) => message.channel.send(embed))
          .catch((error) => console.error(error));
        break;
      default:
        return bot
          .createEmbed(
            "error",
            "",
            `Error! There isn't a userjoin config setting called **${setting}**`,
            [],
            `${message.guild.name}`,
            bot
          )
          .then((embed) => message.channel.send(embed))
          .catch((error) => console.error(error));
    }
  },
};
