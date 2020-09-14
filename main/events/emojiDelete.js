module.exports = async (bot, emoji) => {
  const Discord = require("discord.js");
  const efunctions = require("../functions/eventUtils.js");

  let config = await bot.mutils.getGuildById(emoji.guild.id)

  if (config.logging_enabled == true) {
    if (config.logging_level == "high") {
      if (efunctions.checkChannel(config.logging_channel, bot) == true) {
        let lchannel = bot.channels.cache.get(config.logging_channel);
        lchannel.send({
          embed: {
            color: bot.settings.color.yellow,
            description: `**Emoji Deleted**\n**Name:** ${emoji.name}\n**Created at:** ${emoji.createdAt}`,
            footer: { icon_url: emoji.url, text: "Emoji Deleted" },
            timestamp: new Date(),
          },
        });
        bot.createEmbed("warning", "", `**Emoji Deleted**\n**Name:** ${emoji.name}\n**Created at:** ${emoji.createdAt}`, [], `${channel.guild.name}`, bot)
              .then(embed => lchannel.send(embed))
              .catch(error => console.error(error))
      }
    }
  }
};
