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
        bot.eventEmbed("7ae727", author, "Emoji Created", `**Name:** ${emoji.name}\n**Identifier:** ${emoji.identifier}`, [], `${emoji.guild.name}`, bot)
              .then(embed => lchannel.send(embed))
              .catch(error => console.error(error))
      }
    }
  }
};
