module.exports = {
    name: "config-moderation",
    category: "config",
    description: "Change all config variables related to moderation.",
    usage: "<SUBCOMMAND>",
    example: "role @Staff",
    options: { permission: "ADMIN", aliases: ["c-mod", "c-moderation"], enabled: true, guildOnly: true },
    run: async (bot, message, args) => {
  
      const Discord = require("discord.js");
  
      if (message.member.hasPermission("ADMINISTRATOR") == false) {
        return bot.noPermsEmbed(`${message.guild.name}`, bot)
          .then((embed) => message.channel.send(embed))
          .catch((error) => bot.log.post("error", error));
      }
  
      //Check if they included a setting
      let setting = args[0];
  
      if (setting == undefined) {
        bot.createEmbed("error", "", `Error! You forgot to include a staff setting.`, [], `${message.guild.name}`, bot)
          .then((embed) => message.channel.send(embed))
          .catch((error) => bot.log.post("error", error));
      }
  
      //Get the server config
      let config = await bot.mutils.getGuildById(message.guild.id);
  
      //settings library
      switch (setting) {
        case "role":
          var targetrole = message.mentions.roles.first();
          if (targetrole == undefined | "None") {
            config.moderation.staff_role = "0";
            bot.mutils.updateGuildById(message.guild.id, config);
            return bot.createEmbed("success", "", `Your server's staff role has now been removed.`, [], `${message.guild.name}`, bot)
              .then((embed) => message.channel.send(embed))
              .catch((error) => bot.log.post("error", error));
          }
  
          config.moderation.staff_role = targetrole.id;
          bot.mutils.updateGuildById(message.guild.id, config);
          bot.createEmbed("success", "", `Your servers staff role has been set! Users with this role can now use staff commands!`, [], `${message.guild.name}`, bot)
            .then((embed) => message.channel.send(embed))
            .catch((error) => bot.log.post("error", error));
  
          break;
        case "linkblock":
          var status = args[1];
          if (status == undefined) {
            return bot.createEmbed("error", "", `Error! You forgot to include a status, enable/disable.`, [], `${message.guild.name}`, bot)
              .then((embed) => message.channel.send(embed))
              .catch((error) => bot.log.post("error", error));
          }
  
          if (status == "enable") {
            if (config.staff_linkblock == true) {
              return bot.createEmbed("error", "", `Error! Link blocker is already enabled.`, [], `${message.guild.name}`, bot)
                .then((embed) => message.channel.send(embed))
                .catch((error) => bot.log.post("error", error));
            }
  
            config.moderation.link_block = true;
            bot.mutils.updateGuildById(message.guild.id, config)
            return bot.createEmbed("success", "", `Link blocker has been enabled.`, [], `${message.guild.name}`, bot)
              .then((embed) => message.channel.send(embed))
              .catch((error) => bot.log.post("error", error));
  
          } else if (status == "disable") {
            if (config.staff_linkblock == false) {
              return bot.createEmbed("error", "", `Error! Link blocker is already disabled.`, [], `${message.guild.name}`, bot)
                .then((embed) => message.channel.send(embed))
                .catch((error) => bot.log.post("error", error));
            }
  
            config.moderation.link_block = false;
            bot.mutils.updateGuildById(message.guild.id, config);
            bot.createEmbed("success", "", `Link blocker has been disabled.`, [], `${message.guild.name}`, bot)
              .then((embed) => message.channel.send(embed))
              .catch((error) => bot.log.post("error", error));
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
              let filter = config.moderation.filter;
              if (filter.includes(lowerWord)) {
                return bot.createEmbed("error", "", `Error! That word is already in the filter!`, [], `${message.guild.name}`, bot)
                  .then((embed) => message.channel.send(embed))
                  .catch((error) => bot.log.post("error", error));
              }
  
              config.moderation.filter.push(lowerWord);
              bot.mutils.updateGuildById(message.guild.id, config);
              bot.createEmbed("success", "", `The word **${word}** has been added to the filter!`, [], `${message.guild.name}`, bot)
                .then((embed) => message.channel.send(embed))
                .catch((error) => bot.log.post("error", error));
  
              break;
  
            case "remove":
  
              var word = args[2];
              var lowerWord = word.toLowerCase();
              let thefilter = config.moderation.filter;
              if (!thefilter.includes(lowerWord)) {
                return bot.createEmbed("error", "", `Error! The word **${lowerWord}** is not in the filter.`, [], `${message.guild.name}`, bot)
                  .then((embed) => message.channel.send(embed))
                  .catch((error) => bot.log.post("error", error));
              }
  
              let indexofword = thefilter.indexOf(lowerWord);
  
              config.moderation.filter.splice(indexofword, 1);
              bot.mutils.updateGuildById(message.guild.id, config);
              bot.createEmbed("success", "", `The word **${word}** has been removed from the filter!`, [], `${message.guild.name}`, bot)
                .then((embed) => message.channel.send(embed))
                .catch((error) => bot.log.post("error", error));
  
              break;
  
            case "clear":
  
              config.moderation.filter = [];
              bot.mutils.updateGuildById(message.guild.id, config);
              bot.createEmbed("success", "", `The logging ignore list has been succesfully cleared.`, [], `${message.guild.name}`, bot)
                .then((embed) => message.channel.send(embed))
                .catch((error) => bot.log.post("error", error));
  
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
          //       .catch((error) => bot.log.post("error", error));
          //   }
  
          //   if (parseInt(cap) == config.staffautoban) {
          //     return bot.createEmbed("error","",`Error! The warn cap is already set to **${cap}**.`,[],`${message.guild.name}`,bot)
          //       .then((embed) => message.channel.send(embed))
          //       .catch((error) => bot.log.post("error", error));
          //   }
  
          //   if (parseInt(cap) == 0) {
          //     bot.mutils.updateGuildById(message.guild.id, { staff_autoban: 0 })
          //     return bot.createEmbed("success","",`Warn cap has been disabled`,[],`${message.guild.name}`,bot)
          //       .then((embed) => message.channel.send(embed))
          //       .catch((error) => bot.log.post("error", error));
          //   }
  
          //   if (parseInt(cap) > 100) {
          //     return bot.createEmbed("error","",`Error! The warncap cannot be over 100!`,[],`${message.guild.name}`,bot)
          //       .then((embed) => message.channel.send(embed))
          //       .catch((error) => bot.log.post("error", error));
          //   }
  
          //   if (parseInt(cap) < 0) {
          //     return bot.createEmbed("error","",`Error! The warncap cannot be less than 0!`,[],`${message.guild.name}`,bot)
          //       .then((embed) => message.channel.send(embed))
          //       .catch((error) => bot.log.post("error", error));
          //   }
  
          //   bot.mutils.updateGuildById(message.guild.id, { staff_autoban: parseInt(cap) })
          //   bot.createEmbed("success","",`The warncap has been set to **${cap}**`,[],`${message.guild.name}`,bot)
          //     .then((embed) => message.channel.send(embed))
          //     .catch((error) => bot.log.post("error", error));
  
          //   break;
        default:
          bot.createEmbed("error", "", `Error! There isn't a staff config setting called **${setting}**`, [], `${message.guild.name}`, bot)
            .then((embed) => message.channel.send(embed))
            .catch((error) => bot.log.post("error", error));
      }
    },
  };