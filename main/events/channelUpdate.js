module.exports = async (bot, oldChannel, newChannel) => {
  const Discord = require("discord.js");
  const efunctions = require("../functions/eventfunctions.js");

  if ((newChannel.type = "dm")) return;
  const config = efunctions.getConfig(newChannel.guild.id);

  if (config.loggingenabled == true) {
    if (config.logginglevel == "high") {
      if (efunctions.checkChannel(config.loggingchannel, bot)) {
        let lchannel = bot.channels.get(config.loggingchannel);
        if (oldChannel.name !== newChannel.name) {
          lchannel.send({
            embed: {
              color: bot.settings.color.yellow,
              description: `**Channel Name Changed**\n**Before:** ${oldChannel.name}\n**After:** ${newChannel.name}\n**ID:** ${newChannel.id}`,
              footer: { text: "Channel name changed" },
              timestamp: new Date(),
            },
          });
        } else if (oldChannel.topic !== newChannel.topic) {
          lchannel.send({
            embed: {
              color: bot.settings.color.yellow,
              description: `**Channel Topic Changed**\n**Before:** ${oldChannel.topic}\n**After:** ${newChannel.topic}\n**ID:** ${newChannel.id}`,
              footer: { text: "Channel Topic Changed" },
              timestamp: new Date(),
            },
          });
        }
      }
    }
  }
};
