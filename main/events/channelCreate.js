module.exports = async (bot, channel) => {
  const Discord = require("discord.js");
  const efunctions = require("../functions/eventfunctions.js");

  if ((channel.type === "dm")) return;

  //Get Config
  let config = efunctions.getConfig(channel.guild.id);

  //Check config and send message
  if (config.loggingenabled == true) {
    if (config.logginglevel == "low" || config.logginglevel == "medium" || config.logginglevel == "high") {
      if (efunctions.checkChannel(config.loggingchannel, bot) == true) {
        let lchannel = bot.channels.cache.get(config.loggingchannel);
        bot.createEmbed("warning", "", `**Channel Created**\n**Name:** ${channel.name}\n**Id:** ${channel.id}`, [], `${channel.guild.name}`, bot)
              .then(embed => lchannel.send(embed))
              .catch(error => console.error(error))
      }
    } 
  }
};
