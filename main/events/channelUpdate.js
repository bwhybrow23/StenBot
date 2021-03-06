module.exports = async (bot, oldChannel, newChannel) => {
  const Discord = require("discord.js");
  const efunctions = require("../functions/eventUtils.js");

  if ((newChannel.type == "dm")) return;

  if (newChannel.name.startsWith("ticket-")) return;

  //Get Config
  let config = await bot.mutils.getGuildById(newChannel.guild.id)

  //Check config and stuff
  if (config.logging.enabled == true) {
    if (config.logging.level == "high") {
      if (efunctions.checkChannel(config.logging.channel, bot) == true) {
        let lchannel = bot.channels.cache.get(config.logging.channel);
        if (oldChannel.name !== newChannel.name) {
          bot.eventEmbed("006187", "None", "Channel Name Updated", `**Old Name:** ${oldChannel.name}\n**New Name:** ${newChannel.name}\n**Id:** ${newChannel.id}`, [], `${newChannel.guild.name}`, bot)
            .then(embed => lchannel.send(embed))
            .catch(error => console.error(error))
        } else if (oldChannel.topic !== newChannel.topic) {
          bot.eventEmbed("006187", "None", "Channel Topic Updated", `**Old Name:** ${oldChannel.name}\n**New Name:** ${newChannel.name}\n**Id:** ${newChannel.id}`, [], `${newChannel.guild.name}`, bot)
            .then(embed => lchannel.send(embed))
            .catch(error => console.error(error))
        }
      }
    }
  }
};