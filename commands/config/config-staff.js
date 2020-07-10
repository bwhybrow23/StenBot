module.exports = {
  name: "config-staff",
  category: "config",
  description: "Change all config variables related to staff.",
  usage: "sb!config-staff <SUBCOMMAND>",
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
      return bot
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
          `Error! You forgot to include a staff setting.`,
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
      case "role":
        var targetrole = message.mentions.roles.first();
        if (targetrole == undefined) {
          return bot
            .createEmbed(
              "error",
              "",
              `Error! You forgot to mention a role to set as the new staff role!`,
              [],
              `${message.guild.name}`,
              bot
            )
            .then((embed) => message.channel.send(embed))
            .catch((error) => console.error(error));
        }

        config.staffrole = targetrole.id;

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
            `Your servers staff role has been set! Users with this role can now use staff commands!`,
            [],
            `${message.guild.name}`,
            bot
          )
          .then((embed) => message.channel.send(embed))
          .catch((error) => console.error(error));

        break;
      case "admin":
        var status = args[1];
        if (status == undefined) {
          return bot
            .createEmbed(
              "error",
              "",
              `Error! You forgot to include a status, enable/disable.`,
              [],
              `${message.guild.name}`,
              bot
            )
            .then((embed) => message.channel.send(embed))
            .catch((error) => console.error(error));
        }

        if (status == "enable") {
          if (config.staffadminenabled == true) {
            return bot
              .createEmbed(
                "error",
                "",
                `Error! Admin commands are already **enabled**`,
                [],
                `${message.guild.name}`,
                bot
              )
              .then((embed) => message.channel.send(embed))
              .catch((error) => console.error(error));
          }

          config.staffadminenabled = true;
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
              `Admin commands have been **enabled**.`,
              [],
              `${message.guild.name}`,
              bot
            )
            .then((embed) => message.channel.send(embed))
            .catch((error) => console.error(error));
        } else if (status == "disable") {
          if (config.staffadminenabled == false) {
            return bot
              .createEmbed(
                "error",
                "",
                `Error! Admin commands are already **disabled**`,
                [],
                `${message.guild.name}`,
                bot
              )
              .then((embed) => message.channel.send(embed))
              .catch((error) => console.error(error));
          }

          config.staffadminenabled = false;
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
              `Admin commands have been **disabled**.`,
              [],
              `${message.guild.name}`,
              bot
            )
            .then((embed) => message.channel.send(embed))
            .catch((error) => console.error(error));
        } else {
          return;
        }

        break;
      case "linkblock":
        var status = args[1];
        if (status == undefined) {
          return bot
            .createEmbed(
              "error",
              "",
              `Error! You forgot to include a status, enable/disable.`,
              [],
              `${message.guild.name}`,
              bot
            )
            .then((embed) => message.channel.send(embed))
            .catch((error) => console.error(error));
        }

        if (status == "enable") {
          if (config.stafflinkblocker == true) {
            return bot
              .createEmbed(
                "error",
                "",
                `Error! Link blocker is already enabled.`,
                [],
                `${message.guild.name}`,
                bot
              )
              .then((embed) => message.channel.send(embed))
              .catch((error) => console.error(error));
          }

          config.stafflinkblocker = true;
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
              `Link blocker has been enabled.`,
              [],
              `${message.guild.name}`,
              bot
            )
            .then((embed) => message.channel.send(embed))
            .catch((error) => console.error(error));
        } else if (status == "disable") {
          if (config.stafflinkblocker == false) {
            return bot
              .createEmbed(
                "error",
                "",
                `Error! Link blocker is already disabled.`,
                [],
                `${message.guild.name}`,
                bot
              )
              .then((embed) => message.channel.send(embed))
              .catch((error) => console.error(error));
          }

          config.stafflinkblocker = false;
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
              `Link blocker has been disabled.`,
              [],
              `${message.guild.name}`,
              bot
            )
            .then((embed) => message.channel.send(embed))
            .catch((error) => console.error(error));
        } else {
          return;
        }
        break;

      case "filteradd":
        var word = args[1];
        if (word == "8") {
          return bot
            .createEmbed(
              "error",
              "",
              `Error! You can't add the number 8 to the filter.`,
              [],
              `${message.guild.name}`,
              bot
            )
            .then((embed) => message.channel.send(embed))
            .catch((error) => console.error(error));
        }

        let filter = config.stafffilter;
        if (filter.includes(word)) {
          return bot
            .createEmbed(
              "error",
              "",
              `Error! That word is already in the filter!`,
              [],
              `${message.guild.name}`,
              bot
            )
            .then((embed) => message.channel.send(embed))
            .catch((error) => console.error(error));
        }

        config.stafffilter.push(word);

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
            `The word **${word}** has been added to the filter!`,
            [],
            `${message.guild.name}`,
            bot
          )
          .then((embed) => message.channel.send(embed))
          .catch((error) => console.error(error));

        break;
      case "filterremove":
        var word = args[1];

        let thefilter = config.stafffilter;
        if (!thefilter.includes(word)) {
          return bot
            .createEmbed(
              "error",
              "",
              `Error! The word **${word}** is not in the filter.`,
              [],
              `${message.guild.name}`,
              bot
            )
            .then((embed) => message.channel.send(embed))
            .catch((error) => console.error(error));
        }

        let indexofword = thefilter.indexOf(word);

        config.stafffilter.splice(indexofword, 1);

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
            `The word **${word} has been removed from the filter!`,
            [],
            `${message.guild.name}`,
            bot
          )
          .then((embed) => message.channel.send(embed))
          .catch((error) => console.error(error));

        break;
      case "warncap":
        var cap = args[1];
        if (isNaN(cap)) {
          return bot
            .createEmbed(
              "error",
              "",
              `Error! **${cap}** is not a number!`,
              [],
              `${message.guild.name}`,
              bot
            )
            .then((embed) => message.channel.send(embed))
            .catch((error) => console.error(error));
        }

        if (parseInt(cap) == config.staffautoban) {
          return bot
            .createEmbed(
              "error",
              "",
              `Error! The warn cap is already set to **${cap}**.`,
              [],
              `${message.guild.name}`,
              bot
            )
            .then((embed) => message.channel.send(embed))
            .catch((error) => console.error(error));
        }

        if (parseInt(cap) == 0) {
          config.staffautoban = 0;
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
              `Warn cap has been disabled`,
              [],
              `${message.guild.name}`,
              bot
            )
            .then((embed) => message.channel.send(embed))
            .catch((error) => console.error(error));
        }

        if (parseInt(cap) > 100) {
          return bot
            .createEmbed(
              "error",
              "",
              `Error! The warncap cannot be over 100!`,
              [],
              `${message.guild.name}`,
              bot
            )
            .then((embed) => message.channel.send(embed))
            .catch((error) => console.error(error));
        }

        if (parseInt(cap) < 0) {
          return bot
            .createEmbed(
              "error",
              "",
              `Error! The warncap cannot be less than 0!`,
              [],
              `${message.guild.name}`,
              bot
            )
            .then((embed) => message.channel.send(embed))
            .catch((error) => console.error(error));
        }

        config.staffautoban = parseInt(cap);
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
            `The warncap has been set to **${cap}**`,
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
            `Error! There isn't a staff config setting called **${setting}**`,
            [],
            `${message.guild.name}`,
            bot
          )
          .then((embed) => message.channel.send(embed))
          .catch((error) => console.error(error));
    }
  },
};
