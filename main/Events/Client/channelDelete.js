module.exports = {
  name: "channelDelete",
  once: false,
  async execute(bot, channel) {

  if ((channel.type === "DM"));

  if (channel.name.startsWith("ticket-")) return;

  //Get Config
  let config = await bot.mutils.getGuildById(channel.guild.id);
  if(!config) return;

  //Check config and send message
  if (config.logging.enabled === true) {
    //remove channel from ignored list if it's on there
    if (config.logging.ignore.includes(channel.id)) {
      let index = config.logging.ignore.indexOf(channel.id);
      config.logging.ignore.splice(index, 1);
      bot.mutils.updateGuildById(channel.guild.id, {
        logging: {
          ignore: config.logging.ignore
        }
      });
    }

    //Log
    if (config.logging.level === "low" || config.logging.level === "medium" || config.logging.level === "high") {
      if (bot.efunctions.checkChannel(config.logging.channel, bot) === true) {
        let lchannel = bot.channels.cache.get(config.logging.channel);
        bot.eventEmbed("c70011", "None", "Channel Deleted", `**Name:** ${channel.name}\n**Id:** ${channel.id}`, [], `${channel.guild.name}`, bot)
          .then(embed => lchannel.send(embed))
          .catch(error => bot.log.post("error", error));
      }
    }
  }
}};