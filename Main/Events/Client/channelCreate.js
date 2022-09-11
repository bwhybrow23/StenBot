module.exports = {
  name: 'channelCreate',
  once: false,
  async execute(bot, channel) {

    if ((channel.type === 'DM')) return;

    let muteRole = channel.guild.roles.cache.find(r => r.name === 'Muted');
    if (!muteRole) {
      try {
        muteRole = await channel.guild.roles.create({
          name: 'Muted',
          color: '#000000',
          permissions: [],
          reason: 'StenBot Muted Role'
        });
        channel.guild.channels.cache.forEach(async (channel) => {
          await channel.permissionOverwrites.create(muteRole, {
            SendMessages: false,
            Add_Reactions: false
          });
        });
      } catch (e) {
        bot.log.post('error', e);
      }
    }

    if (channel.name.startsWith('ticket-')) return;

    //Get Config
    let config = await bot.mutils.getGuildById(channel.guild.id);
    if (!config) return;

    //Check config and send message
    if (config.logging.enabled === true) {
      if (config.logging.level === 'low' || config.logging.level === 'medium' || config.logging.level === 'high') {
        if (bot.efunctions.checkChannel(config.logging.channel, bot) === true) {
          let lchannel = bot.channels.cache.get(config.logging.channel);
          bot.eventEmbed('7ae727', 'None', 'Channel Created', `**Name:** ${channel.name}\n**Id:** ${channel.id}`, [], `${channel.guild.name}`, bot)
            .then(embed => lchannel.send(embed))
            .catch(error => bot.log.post('error', error));
        }
      }
    }
  }
};