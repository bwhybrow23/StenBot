module.exports = {
  name: "config-log",
  category: "config",
  description: "Change all config variables related to logging.",
  usage: "<SUBCOMMAND>",
  example: "enable",
  permission: "ADMIN",
  run: async (bot, message, args) => {

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
          bot.createEmbed("error", "", `Error! You are not the owner or admin of this guild.`, [], `${message.guild.name}`, bot)
              .then((embed) => message.channel.send(embed))
              .catch((error) => bot.log.post("error", error));
      }

      //Check if they included a setting
      let setting = args[0];

      if (setting == undefined) {
          bot.createEmbed("error", "", `Error! You forgot to include a log setting.`, [], `${message.guild.name}`, bot)
              .then((embed) => message.channel.send(embed))
              .catch((error) => bot.log.post("error", error));
      }

      //Get the server config
      const config = await bot.mutils.getGuildById(message.guild.id);

      //Settings library
      switch (setting) {
          case "channel":
              var targetchannel = message.mentions.channels.first();

              if (targetchannel == undefined) {
                  return bot.createEmbed("error", "", `Error! You didn't mention a channel.`, [], `${message.guild.name}`, bot)
                      .then((embed) => message.channel.send(embed))
                      .catch((error) => bot.log.post("error", error));
              }

              if (targetchannel.id == config.logging_channel) {
                  return bot.createEmbed("error", "", `Error! That channel is already set as the log channel.`, [], `${message.guild.name}`, bot)
                      .then((embed) => message.channel.send(embed))
                      .catch((error) => bot.log.post("error", error));
              }

              bot.mutils.updateGuildById(message.guild.id, {
                  logging_channel: targetchannel.id
              })
              bot.createEmbed("success", "", `Your logging channel has been set to **${targetchannel.name}**`, [], `${message.guild.name}`, bot)
                  .then((embed) => message.channel.send(embed))
                  .catch((error) => bot.log.post("error", error));

              break;
          case "level":
              var level = args[1];
              if (level == undefined) {
                  return bot.createEmbed("error", "", `Error! You didn't mention a logging level. Choose between low, medium or high. For more information, check out the [documentation](https://docs.benwhybrow.com).`, [], `${message.guild.name}`, bot)
                      .then((embed) => message.channel.send(embed))
                      .catch((error) => bot.log.post("error", error));
              }

              switch (level) {
                  case "low":
                      if (config.logging_level == "low") {
                          return bot.createEmbed("error", "", `Error! Logging is already set to that level.`, [], `${message.guild.name}`, bot)
                              .then((embed) => message.channel.send(embed))
                              .catch((error) => bot.log.post("error", error));
                      }

                      bot.mutils.updateGuildById(message.guild.id, {
                          logging_level: "low"
                      })
                      bot.createEmbed("success", "", `Logging level has been set to **LOW**.`, [], `${message.guild.name}`, bot)
                          .then((embed) => message.channel.send(embed))
                          .catch((error) => bot.log.post("error", error));
                      break;
                  case "medium":
                      if (config.logging_level == "medium") {
                          return bot.createEmbed("error", "", `Error! Logging is already set to that level.`, [], `${message.guild.name}`, bot)
                              .then((embed) => message.channel.send(embed))
                              .catch((error) => bot.log.post("error", error));
                      }

                      bot.mutils.updateGuildById(message.guild.id, {
                          logging_level: "medium"
                      })
                      bot.createEmbed("success", "", `Logging level has been set to **MEDIUM**.`, [], `${message.guild.name}`, bot)
                          .then((embed) => message.channel.send(embed))
                          .catch((error) => bot.log.post("error", error));
                      break;
                  case "high":
                      if (config.logging_level == "high") {
                          return bot.createEmbed("error", "", `Error! Logging is already set to that level.`, [], `${message.guild.name}`, bot)
                              .then((embed) => message.channel.send(embed))
                              .catch((error) => bot.log.post("error", error));
                      }

                      bot.mutils.updateGuildById(message.guild.id, {
                          logging_level: "high"
                      })
                      bot.createEmbed("success", "", `Logging level has been set to **HIGH**.`, [], `${message.guild.name}`, bot)
                          .then((embed) => message.channel.send(embed))
                          .catch((error) => bot.log.post("error", error));
                      break;
                  default:
                      return bot.createEmbed("error", "", `Error! There is no logging level called that.`, [], `${message.guild.name}`, bot)
                          .then((embed) => message.channel.send(embed))
                          .catch((error) => bot.log.post("error", error));
              }
              break;
          case "enable":
              if (config.logging_enabled == true) {
                  return bot.createEmbed("error", "", `Error! Logging is already enabled.`, [], `${message.guild.name}`, bot)
                      .then((embed) => message.channel.send(embed))
                      .catch((error) => bot.log.post("error", error));
              }

              bot.mutils.updateGuildById(message.guild.id, {
                  logging_enabled: true
              })
              bot.createEmbed("success", "", `Logging is now enabled.`, [], `${message.guild.name}`, bot)
                  .then((embed) => message.channel.send(embed))
                  .catch((error) => bot.log.post("error", error));
              break;

          case "disable":
              if (config.logging_enabled == false) {
                  bot.createEmbed("error", "", `Error! Logging is already disabled`, [], `${message.guild.name}`, bot)
                      .then((embed) => message.channel.send(embed))
                      .catch((error) => bot.log.post("error", error));
              }

              bot.mutils.updateGuildById(message.guild.id, {
                  logging_enabled: false
              })
              bot.createEmbed("success", "", `Logging is now disabled.`, [], `${message.guild.name}`, bot)
                  .then((embed) => message.channel.send(embed))
                  .catch((error) => bot.log.post("error", error));
              break;

          case "ignore":

              let option = args[1];
              switch (option) {

                  case "add":

                      var targetchannel = message.mentions.channels.first();
                      if (targetchannel == undefined) {
                          return bot.createEmbed("error", "", `Error! You didn't mention a channel.`, [], `${message.guild.name}`, bot)
                              .then((embed) => message.channel.send(embed))
                              .catch((error) => bot.log.post("error", error));
                      }

                      if (config.logging_ignore.includes(targetchannel.id)) {
                          return bot.createEmbed("error", "", `Error! This channel is already in the ignored list.`, [], `${message.guild.name}`, bot)
                              .then((embed) => message.channel.send(embed))
                              .catch((error) => bot.log.post("error", error));
                      }

                      config.logging_ignore.push(targetchannel.id)
                      bot.mutils.updateGuildById(message.guild.id, {
                          logging_ignore: config.logging_ignore
                      });
                      bot.createEmbed("success", "", `The channel <#${targetchannel.id}> has been successfully added to the logging ignore list!`, [], `${message.guild.name}`, bot)
                          .then((embed) => message.channel.send(embed))
                          .catch((error) => bot.log.post("error", error));

                      break;

                  case "remove":

                      var targetchannel = message.mentions.channels.first();
                      if (targetchannel == undefined) {
                          return bot.createEmbed("error", "", `Error! You didn't mention a channel.`, [], `${message.guild.name}`, bot)
                              .then((embed) => message.channel.send(embed))
                              .catch((error) => bot.log.post("error", error));
                      }

                      if (!config.logging_ignore.includes(targetchannel.id)) {
                          return bot.createEmbed("error", "", `Error! This channel is currently not in the ignored list.`, [], `${message.guild.name}`, bot)
                              .then((embed) => message.channel.send(embed))
                              .catch((error) => bot.log.post("error", error));
                      }

                      let index = config.logging_ignore.indexOf(targetchannel.id);

                      config.logging_ignore.splice(index, 1)
                      bot.mutils.updateGuildById(message.guild.id, {
                          logging_ignore: config.logging_ignore
                      });
                      bot.createEmbed("success", "", `The channel <#${targetchannel.id}> has been successfully removed from the logging ignore list!`, [], `${message.guild.name}`, bot)
                          .then((embed) => message.channel.send(embed))
                          .catch((error) => bot.log.post("error", error));

                      break;

                  case "clear":

                      bot.mutils.updateGuildById(message.guild.id, {
                          logging_ignore: []
                      });
                      bot.createEmbed("success", "", `The logging ignore list has been succesfully cleared.`, [], `${message.guild.name}`, bot)
                          .then((embed) => message.channel.send(embed))
                          .catch((error) => bot.log.post("error", error));

                      break;

                  default:
                      bot.createEmbed("error", "", `Error! No valid option given. Please specify whether you would like to add, remove or clear ignored channels.`, [], `${message.guild.name}`, bot)
                          .then((embed) => message.channel.send(embed))
                          .catch((error) => bot.log.post("error", error));

              }

              break;

          default:
              bot.createEmbed("error", "", `Error! No log setting called **${setting}**`, [], `${message.guild.name}`, bot)
                  .then((embed) => message.channel.send(embed))
                  .catch((error) => bot.log.post("error", error));
      }
  },
};