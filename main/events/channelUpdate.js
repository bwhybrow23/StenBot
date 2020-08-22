module.exports = async (bot, oldChannel, newChannel) => {
  const Discord = require("discord.js");
  const efunctions = require("../functions/eventfunctions.js");

  if ((newChannel.type === "dm")) return;

  //Get Config
  const config = efunctions.getConfig(newChannel.guild.id);

  //Check config and stuff
  if (config.loggingenabled == true) {
    if (config.logginglevel == "high") {
      if (efunctions.checkChannel(config.loggingchannel, bot) == true) {
        let lchannel = bot.channels.cache.get(config.loggingchannel);
        if (oldChannel.name !== newChannel.name) {
          return bot.createEmbed("warning", "", `**Channel Name Updated**\n**Old Name:** ${oldChannel.name}\n**New Name:** ${newChannel.name}\n**Id:** ${newChannel.id}`, [], `${newChannel.guild.name}`, bot)
              .then(embed => lchannel.send(embed))
              .catch(error => console.error(error))
        } else if (oldChannel.topic !== newChannel.topic) {
          return bot.createEmbed("warning", "", `**Channel Topic Updated**\n**Old Name:** ${oldChannel.name}\n**New Name:** ${newChannel.name}\n**Id:** ${newChannel.id}`, [], `${newChannel.guild.name}`, bot)
              .then(embed => lchannel.send(embed))
              .catch(error => console.error(error))
        }
      }
    }
  }
};
