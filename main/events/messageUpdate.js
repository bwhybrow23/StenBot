module.exports = async (bot, oldMessage, newMessage) => {
  const Discord = require("discord.js");
  const efunctions = require("../functions/eventUtils.js");
  const checker = require("is-url");

  if ((newMessage.type = "dm")) return;
  let config = efunctions.getConfig(newMessage.guild.id);

  if (config.loggingenabled == true) {
    if (config.logginglevel == "medium" || config.logginglevel == "high") {
      if (efunctions.checkChannel(config.loggingchannel, bot) == true) {
        if (oldMessage.author.bot) return;
        if (
          oldMessage.createdTimestamp === newMessage.createdTimestamp &&
          checker(oldMessage)
        )
          return;
        //AHem
        if (oldMessage.content == newMessage.content) return;
        let lchannel = bot.channels.cache.get(config.loggingchannel);
        lchannel.send({
          embed: {
            color: bot.settings.color.yellow,
            description: `**Message Edited**\n**Before:**\n${oldMessage}\n**After:**\n${newMessage}\n**Sent in:** ${newMessage.channel}`,
            footer: {
              icon_url: newMessage.author.avatarURL,
              text: "Message Edited",
            },
            timestamp: new Date(),
          },
        });
      }
    }
  }
};
