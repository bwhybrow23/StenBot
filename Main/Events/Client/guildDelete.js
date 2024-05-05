import * as fs from 'fs';
const botData = JSON.parse(fs.readFileSync('./Data/Global/bot-data.json', 'utf8'));

export default {
  name: 'guildDelete',
  once: false,
  async execute(bot, guild) {

    bot.log.post('info', `Left guild ${guild.name} | ${guild.id}`);

    //Update bot-data.json
    botData.stats.totalGuilds = bot.guilds.cache.size;
    botData.stats.totalUsers = bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0);
    fs.writeFileSync('./Data/Global/bot-data.json', JSON.stringify(botData, null, 4), (err) => {
      if (err) return bot.log.post('error', err);
    });

    //StenBot Server Updates
    let totalGuilds = bot.guilds.cache.size;
    let totalUsers = bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0);

    //If no guild name (most likely deleted), return empty
    if (!guild.name) return;

    let gOwner;
    try {
      gOwner = await guild.fetchOwner();
    } catch (error) {
      gOwner = { user: { tag: 'N/A' } };
    }

    let date = new Date();
    await bot.channels.cache.get('839509992041218049').send({
      embeds: [{
        'title': 'Left Guild!',
        'thumbnail': {
          'url': guild.iconURL()
        },
        'footer': {
          'icon_url': 'https://i.imgur.com/klY5xCe.png',
          'text': guild.id
        },
        'color': 16711680,
        'timestamp': date.toISOString(),
        'fields': [{
          name: 'Server Name',
          value: guild.name,
          inline: true
        },
        {
          name: 'Server Owner',
          value: `${gOwner.user.tag} || ${guild.ownerId}`,
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