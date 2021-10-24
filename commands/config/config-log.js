module.exports = {
    name: "config-log",
    category: "config",
    description: "Change all config variables related to logging.",
    usage: "<SUBCOMMAND>",
    example: "enable",
    options: { permission: "ADMIN", aliases: ["c-log"], enabled: true, guildOnly: true },
    run: async (bot, message, args) => {
  
      const Discord = require("discord.js");
  
      if (message.member.permissions.has("ADMINISTRATOR") === false) {
        return bot.noPermsEmbed(`${message.guild.name}`, bot)
          .then((embed) => message.reply(embed))
          .catch((error) => bot.log.post("error", error));
      }
  
      //Check if they included a setting
      let setting = args[0];
  
      if (!setting) {
        bot.createEmbed("error", "", `Error! You forgot to include a log setting.`, [], `${message.guild.name}`, message)
          .then((embed) => message.reply(embed))
          .catch((error) => bot.log.post("error", error));
      }
  
      //Get the server config
      let config = await bot.mutils.getGuildById(message.guild.id);

      let targetchannel;
  
      //Settings library
      switch (setting) {
        case "channel":

          targetchannel = message.mentions.channels.first();
  
          if (!targetchannel || targetchannel === "None") {
            config.logging.channel = "0";
            bot.mutils.updateGuildById(message.guild.id, config)
            return bot.createEmbed("success", "", `Your logging channel has been removed`, [], `${message.guild.name}`, message)
              .then((embed) => message.reply(embed))
              .catch((error) => bot.log.post("error", error));
          }
  
          if (targetchannel.id === config.logging.channel) {
            return bot.createEmbed("error", "", `Error! That channel is already set as the log channel.`, [], `${message.guild.name}`, message)
              .then((embed) => message.reply(embed))
              .catch((error) => bot.log.post("error", error));
          }
  
          config.logging.channel = targetchannel.id;
          bot.mutils.updateGuildById(message.guild.id, config)
          bot.createEmbed("success", "", `Your logging channel has been set to **${targetchannel.name}**`, [], `${message.guild.name}`, message)
            .then((embed) => message.reply(embed))
            .catch((error) => bot.log.post("error", error));
  
          break;
        case "level":
          var level = args[1];
          if (!level) {
            return bot.createEmbed("error", "", `Error! You didn't mention a logging level. Choose between low, medium or high. For more information, check out the [documentation](https://docs.benwhybrow.com).`, [], `${message.guild.name}`, message)
              .then((embed) => message.reply(embed))
              .catch((error) => bot.log.post("error", error));
          }
  
          switch (level) {
            case "low":
              if (config.logging.level === "low") {
                return bot.createEmbed("error", "", `Error! Logging is already set to that level.`, [], `${message.guild.name}`, message)
                  .then((embed) => message.reply(embed))
                  .catch((error) => bot.log.post("error", error));
              }
  
              config.logging.level = "low";
              bot.mutils.updateGuildById(message.guild.id, config)
              bot.createEmbed("success", "", `Logging level has been set to **LOW**.`, [], `${message.guild.name}`, message)
                .then((embed) => message.reply(embed))
                .catch((error) => bot.log.post("error", error));
              break;

            case "medium":
              if (config.logging.level === "medium") {
                return bot.createEmbed("error", "", `Error! Logging is already set to that level.`, [], `${message.guild.name}`, message)
                  .then((embed) => message.reply(embed))
                  .catch((error) => bot.log.post("error", error));
              }
  
              config.logging.level = "medium";
              bot.mutils.updateGuildById(message.guild.id, config);
              bot.createEmbed("success", "", `Logging level has been set to **MEDIUM**.`, [], `${message.guild.name}`, message)
                .then((embed) => message.reply(embed))
                .catch((error) => bot.log.post("error", error));
              break;

            case "high":
              if (config.logging.level === "high") {
                return bot.createEmbed("error", "", `Error! Logging is already set to that level.`, [], `${message.guild.name}`, message)
                  .then((embed) => message.reply(embed))
                  .catch((error) => bot.log.post("error", error));
              }
  
              config.logging.level = "high"
              bot.mutils.updateGuildById(message.guild.id, config)
              bot.createEmbed("success", "", `Logging level has been set to **HIGH**.`, [], `${message.guild.name}`, message)
                .then((embed) => message.reply(embed))
                .catch((error) => bot.log.post("error", error));
              break;

            default:
              return bot.createEmbed("error", "", `Error! There is no logging level called that.`, [], `${message.guild.name}`, message)
                .then((embed) => message.reply(embed))
                .catch((error) => bot.log.post("error", error));
          }
          break;

        case "enable":
          if (config.logging.enabled === true) {
            return bot.createEmbed("error", "", `Error! Logging is already enabled.`, [], `${message.guild.name}`, message)
              .then((embed) => message.reply(embed))
              .catch((error) => bot.log.post("error", error));
          }
  
          config.logging.enabled = true;
          bot.mutils.updateGuildById(message.guild.id, config);
          bot.createEmbed("success", "", `Logging is now enabled.`, [], `${message.guild.name}`, message)
            .then((embed) => message.reply(embed))
            .catch((error) => bot.log.post("error", error));
          break;
  
        case "disable":
          if (config.logging.enabled === false) {
            bot.createEmbed("error", "", `Error! Logging is already disabled`, [], `${message.guild.name}`, message)
              .then((embed) => message.reply(embed))
              .catch((error) => bot.log.post("error", error));
          }
  
          config.logging.enabled = true;
          bot.mutils.updateGuildById(message.guild.id, config)
          bot.createEmbed("success", "", `Logging is now disabled.`, [], `${message.guild.name}`, message)
            .then((embed) => message.reply(embed))
            .catch((error) => bot.log.post("error", error));
          
          break;
  
        case "ignore":
  
          let option = args[1];
          switch (option) {
  
            case "add":
  
              targetchannel = message.mentions.channels.first();
              if (!targetchannel) {
                return bot.createEmbed("error", "", `Error! You didn't mention a channel.`, [], `${message.guild.name}`, message)
                  .then((embed) => message.reply(embed))
                  .catch((error) => bot.log.post("error", error));
              }
  
              if (config.logging.ignore.includes(targetchannel.id)) {
                return bot.createEmbed("error", "", `Error! This channel is already in the ignored list.`, [], `${message.guild.name}`, message)
                  .then((embed) => message.reply(embed))
                  .catch((error) => bot.log.post("error", error));
              }
  
              config.logging.ignore.push(targetchannel.id)
              bot.mutils.updateGuildById(message.guild.id, config);
              bot.createEmbed("success", "", `The channel <#${targetchannel.id}> has been successfully added to the logging ignore list!`, [], `${message.guild.name}`, message)
                .then((embed) => message.reply(embed))
                .catch((error) => bot.log.post("error", error));
  
              break;
  
            case "remove":
  
              targetchannel = message.mentions.channels.first();
              if (targetchannel === undefined) {
                return bot.createEmbed("error", "", `Error! You didn't mention a channel.`, [], `${message.guild.name}`, message)
                  .then((embed) => message.reply(embed))
                  .catch((error) => bot.log.post("error", error));
              }
  
              if (!config.logging.ignore.includes(targetchannel.id)) {
                return bot.createEmbed("error", "", `Error! This channel is currently not in the ignored list.`, [], `${message.guild.name}`, message)
                  .then((embed) => message.reply(embed))
                  .catch((error) => bot.log.post("error", error));
              }
  
              let index = config.logging.ignore.indexOf(targetchannel.id);
  
              config.logging.ignore.splice(index, 1)
              bot.mutils.updateGuildById(message.guild.id, config);
              bot.createEmbed("success", "", `The channel <#${targetchannel.id}> has been successfully removed from the logging ignore list!`, [], `${message.guild.name}`, message)
                .then((embed) => message.reply(embed))
                .catch((error) => bot.log.post("error", error));
  
              break;
  
            case "clear":
  
              config.logging.ignore = [];
              bot.mutils.updateGuildById(message.guild.id, config);
              bot.createEmbed("success", "", `The logging ignore list has been succesfully cleared.`, [], `${message.guild.name}`, message)
                .then((embed) => message.reply(embed))
                .catch((error) => bot.log.post("error", error));
  
              break;
  
            default:
              bot.createEmbed("error", "", `Error! No valid option given. Please specify whether you would like to add, remove or clear ignored channels.`, [], `${message.guild.name}`, message)
                .then((embed) => message.reply(embed))
                .catch((error) => bot.log.post("error", error));
  
          }
  
          break;
  
        default:
          bot.createEmbed("error", "", `Error! No log setting called **${setting}**`, [], `${message.guild.name}`, message)
            .then((embed) => message.reply(embed))
            .catch((error) => bot.log.post("error", error));
      }
    },
  };