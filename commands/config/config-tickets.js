module.exports = {
  name: "config-tickets",
  category: "config",
  description: "Change all config variables related to tickets.",
  usage: "sb!config-tickets <SUBCOMMAND>",
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
      return bot
        .createEmbed(
          "error",
          "",
          `Error! You forgot to include a ticket setting.`,
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
        if (config.ticketsenabled == true) {
          return bot
            .createEmbed(
              "error",
              "",
              `Error! Tickets are already enabled.`,
              [],
              `${message.guild.name}`,
              bot
            )
            .then((embed) => message.channel.send(embed))
            .catch((error) => console.error(error));
        }
        config.ticketsenabled = true;

        fs.writeFileSync(
          `./data/servers/server-${message.guild.id}/serverconfig.json`,
          JSON.stringify(config, null, 4),
          (err) => {
            if (err) return;
          }
        );

        //Check for a category called tickets, if it does not exist create one
        function isCatTickets(element) {
          if (element.constructor.name != "CategoryChannel") {
            return false;
          }
          if (element.name != "Tickets") {
            return false;
          }
          return true;
        }
        if (!message.guild.channels.some(isCatTickets)) {
          message.guild.createChannel("Tickets", "category");
        }

        bot
          .createEmbed(
            "success",
            "",
            `Tickets have been enabled.`,
            [],
            `${message.guild.name}`,
            bot
          )
          .then((embed) => message.channel.send(embed))
          .catch((error) => console.error(error));
        break;
      case "disable":
        if (config.ticketsenabled == false) {
          return bot
            .createEmbed(
              "error",
              "",
              `Error! Tickets are already disabled.`,
              [],
              `${message.guild.name}`,
              bot
            )
            .then((embed) => message.channel.send(embed))
            .catch((error) => console.error(error));
        }
        config.ticketsenabled = false;

        fs.writeFileSync(
          `./data/servers/server-${message.guild.id}/serverconfig.json`,
          JSON.stringify(config, null, 4),
          (err) => {
            if (err) return;
          }
        );

        //Check for a category called tickets, if it does not exist create one
        function isCatTickets(element) {
          if ((element.constructor.name = "CategoryChannel")) {
            return false;
          }
          if ((element.name = "Tickets")) {
            return false;
          }
          return true;
        }
        if (message.guild.channels.some(isCatTickets)) {
          message.guild.channel.delete("Tickets", "category");
        }

        bot
          .createEmbed(
            "success",
            "",
            `Tickets have been disabled.`,
            [],
            `${message.guild.name}`,
            bot
          )
          .then((embed) => message.channel.send(embed))
          .catch((error) => console.error(error));
        break;
      case "message":
        var tmessage = args.slice(1).join(" ");

        if (tmessage.length < 1) {
          return bot
            .createEmbed(
              "error",
              "",
              `Error! You haven't included a message.`,
              [],
              `${message.guild.name}`,
              bot
            )
            .then((embed) => message.channel.send(embed))
            .catch((error) => console.error(error));
        }

        if (tmessage.length > 256) {
          return bot
            .createEmbed(
              "error",
              "",
              `Error! The message you have provided is too long! Make sure it is less than **256** characters.`,
              [],
              `${message.guild.name}`,
              bot
            )
            .then((embed) => message.channel.send(embed))
            .catch((error) => console.error(error));
        }

        config.ticketsmsg = tmessage;

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
            `Ticket message set!`,
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
            `Error! There is no ticket config setting called **${setting}**.`,
            [],
            `${message.guild.name}`,
            bot
          )
          .then((embed) => message.channel.send(embed))
          .catch((error) => console.error(error));
    }
  },
};
