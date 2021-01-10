module.exports = {
    name: "blacklist",
    category: "botowner",
    description: "Blacklist a server or user from using StenBot.",
    usage: "<SERVER|USER> <SERVER ID|@USER> <REASON>",
    example: "user @Dave#1230 Abuse",
    permission: "BOT OWNER",
    enabled: true,
    run: async (bot, message, args) => {
  
      const Discord = require("discord.js");
      if (!message.guild) return;
  
      //Permission Check
      if (message.author.id !== bot.settings.ids.botOwner) {
        return;
      };
  
      var subcommand = args[0];
  
      switch (subcommand) {
        case "server":
          var targetserver = args[1];
  
          if (targetserver === '455782308293771264') {
            return bot.createEmbed("error", "", `Error! You do not have permission to blacklist the bot's main guild.`, [], `${message.guild.name}`, bot)
              .then((embed) => message.channel.send(embed))
              .catch((error) => bot.log.post("error", error));
          }
  
          var reason = args[2].join(" ");
          if (!reason) {
            reason = "N/A"
          }
  
          //Attempt to read the server's config
          try {
            var targetserverfile = await bot.mutils.getGuildById(message.guild.id);
          } catch (err) {
            return bot.createEmbed("error", "", `Error! I cannot find the server for the ID you provided.`, [], `${message.guild.name}`, bot)
              .then((embed) => message.channel.send(embed))
              .catch((error) => bot.log.post("error", error));
          }
  
          //Get the target guilds guild object
          const targetguild = bot.guilds.cache.get(targetserver);
  
          //Blacklist server
          await bot.mutils.updateGuildById(targetserverfile, {
            blacklisted: true
          }).then(async () => {
  
            //Black list success message
            await bot.createEmbed("success", "", `Success!\nServer: **${targetguild.name} | ${targetguild.id}** has been blacklisted.`, [], `${message.guild.name}`, bot)
              .then((embed) => message.channel.send(embed))
              .catch((error) => bot.log.post("error", error));
  
            //Log message
            await bot.createEmbed("warning", "", `Server **${targetguild.name} | ${targetguild.id}** has been blacklisted by **${message.author.tag}** with the reason of **${reason}**`, [], `${message.guild.name}`, bot)
              .then((embed) => bot.guilds.cache.get("455782308293771264").channels.cache.get("565273737201713153").send(embed))
              .catch((error) => bot.log.post("error", error));
  
            //DM Guild Owner
            await bot.createEmbed("error", "", `I'm afraid that your server **${targetguild.name}** has been blacklisted from StenBot for the reason **${reason}**. If you believe this is an error, please contact **Stentorian#9524** or join the **[Discord](https://discord.benwhybrow.com)**.`, [], `${message.guild.name}`, bot)
              .then((embed) => targetguild.owner.send(embed))
              .catch((error) => bot.log.post("error", error));
  
            //Leave the blacklisted guild
            targetguild.leave();
          });
  
          break;
  
        case "user":
  
          //Get user and reason and check them
          var targetuser = message.mentions.members.first();
          if (!targetuser) {
            return bot.helpEmbed("blacklist", bot)
              .then((embed) => message.channel.send(embed))
              .catch((error) => bot.log.post("error", error));
          }
          var reason = args.slice(2).join(" ");
          if (!reason) {
            reason = "N/A";
          }
  
          //Check if Sten
          if (targetuser === "346246641595973633") return message.reply("You can't blacklist Sten, you dumbass.");
  
          //Modify database
          await bot.mutils.blacklistUser({
            user_id: targetuser.id,
            reason: reason,
            blacklisted: true
          }).then(async () => {
            //Black list success message
            await bot.createEmbed("success", "", `Success!\nUser: **${targetuser.user.tag} | ${targetuser.id}** has been blacklisted.`, [], `${message.guild.name}`, bot)
              .then((embed) => message.channel.send(embed))
              .catch((error) => bot.log.post("error", error));
  
            //Log message
            await bot.createEmbed("warning", "", `User **${targetuser.user.tag} | ${targetuser.id}** has been blacklisted by **${message.author.tag}** with the reason of **${reason}**`, [], `${message.guild.name}`, bot)
              .then((embed) => bot.guilds.cache.get("455782308293771264").channels.cache.get("565273737201713153").send(embed))
              .catch((error) => bot.log.post("error", error));
  
            //DM Guild Owner
            await bot.createEmbed("error", "", `I'm afraid that you have been blacklisted from using StenBot for the reason **${reason}**. If you believe this is an error, please contact **Stentorian#9524** or join the **[Discord](https://discord.benwhybrow.com)**.`, [], `${message.guild.name}`, bot)
              .then((embed) => targetuser.send(embed))
              .catch((error) => bot.log.post("error", error));
          });
  
  
          break;
  
        default:
  
          message.reply("Provide arguments.");
  
          break;
      }
  
  
    }
  };