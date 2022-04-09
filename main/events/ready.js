const { DiscordAPIError, VoiceConnection } = require("discord.js");

module.exports = (bot) => {
  const utils = require("../functions/utilities.js");

  //Mode Checker
  const fs = require("fs");
  const packageJSON = require("../../package.json");

  //Update bot-data.json
  let botdata = require("../../data/global/bot-data.json");
  botdata.info.botName = bot.user.tag;
  botdata.info.botID = bot.user.id;
  botdata.stats.totalGuilds = bot.guilds.cache.size;
  botdata.stats.totalUsers = bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0);
  fs.writeFileSync(`./data/global/bot-data.json`, JSON.stringify(botdata, null, 4), (err) => {
    if (err) return bot.log.post("error", err);
  });

  //Production Mode
  if (bot.settings.mode === "production") {
    //Static Status
    // let guilds = bot.guilds.cache.size;
    // bot.user.setPresence({ activity: { name: `sb!help on ${guilds} servers!`, type: `WATCHING` }, status: 'online' });

    //Starting Status
    bot.user.setPresence({
      activities: [{
        name: "sb!help",
        type: 'WATCHING'
      }],
      status: 'online'
    });

    //Changing Status
    let l = 1;
    setInterval(function() {

      //Useful Values
      let totalGuilds = bot.guilds.cache.size;
      let totalUsers = bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0);

      //Status array
      // let statuses = [`sb!help`, `on ${totalGuilds} servers`, `with ${totalUsers} users`];
      let statuses = [{
        name: `sb!help`,
        type: `WATCHING`
      }, {
        name: `on ${totalGuilds} servers!`,
        type: `PLAYING`
      }, {
        name: `with ${totalUsers} users!`,
        type: `PLAYING`
      }, {
        name: `wiki.benwhybrow.com`,
        type: 'PLAYING'
      }, {
        name: `sb!invite`,
        type: 'WATCHING'
      }, {
        name: `on Version ${packageJSON.version}`,
        type: 'PLAYING'
      }];

      //Pick from array
      let status = statuses[l];

      //Set as presence
      bot.user.setPresence({
        activities: [{
          name: status.name,
          type: status.type
        }],
        status: 'online'
      });

      //Incrementation and Reset
      l++;
      if (l === statuses.length) l = 0;

    }, 300000) // 5 MINUTES

    //Console Log
    let date = new Date();
    bot.log.post("success", `${bot.user.username} Started Successfully in Production Mode. Version: ${packageJSON.version}`);
  }

  //Development Mode
  if (bot.settings.mode === "development") {
    //Status
    date = new Date();
    bot.user.setPresence({
      activities: [{
        name: `In Development Mode`,
        type: `PLAYING`
      }],
      status: 'dnd'
    });

    //Console Log
    bot.log.post("success", `${bot.user.username} Started Successfully in Development Mode | Date: ${date}`);
  }

  //VERIFICATION FOR SUPPORT DISCORD
  if (bot.settings.options.verifEnabled) {
    utils.resetVerif(bot);
  }

  
  /**
   * 
   * Bot Lists
   * 
   */
  const dbots = require("dbots");
  const poster = new dbots.Poster({
    clientID: '452053607383302145',
    apiKeys: {
      botsfordiscord: bot.settings.connections.botslist.bfd,
      discordbotlist: bot.settings.connections.botslist.dbl,
      topgg: bot.settings.connections.botslist.topgg
    }, 
    clientLibrary: 'discord.js',
    serverCount: async () => bot.guilds.cache.size,
    userCount: async () => bot.memberCount,
    voiceConnections: async () => 0
  });
  
  // Posting Function
  let post = () => {
    poster.post('botsfordiscord');
    // poster.post('discordbotlist');
    poster.post('topgg');
    return bot.log.post("success", "Voting sites updated with guild and user information");
  }
  //Initial post
  post();

  setTimeout(() => {
    post();
  }, 1800000); // Every 30 minutes! 

  // Refresh Cache
  try {
    bot.guilds.cache.forEach(async (guild) => {
      await guild.members.fetch();
    });
  } catch (e) {
    console.log(e);
  }

};