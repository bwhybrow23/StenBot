module.exports = {
  name: "config-staff",
  category: "config",
  description: "Change all config variables related to staff.",
  usage: "<SUBCOMMAND>",
  example: "role @Staff",
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
          return bot.createEmbed("error", "", `Error! You are not the owner or admin of this guild.`, [], `${message.guild.name}`, bot)
              .then((embed) => message.channel.send(embed))
              .catch((error) => bot.logger("error", error));
      }

      //Check if they included a setting
      let setting = args[0];

      if (setting == undefined) {
          bot.createEmbed("error", "", `Error! You forgot to include a staff setting.`, [], `${message.guild.name}`, bot)
              .then((embed) => message.channel.send(embed))
              .catch((error) => bot.logger("error", error));
      }

      //Get the server config
      const config = await bot.mutils.getGuildById(message.guild.id);

      //settings library
      switch (setting) {
          case "role":
              var targetrole = message.mentions.roles.first();
              if (targetrole == undefined) {
                  return bot.createEmbed("error", "", `Error! You forgot to mention a role to set as the new staff role!`, [], `${message.guild.name}`, bot)
                      .then((embed) => message.channel.send(embed))
                      .catch((error) => bot.logger("error", error));
              }

              bot.mutils.updateGuildById(message.guild.id, {
                  staff_role: targetrole.id
              })
              bot.createEmbed("success", "", `Your servers staff role has been set! Users with this role can now use staff commands!`, [], `${message.guild.name}`, bot)
                  .then((embed) => message.channel.send(embed))
                  .catch((error) => bot.logger("error", error));

              break;
          case "admin":
              var status = args[1];
              if (status == undefined) {
                  return bot.createEmbed("error", "", `Error! You forgot to include a status, enable/disable.`, [], `${message.guild.name}`, bot)
                      .then((embed) => message.channel.send(embed))
                      .catch((error) => bot.logger("error", error));
              }

              if (status == "enable") {
                  if (config.staff_admin == true) {
                      return bot.createEmbed("error", "", `Error! Admin commands are already **enabled**`, [], `${message.guild.name}`, bot)
                          .then((embed) => message.channel.send(embed))
                          .catch((error) => bot.logger("error", error));
                  }

                  bot.mutils.updateGuildById(message.guild.id, {
                      staff_admin: true
                  })
                  return bot.createEmbed("success", "", `Admin commands have been **enabled**.`, [], `${message.guild.name}`, bot)
                      .then((embed) => message.channel.send(embed))
                      .catch((error) => bot.logger("error", error));
              } else if (status == "disable") {
                  if (config.staff_admin == false) {
                      return bot.createEmbed("error", "", `Error! Admin commands are already **disabled**`, [], `${message.guild.name}`, bot)
                          .then((embed) => message.channel.send(embed))
                          .catch((error) => bot.logger("error", error));
                  }

                  bot.mutils.updateGuildById(message.guild.id, {
                      staff_admin: false
                  })
                  return bot.createEmbed("success", "", `Admin commands have been **disabled**.`, [], `${message.guild.name}`, bot)
                      .then((embed) => message.channel.send(embed))
                      .catch((error) => bot.logger("error", error));
              } else {
                  return;
              }

              break;
          case "linkblock":
              var status = args[1];
              if (status == undefined) {
                  return bot.createEmbed("error", "", `Error! You forgot to include a status, enable/disable.`, [], `${message.guild.name}`, bot)
                      .then((embed) => message.channel.send(embed))
                      .catch((error) => bot.logger("error", error));
              }

              if (status == "enable") {
                  if (config.staff_linkblock == true) {
                      return bot.createEmbed("error", "", `Error! Link blocker is already enabled.`, [], `${message.guild.name}`, bot)
                          .then((embed) => message.channel.send(embed))
                          .catch((error) => bot.logger("error", error));
                  }

                  bot.mutils.updateGuildById(message.guild.id, {
                      staff_linkblock: true
                  })
                  return bot.createEmbed("success", "", `Link blocker has been enabled.`, [], `${message.guild.name}`, bot)
                      .then((embed) => message.channel.send(embed))
                      .catch((error) => bot.logger("error", error));

              } else if (status == "disable") {
                  if (config.staff_linkblock == false) {
                      return bot.createEmbed("error", "", `Error! Link blocker is already disabled.`, [], `${message.guild.name}`, bot)
                          .then((embed) => message.channel.send(embed))
                          .catch((error) => bot.logger("error", error));
                  }

                  bot.mutils.updateGuildById(message.guild.id, {
                      staff_linkblock: false
                  })
                  return bot.createEmbed("success", "", `Link blocker has been disabled.`, [], `${message.guild.name}`, bot)
                      .then((embed) => message.channel.send(embed))
                      .catch((error) => bot.logger("error", error));
              } else {
                  return;
              }
              break;

          case "filter":

              let option = args[1];
              switch (option) {
                  case "add":

                      var word = args[2];
                      var lowerWord = word.toLowerCase();
                      let filter = config.staff_filter;
                      if (filter.includes(lowerWord)) {
                          return bot.createEmbed("error", "", `Error! That word is already in the filter!`, [], `${message.guild.name}`, bot)
                              .then((embed) => message.channel.send(embed))
                              .catch((error) => bot.logger("error", error));
                      }

                      config.staff_filter.push(lowerWord);
                      bot.mutils.updateGuildById(message.guild.id, {
                          staff_filter: config.staff_filter
                      })
                      bot.createEmbed("success", "", `The word **${word}** has been added to the filter!`, [], `${message.guild.name}`, bot)
                          .then((embed) => message.channel.send(embed))
                          .catch((error) => bot.logger("error", error));

                      break;

                  case "remove":

                      var word = args[2];
                      var lowerWord = word.toLowerCase();
                      let thefilter = config.staff_filter;
                      if (!thefilter.includes(lowerWord)) {
                          return bot.createEmbed("error", "", `Error! The word **${lowerWord}** is not in the filter.`, [], `${message.guild.name}`, bot)
                              .then((embed) => message.channel.send(embed))
                              .catch((error) => bot.logger("error", error));
                      }

                      let indexofword = thefilter.indexOf(lowerWord);

                      config.staff_filter.splice(indexofword, 1);
                      bot.mutils.updateGuildById(message.guild.id, {
                          staff_filter: config.staff_filter
                      })
                      bot.createEmbed("success", "", `The word **${word}** has been removed from the filter!`, [], `${message.guild.name}`, bot)
                          .then((embed) => message.channel.send(embed))
                          .catch((error) => bot.logger("error", error));

                      break;

                  case "clear":

                      bot.mutils.updateGuildById(message.guild.id, {
                          staff_filter: []
                      });
                      bot.createEmbed("success", "", `The logging ignore list has been succesfully cleared.`, [], `${message.guild.name}`, bot)
                          .then((embed) => message.channel.send(embed))
                          .catch((error) => bot.logger("error", error));

                      break;

                  default:
                      break;
              }

              break;

              // case "warncap":
              //   var cap = args[1];
              //   if (isNaN(cap)) {
              //     return bot.createEmbed("error","",`Error! **${cap}** is not a number!`,[],`${message.guild.name}`,bot)
              //       .then((embed) => message.channel.send(embed))
              //       .catch((error) => bot.logger("error", error));
              //   }

              //   if (parseInt(cap) == config.staffautoban) {
              //     return bot.createEmbed("error","",`Error! The warn cap is already set to **${cap}**.`,[],`${message.guild.name}`,bot)
              //       .then((embed) => message.channel.send(embed))
              //       .catch((error) => bot.logger("error", error));
              //   }

              //   if (parseInt(cap) == 0) {
              //     bot.mutils.updateGuildById(message.guild.id, { staff_autoban: 0 })
              //     return bot.createEmbed("success","",`Warn cap has been disabled`,[],`${message.guild.name}`,bot)
              //       .then((embed) => message.channel.send(embed))
              //       .catch((error) => bot.logger("error", error));
              //   }

              //   if (parseInt(cap) > 100) {
              //     return bot.createEmbed("error","",`Error! The warncap cannot be over 100!`,[],`${message.guild.name}`,bot)
              //       .then((embed) => message.channel.send(embed))
              //       .catch((error) => bot.logger("error", error));
              //   }

              //   if (parseInt(cap) < 0) {
              //     return bot.createEmbed("error","",`Error! The warncap cannot be less than 0!`,[],`${message.guild.name}`,bot)
              //       .then((embed) => message.channel.send(embed))
              //       .catch((error) => bot.logger("error", error));
              //   }

              //   bot.mutils.updateGuildById(message.guild.id, { staff_autoban: parseInt(cap) })
              //   bot.createEmbed("success","",`The warncap has been set to **${cap}**`,[],`${message.guild.name}`,bot)
              //     .then((embed) => message.channel.send(embed))
              //     .catch((error) => bot.logger("error", error));

              //   break;
          default:
              bot.createEmbed("error", "", `Error! There isn't a staff config setting called **${setting}**`, [], `${message.guild.name}`, bot)
                  .then((embed) => message.channel.send(embed))
                  .catch((error) => bot.logger("error", error));
      }
  },
};