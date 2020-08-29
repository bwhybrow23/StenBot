module.exports = async (bot, emoji) => {
  const Discord = require("discord.js");
  const efunctions = require("../functions/eventUtils.js");

  //Get Config
  let config = efunctions.getConfig(emoji.guild.id);

  //Check config and stuff
  if (config.loggingenabled == true) {
    if (config.logginglevel == "high") {
      if (efunctions.checkChannel(config.loggingchannel, bot) == true) {
        let lchannel = bot.channels.cache.get(config.loggingchannel);
        let author = await emoji.fetchAuthor();
        bot.createEmbed("warning", "", `**Emoji Created**\n**Name:** ${emoji.name}\n**Identifier:** ${emoji.identifier}\n**Created by:** ${author}`, [], `${channel.guild.name}`, bot)
              .then(embed => lchannel.send(embed))
              .catch(error => console.error(error))
      }
    }
  }
};
