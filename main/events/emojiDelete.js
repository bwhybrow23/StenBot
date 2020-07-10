module.exports = async (bot, emoji) => {
  const Discord = require("discord.js");
  const efunctions = require("../functions/eventfunctions.js");

  let config = efunctions.getConfig(emoji.guild.id);
  if (config.loggingenabled == true) {
    if (config.logginglevel == "high") {
      if (efunctions.checkChannel(config.loggingchannel, bot) == true) {
        let lchannel = bot.channels.get(config.loggingchannel);
        lchannel.send({
          embed: {
            color: bot.settings.color.yellow,
            description: `**Emoji Deleted**\n**Name:** ${emoji.name}\n**Created at:** ${emoji.createdAt}`,
            footer: { icon_url: emoji.url, text: "Emoji Deleted" },
            timestamp: new Date(),
          },
        });
      }
    }
  }
};
