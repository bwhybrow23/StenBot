module.exports = async (bot, emoji) => {
  const Discord = require("discord.js");
  const efunctions = require("../functions/eventUtils.js");

  //Get Config
  let config = await bot.mutils.getGuildById(emoji.guild.id)

  //Check config and stuff
  if (config.logging_enabled == true) {
    if (config.logging_level == "high") {
      if (efunctions.checkChannel(config.logging_channel, bot) == true) {
        let lchannel = bot.channels.cache.get(config.logging_channel);
        let author = await emoji.fetchAuthor();
        bot.createEmbed("warning", "", `**Emoji Created**\n**Name:** ${emoji.name}\n**Identifier:** ${emoji.identifier}\n**Created by:** ${author}`, [], `${channel.guild.name}`, bot)
              .then(embed => lchannel.send(embed))
              .catch(error => console.error(error))
      }
    }
  }
};
