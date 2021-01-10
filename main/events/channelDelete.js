module.exports = async (bot, channel) => {
  const Discord = require("discord.js");
  const efunctions = require("../functions/eventUtils.js");

  if ((channel.type === "dm"));

  if (channel.name.startsWith("ticket-")) return;

  //Get Config
  let config = await bot.mutils.getGuildById(channel.guild.id)

  //Check config and send message
  if (config.logging_enabled == true) {
    //remove channel from ignored list if it's on there
    if (config.logging_ignore.includes(channel.id)) {
      let index = config.logging_ignore.indexOf(channel.id);
      config.logging_ignore.splice(index, 1);
      bot.mutils.updateGuildById(channel.guild.id, {
        logging_ignore: config.logging_ignore
      });
    }
    if (config.logging_level == "low" || config.logging_level == "medium" || config.logging_level == "high") {
      if (efunctions.checkChannel(config.logging_channel, bot) == true) {
        let lchannel = bot.channels.cache.get(config.logging_channel);
        bot.eventEmbed("c70011", "None", "Channel Deleted", `**Name:** ${channel.name}\n**Id:** ${channel.id}`, [], `${channel.guild.name}`, bot)
          .then(embed => lchannel.send(embed))
          .catch(error => console.error(error))
      }
    }
  }
};