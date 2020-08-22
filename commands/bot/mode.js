module.exports = {
  name: "mode",
  category: "bot",
  description: "Switch the bot between various modes.",
  usage: "sb!mode <MODE>",
  permission: "BOT OWNER",
  run: async (bot, message, args) => {
    const Discord = require("discord.js");
    const fs = require("fs");

    //Perm Checker
    const ownersid = message.guild.ownerID;
    if (message.author.id != ownersid) {
      return bot.noPermsEmbed(`${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => console.error(error));
    }

    //Check for Arg
    let newMode = args[0];

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
          fs.writeFileSync(`./main/settings.json`, JSON.stringify(bot.settings, null, 4), (err) => { if (err) return console.log("[SYSTEM]".grey + err); });
          //Change Status
          let guilds = bot.guilds.cache.size;
          bot.user.setPresence({ activity: { name: `sb!help on ${guilds} servers!`, type: `WATCHING` }, status: 'online' });
          //Console Log
          console.log("[SYSTEM]".grey, `StenBot has been converted to Production Mode. Running version: ${bot.settings.version} | Changed at ${date}`.green);
          //Reply Message
          bot.createEmbed("success", "", `Bot Mode has been Sucessfully Updated to **Production**.`, [], `${message.guild.name}`, bot)
            .then((embed) => message.channel.send(embed))
            .catch((error) => console.error(error));

          break;

        //Development
        case "development":
          //Check if bot is already in Development mode
          if (bot.settings.mode == "development") {
            return message.channel.send("The bot is already in that mode.");
          }

          //Change Setting
          bot.settings.mode = "development";
          fs.writeFileSync(`./main/settings.json`, JSON.stringify(bot.settings, null, 4), (err) => { if (err) return console.log("[SYSTEM]".grey + err); });
          
          //Change Status
          bot.user.setPresence({ activity: { name: `In Development Mode`, type: `PLAYING` }, status: 'dnd' });

          //Console Log
          console.log("[SYSTEM]".grey, `StenBot has been converted to Development Mode. | Changed at ${date}`.green);
          
          //Reply Message
          bot.createEmbed("success", "", `Bot Mode has been Sucessfully Updated to **Development**.`, [], `${message.guild.name}`, bot)
            .then((embed) => message.channel.send(embed))
            .catch((error) => console.error(error));

          break;

        default:
          if (newMode == undefined) {
            bot.createEmbed("error", "", `Error! You haven't included a new mode for the bot to be switched to.`, [], `${message.guild.name}`, bot)
              .then((embed) => message.channel.send(embed))
              .catch((error) => console.error(error));
          }
          break;
      }
    }
  },
};
