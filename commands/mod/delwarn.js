module.exports = {
  name: "delwarn",
  category: "mod",
  description: "Clear a specific warning from a user",
  usage: "<@USER> <WARNING ID>",
  example: "@Mel#4012 2",
  options: { permission: "STAFF", enabled: true, cooldown: 0, guildOnly: true },
  run: async (bot, message, args) => {
    
    const Discord = require("discord.js");
    
    //Perm Check
    if (!message.member.permissions.has("MANAGE_MESSAGES")) {
      return bot.noPermsEmbed(`${message.guild.name}`, bot);
    };
    
    //Args Check
    var targetuser = message.mentions.members.first();
    if (!targetuser || args[0] == "help") {
      return bot.helpEmbed("delwarn", bot)
        .then((embed) => message.reply(embed))
        .catch((error) => bot.log.post("error", error));
    };
    
    //Fetch warnings
    let warnings;
    await bot.punishments.fetch(message.guild.id, targetuser.id)
    .then((punishments) => {
      warnings = punishments.warns;
    })
    
    //If no warnings
    if (Object.keys(warnings).length < 0) {
      return bot.createEmbed("error", "", "Error! This user has no warnings.", [], `${message.guild.name}`, message)
        .then((embed) => message.reply(embed))
        .catch((error) => bot.log.post("error", error));
    }

    //More args check
    let removedID = parseInt(args[1]);
    if(removedID === NaN) {
      return bot.createEmbed("error", "", "Error! The ID you have provided isn't a valid number.", [], `${message.guild.name}`, message)
        .then((embed) => message.reply(embed))
        .catch((error) => bot.logg.post("error", error));
    }

    if (!warnings[removedID - 1]) {
      return bot.createEmbed("error", "", "Error! The ID you have provided doesn't exist as a warning on this user.", [], `${message.guild.name}`, message)
        .then((embed) => message.reply(embed))
        .catch((error) => bot.log.post("error", error));
    }

    //Remove ID from config
    await bot.punishments.removeSync("warn", removedID - 1, message.guild.id)
    .then(() => {

    //Post success embed to user
    bot.createEmbed("success", "", `Successfully removed warning ID ${removedID} from **${targetuser.user.tag}**. They now have ${Object.keys(warnings).length} warnings.`, [], `${message.guild.name}`, message)
    .then((embed) => message.reply(embed))
    .catch((error) => bot.log.post("error", error));

    //Logging
    if (config.logging.enabled == true) {
      if (bot.efunctions.checkChannel(config.logging.channel, bot) == true) {
        let lchannel = bot.channels.cache.get(config.logging.channel);
        bot.eventEmbed("c70011", targetuser.user, "Warning Removed", `**User tag:** ${targetuser.user.tag}\n**User ID:** ${targetuser.user.id}\n**Warning ID:** ${removedID}\n\n**Removed on:** ${new Date()}\n**Removed by:** ${message.author.tag}`, [], `${message.guild.name}`, bot)
          .then(embed => lchannel.send(embed))
          .catch(error => bot.log.post("error", error))
      }
    };

    })


  },
}