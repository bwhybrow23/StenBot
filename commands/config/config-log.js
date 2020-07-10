module.exports = {
  name: "config-log",
  category: "config",
  description: "Change all config variables related to logging.",
  usage: "sb!config-log <SUBCOMMAND>",
  permission: "ADMIN",
  run: (bot, message, args) => {
    const Discord = require("discord.js");
    const fs = require("fs");
    const checker = require("typechecker");

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
      bot
        .createEmbed(
          "error",
          "",
          `Error! You are not the owner or admin of this guild.`,
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
      bot
        .createEmbed(
          "error",
          "",
          `Error! You forgot to include a log setting.`,
          [],
          `${message.guild.name}`,
          bot
        )
        .then((embed) => message.channel.send(embed))
        .catch((error) => console.error(error));
    }

    //Get the server config
    const config = JSON.parse(fs.readFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, "utf8"));

    //Settings library
    switch (setting) {
      case "channel":
        var targetchannel = message.mentions.channels.first();

        if (targetchannel == undefined) {
          return bot
            .createEmbed(
              "error",
              "",
              `Error! You didn't mention a channel.`,
              [],
              `${message.guild.name}`,
              bot
            )
            .then((embed) => message.channel.send(embed))
            .catch((error) => console.error(error));
        }

        if (targetchannel.id == config.loggingchannel) {
          return bot
            .createEmbed(
              "error",
              "",
              `Error! That channel is already set as the log channel.`,
              [],
              `${message.guild.name}`,
              bot
            )
            .then((embed) => message.channel.send(embed))
            .catch((error) => console.error(error));
        }

        config.loggingchannel = targetchannel.id;
        bot
          .createEmbed(
            "success",
            "",
            `Your logging channel has been set to **${targetchannel.name}**`,
            [],
            `${message.guild.name}`,
            bot
          )
          .then((embed) => message.channel.send(embed))
          .catch((error) => console.error(error));

        fs.writeFileSync(
          `./data/servers/server-${message.guild.id}/serverconfig.json`,
          JSON.stringify(config, null, 4),
          (err) => {
            if (err) return;
          }
        );
        break;
      case "level":
        var level = args[1];
        if (level == undefined) {
          return bot
            .createEmbed(
              "error",
              "",
              `Error! You didn't mention a logging level. Choose between low, medium or high. For more information, check out the [documentation](https://docs.benwhybrow.com).`,
              [],
              `${message.guild.name}`,
              bot
            )
            .then((embed) => message.channel.send(embed))
            .catch((error) => console.error(error));
        }

        switch (level) {
          case "low":
            if (config.logginglevel == "low") {
              return bot
                .createEmbed(
                  "error",
                  "",
                  `Error! Logging is already set to that level.`,
                  [],
                  `${message.guild.name}`,
                  bot
                )
                .then((embed) => message.channel.send(embed))
                .catch((error) => console.error(error));
            }

            config.logginglevel = "low";
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
                `Logging level has been set to **low**.`,
                [],
                `${message.guild.name}`,
                bot
              )
              .then((embed) => message.channel.send(embed))
              .catch((error) => console.error(error));
            break;
          case "medium":
            if (config.logginglevel == "medium") {
              return bot
                .createEmbed(
                  "error",
                  "",
                  `Error! Logging is already set to that level.`,
                  [],
                  `${message.guild.name}`,
                  bot
                )
                .then((embed) => message.channel.send(embed))
                .catch((error) => console.error(error));
            }

            config.logginglevel = "medium";
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
                `Logging level has been set to **medium**.`,
                [],
                `${message.guild.name}`,
                bot
              )
              .then((embed) => message.channel.send(embed))
              .catch((error) => console.error(error));
            break;
          case "high":
            if (config.logginglevel == "high") {
              return bot
                .createEmbed(
                  "error",
                  "",
                  `Error! Logging is already set to that level.`,
                  [],
                  `${message.guild.name}`,
                  bot
                )
                .then((embed) => message.channel.send(embed))
                .catch((error) => console.error(error));
            }

            config.logginglevel = "high";
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
                `Logging level has been set to **medium**.`,
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
                `Error! There is no logging level called that.`,
                [],
                `${message.guild.name}`,
                bot
              )
              .then((embed) => message.channel.send(embed))
              .catch((error) => console.error(error));
        }
        break;
      case "enable":
        if (config.loggingenabled == true) {
          return bot
            .createEmbed(
              "error",
              "",
              `Error! Logging is already enabled.`,
              [],
              `${message.guild.name}`,
              bot
            )
            .then((embed) => message.channel.send(embed))
            .catch((error) => console.error(error));
        }

        config.loggingenabled = true;
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
            `Logging is now enabled.`,
            [],
            `${message.guild.name}`,
            bot
          )
          .then((embed) => message.channel.send(embed))
          .catch((error) => console.error(error));
        break;

      case "disable":
        if (config.loggingenabled == false) {
          bot
            .createEmbed(
              "error",
              "",
              `Error! Logging is already disabled`,
              [],
              `${message.guild.name}`,
              bot
            )
            .then((embed) => message.channel.send(embed))
            .catch((error) => console.error(error));
        }

        config.loggingenabled = false;
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
            `Logging is now disabled.`,
            [],
            `${message.guild.name}`,
            bot
          )
          .then((embed) => message.channel.send(embed))
          .catch((error) => console.error(error));
        break;

      default:
        bot
          .createEmbed(
            "error",
            "",
            `Error! No log setting called **${setting}**`,
            [],
            `${message.guild.name}`,
            bot
          )
          .then((embed) => message.channel.send(embed))
          .catch((error) => console.error(error));
    }
  },
};
