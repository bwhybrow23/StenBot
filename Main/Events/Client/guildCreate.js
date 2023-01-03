module.exports = {
  name: 'guildCreate',
  once: false,
  async execute(bot, guild) {

    const fs = require('fs');
    const Punishment = require('../../Models/punishment.js');

    let gOwner = await guild.fetchOwner();

    //When bot joins new server, create that servers file system.
    //Check if the server is blacklisted
    var serverstats;
    try {
      serverstats = bot.mutils.getGuildById(guild.id);
    } catch (err) {
      bot.log.post('error', err);
    }

    //Leave the guild if its blacklisted
    if (serverstats) {
      if (serverstats.info.blacklisted === true) {
        bot.createEmbed('error', '', `I'm afraid that StenBot cannot join your server **${guild.name}** as your server is blacklisted from the bot. If you believe this is an error, please contact **Stentorian#6969** or join the **[Discord](https://discord.benwhybrow.com)**.`, [], `${guild.name}`, bot)
          .then(embed => gOwner.send(embed))
          .catch(error => bot.log.post('error', error));
        guild.leave();
        return bot.log.post('info', `Left guild: ${guild.name} | ${guild.id} because this server was blacklisted!`);
      }
    } else {

      bot.log.post('info', `Joined guild ${guild.name} | ${guild.id}`);

      /**
       * 
       * MONGO STORAGE 
       * 
       */
      let { defaultConfig } = require('../../../Data/Global/defaultConfig.js');
      defaultConfig.info.id = guild.id;
      defaultConfig.info.name = guild.name;
      defaultConfig.info.owner_id = guild.ownerId;
      await bot.mutils.createGuild(defaultConfig);
    }

    if (!Punishment.findOne({ guildId: guild.id })) {
      //Punishment Config Create
      await new Punishment({
        guildId: guild.id,
        bans: [],
        kicks: [],
        mutes: [],
        tempmutes: [],
        warns: []
      });

    }

    //Update bot-data.json
    let botdata = require('../../../Data/Global/bot-data.json');
    botdata.stats.totalGuilds = bot.guilds.cache.size;
    botdata.stats.totalUsers = bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0);
    fs.writeFileSync('./Data/Global/bot-data.json', JSON.stringify(botdata, null, 4), (err) => {
      if (err) return bot.log.post('error', err);
    });

    //Refresh cache
    try {
      guild.members.fetch();
    } catch (e) {
      console.log(e);
    }

    //StenBot Server Updates
    let totalGuilds = bot.guilds.cache.size;
    let totalUsers = bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0);
    await bot.channels.cache.get('839509992041218049').send({
      embeds: [{
        'title': 'Joined Guild!',
        'thumbnail': {
          'url': guild.iconURL()
        },
        'footer': {
          'icon_url': 'https://i.imgur.com/klY5xCe.png',
          'text': guild.id
        },
        'color': 982784,
        'timestamp': Date.now(),
        'fields': [{
          name: 'Server Name',
          value: guild.name,
          inline: true
        },
        {
          name: 'Server Owner',
          value: `${gOwner.tag} || ${gOwner.id}`,
          inline: true
        },
        {
          name: 'Member Count',
          value: `${guild.memberCount}`,
          inline: false
        },
        {
          name: 'New Guild Count',
          value: `${totalGuilds}`,
          inline: true
        },
        {
          name: 'New Member Count',
          value: `${totalUsers}`,
          inline: true
        }
        ]
      }]
    });

  }
};