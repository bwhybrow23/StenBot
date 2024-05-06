import fs from 'fs';
import { ActivityType } from 'discord-api-types/v10';
const packageJSON = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const botData = JSON.parse(fs.readFileSync('./Data/Global/bot-data.json', 'utf8'));

export default {
  name: 'ready',
  once: true,
  async execute(bot) {

    //Update bot-data.json
    botData.info.botName = bot.user.tag;
    botData.info.botID = bot.user.id;
    botData.stats.totalGuilds = bot.guilds.cache.size;
    botData.stats.totalUsers = bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0);
    fs.writeFileSync('./Data/Global/bot-data.json', JSON.stringify(botData, null, 4), (err) => {
      if (err) return bot.log.post('error', err);
    });

    //Production Mode
    if (bot.settings.mode === 'production') {

      // token = bot.settings.connections.token;

      //Starting Status
      bot.user.setActivity('/help', { type: ActivityType.Watching });
      bot.user.setStatus('online');

      //Changing Status
      let l = 1;
      setInterval(function() {

        //Useful Values
        let totalGuilds = bot.guilds.cache.size;
        let totalUsers = bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0);

        //Status array
        // let statuses = [`/help`, `on ${totalGuilds} servers`, `with ${totalUsers} users`];
        let statuses = [{
          name: '/help',
          type: 'Watching'
        }, {
          name: `on ${totalGuilds} servers!`,
          type: 'Playing'
        }, {
          name: `with ${totalUsers} users!`,
          type: 'Playing'
        }, {
          name: 'wiki.benwhybrow.com',
          type: 'Playing'
        }, {
          name: '/invite',
          type: 'Watching'
        }, {
          name: `on Version ${packageJSON.version}`,
          type: 'Playing'
        }, {
          name: 'with slash commands!',
          type: 'Playing'
        }, {
          name: 'twitch.tv/stentoriantv',
          type: 'Watching'
        }];

        //Pick from array
        let status = statuses[l];

        //Set as presence
        bot.user.setActivity(status.name, { type: ActivityType[status.type] });

        //Incrementation and Reset
        l++;
        if (l === statuses.length) l = 0;

      }, 300000); // 5 MINUTES

      //Console Log
      bot.log.post('success', `${bot.user.username} Started Successfully in Production Mode. Version: ${packageJSON.version}`);
    }

    //Development Mode
    if (bot.settings.mode === 'development') {

      // token = bot.settings.connections.devToken;

      //Status
      let date = new Date();
      bot.user.setActivity('with code!', { type: ActivityType.Playing });
      bot.user.setStatus('dnd');

      //Console Log
      bot.log.post('success', `${bot.user.username} Started Successfully in Development Mode | Date: ${date}`);
    }

    /**
     * 
     * Bot Lists
     * 
     */
    // const dbots = require("dbots");
    // const poster = new dbots.Poster({
    //   clientID: '452053607383302145',
    //   apiKeys: {
    //     botsfordiscord: bot.settings.connections.botslist.bfd,
    //     discordbotlist: bot.settings.connections.botslist.dbl,
    //     topgg: bot.settings.connections.botslist.topgg
    //   }, 
    //   clientLibrary: 'discord.js',
    //   serverCount: async () => bot.guilds.cache.size,
    //   userCount: async () => bot.memberCount,
    //   voiceConnections: async () => 0
    // });

    // // Posting Function
    // let post = () => {
    //   poster.post('botsfordiscord');
    //   poster.post('discordbotlist');
    //   // poster.post('topgg');
    //   return bot.log.post("success", "Voting sites updated with guild and user information");
    // }
    // //Initial post
    // post();

    // setTimeout(() => {
    //   post();
    // }, 1800000); // Every 30 minutes! 

    //Refresh Cache
    // try {
    //   bot.guilds.cache.forEach(async (guild) => {
    //     await guild.members.fetch();
    //   });
    // } catch (e) {
    //   console.log(e);
    // }

  }
};