module.exports = {
  name: "config-music",
  category: "config",
  description: "Change all config variables related to music.",
  usage: "sb!config-music <SUBCOMMAND>",
  permission: "ADMIN",
  run: (bot, message, args) => {

    const Discord = require("discord.js");
    if (!message.guild) return;
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
      return bot.createEmbed("error","",`Error! You are not the owner or admin of this guild.`,[],`${message.guild.name}`,bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }

    bot.createEmbed("error","",`Error! The music section of the bot is not completed yet therefore it cannot be configured. Sorry :/`,[],`${message.guild.name}`,bot)
      .then((embed) => message.channel.send(embed))
      .catch((error) => bot.logger("error", error));

    // //Check if they included a setting
    // let setting = args[0];

    // if (setting == undefined) {
    //     bot.createEmbed("error", "", `Error! You forgot to include a config setting to change.`, [], `${message.guild.name}`, bot)
    //         .then(embed => message.channel.send(embed))
    //         .catch(error => console.error(error))
    // };

    // //Get the server config
    // const config = JSON.parse(fs.readFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, "utf8"));

    // //Settings library
    // switch (setting) {
    //     case "enable":

    //         if (config.musicenabled == true) {
    //             return bot.createEmbed("error", "", `Error! Music is already enabled.`, [], `${message.guild.name}`, bot)
    //                 .then(embed => message.channel.send(embed))
    //                 .catch(error => console.error(error))
    //         };
    //         config.musicenabled = true;

    //         fs.writeFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, JSON.stringify(config, null, 4), (err) => {
    //             if (err) return;
    //         });

    //         bot.createEmbed("success", "", `Music has been enabled.`, [], `${message.guild.name}`, bot)
    //             .then(embed => message.channel.send(embed))
    //             .catch(error => console.error(error))
    //         break;
    //     case "disable":

    //         if (config.musicenabled == false) {
    //             return bot.createEmbed("error", "", `Error! Music is already disabled.`, [], `${message.guild.name}`, bot)
    //                 .then(embed => message.channel.send(embed))
    //                 .catch(error => console.error(error))
    //         };
    //         config.musicenabled = false;

    //         fs.writeFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, JSON.stringify(config, null, 4), (err) => {
    //             if (err) return;
    //         });

    //         bot.createEmbed("success", "", `Music has been disabled!`, [], `${message.guild.name}`, bot)
    //             .then(embed => message.channel.send(embed))
    //             .catch(error => console.error(error))
    //         break;

    //     default:
    //         bot.createEmbed("error", "", `Error! No config setting called **${setting}**`, [], `${message.guild.name}`, bot)
    //             .then(embed => message.channel.send(embed))
    //             .catch(error => console.error(error))
    // };
  },
};
