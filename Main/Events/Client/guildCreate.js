import * as fs from 'fs';
import Punishment from '../../Models/punishment.js';
import defaultConfig from '../../../Data/Global/defaultConfig.js';

const botData = JSON.parse(fs.readFileSync('./Data/Global/bot-data.json', 'utf8'));

export default {
  name: 'guildCreate',
  once: false,
  async execute(bot, guild) {

    let gOwner = await guild.fetchOwner();

    //When bot joins new server, create that servers file system.
    //Check if a server config exists
    let serverstats = await bot.mutils.getGuildById(guild.id);

    //If no server config exists, create one.
    if (!serverstats) {
      bot.log.post('info', `Joined guild ${guild.name} | ${guild.id}`);

      /**
       * 
       * MONGO STORAGE 
       * 
       */
      defaultConfig.info.id = guild.id;
      defaultConfig.info.name = guild.name;
      defaultConfig.info.owner_id = guild.ownerId;
      await bot.mutils.createGuild(defaultConfig);

    } else {
      //If server config exists, check if server is blacklisted
      if (serverstats.info.blacklisted === true) {
        bot.createEmbed('error', '', `I'm afraid that StenBot cannot join your server **${guild.name}** as your server is blacklisted from the bot. If you believe this is an error, please contact **Stentorian#6969** or join the **[Discord](https://discord.benwhybrow.com)**.`, [], `${guild.name}`, bot)
          .then(embed => gOwner.send(embed))
          .catch(error => bot.log.post('error', error));
        //Leave the server
        guild.leave();
        return bot.log.post('info', `Left guild: ${guild.name} | ${guild.id} because this server was blacklisted!`);
      }
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
    botData.stats.totalGuilds = bot.guilds.cache.size;
    botData.stats.totalUsers = bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0);
    fs.writeFileSync('./Data/Global/bot-data.json', JSON.stringify(botData, null, 4), (err) => {
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
    let date = new Date();
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
        'timestamp': date.toISOString(),
        'fields': [{
          name: 'Server Name',
          value: guild.name,
          inline: true
        },
        {
          name: 'Server Owner',
          value: `${gOwner.user.tag} || ${gOwner.id}`,
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