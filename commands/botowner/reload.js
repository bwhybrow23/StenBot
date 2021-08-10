module.exports = {
    name: "reload",
    category: "botowner",
    description: "Reload the bot.",
    usage: "[TYPE]",
    example: "docker",
    options: { permission: "BOTOWNER", enabled: true, guildOnly: true },
    run: async (bot, message, args) => {
  
      const Discord = require("discord.js");
      const fs = require("fs");
      const cp = require("child_process");
  
      //Permission Check
      if (message.author.id !== bot.settings.ids.botOwner) {
        return;
      };
  
      //Check for Arg
      let command = args[0];
      if (!command || args[0] == "help") {
        return bot.helpEmbed("reload", bot)
          .then((embed) => message.reply(embed))
          .catch((error) => bot.log.post("error", error));
      }
  
      // message.reply("Not working atm")
  
      switch (args[0]) {
        case "normal":
  
          cp.execFile("../../restart.bat");
          process.exit();
  
          break;
  
        case "docker":
  
          cp.exec('docker restart StenBot');
  
          break;
  
        default:
  
          message.reply("not done");
  
          break;
      }
  
    }
  }