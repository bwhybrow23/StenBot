module.exports = {
    name: "achievement",
    category: "fun",
    description: "Create your own Minecraft achievement",
    usage: "<MESSAGE>",
    example: "Being a successful failure!",
    options: { permission: "EVERYONE", enabled: true, cooldown: 5, guildOnly: false },
    run: async (bot, message, args) => {
  
      const Discord = require("discord.js");
      const achievement = args.join(" ");
  
      if (!achievement || args[0] === "help") {
        return bot.helpEmbed("achievement", bot)
          .then((embed) => message.reply(embed))
          .catch((error) => bot.log.post("error", error));
      }

      let string = 'https://minecraftskinstealer.com/achievement/13/Achievement%20unlocked/' + achievement;
      let attachment = new Discord.MessageAttachment(string, 'achievement.png');

      message.reply({ files: [ attachment ] });
  
    },
  };