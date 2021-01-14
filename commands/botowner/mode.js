module.exports = {
  name: "mode",
  category: "botowner",
  description: "Switch the bot between various modes.",
  usage: "<MODE>",
  example: "production",
  options: { permission: "BOTOWNER", enabled: true, guildOnly: true },
  run: async (bot, message, args) => {

    const Discord = require("discord.js");
    const fs = require("fs");

    //Permission Check
    if (message.author.id !== bot.settings.ids.botOwner) {
      return;
    };

    //Check for Arg
    let newMode = args[0];
    if (!newMode || args[0] == "help") {
      return bot.helpEmbed("mode", bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }

    let date = new Date();

    //Subcommand Stuff
    if (newMode == "production" || newMode == "development") {
      switch (newMode) {
        //Production
        case "production":
          //Check if bot is already in Production mode
          if (bot.settings.mode == "production") {
            return message.channel.send("The bot is already in that mode.");
          }
          //Change Setting
          bot.settings.mode = "production";
          fs.writeFileSync(`./main/settings.json`, JSON.stringify(bot.settings, null, 4), (err) => {
            if (err) return bot.log.post("error", err);
          });
          //Change Status
          let guilds = bot.guilds.cache.size;
          bot.user.setPresence({
            activity: {
              name: `sb!help on ${guilds} servers!`,
              type: `WATCHING`
            },
            status: 'online'
          });
          //Console Log
          bot.log.post("info", `StenBot has been converted to Production Mode. Running version: ${bot.packageJSON.version} | Changed at ${date}`);
          //Reply Message
          bot.createEmbed("success", "", `Bot Mode has been Sucessfully Updated to **Production**.`, [], `${message.guild.name}`, bot)
            .then((embed) => message.channel.send(embed))
            .catch((error) => bot.log.post("error", error));

          break;

          //Development
        case "development":
          //Check if bot is already in Development mode
          if (bot.settings.mode == "development") {
            return message.channel.send("The bot is already in that mode.");
          }

          //Change Setting
          bot.settings.mode = "development";
          fs.writeFileSync(`./main/settings.json`, JSON.stringify(bot.settings, null, 4), (err) => {
            if (err) return bot.log.post("error", err);
          });

          //Change Status
          bot.user.setPresence({
            activity: {
              name: `In Development Mode`,
              type: `PLAYING`
            },
            status: 'dnd'
          });

          //Console Log
          bot.log.post("info", `StenBot has been converted to Development Mode. | Changed at ${date}`);

          //Reply Message
          bot.createEmbed("success", "", `Bot Mode has been Sucessfully Updated to **Development**.`, [], `${message.guild.name}`, bot)
            .then((embed) => message.channel.send(embed))
            .catch((error) => bot.log.post("error", error));

          break;

        default:
          if (newMode == undefined) {
            bot.createEmbed("error", "", `Error! You haven't included a new mode for the bot to be switched to.`, [], `${message.guild.name}`, bot)
              .then((embed) => message.channel.send(embed))
              .catch((error) => bot.log.post("error", error));
          }
          break;
      }
    }
  },
};