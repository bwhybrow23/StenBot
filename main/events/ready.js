module.exports = (bot) => {
  const utils = require("../functions/utilities.js");

  //Mode Checker
  const fs = require("fs");

  //Update bot-data.json
  let botdata = require("../../data/global/bot-data.json");
  botdata.botName = bot.user.tag;
  botdata.botID = bot.user.id;
  botdata.totalGuilds = bot.guilds.cache.size;
  fs.writeFileSync(`./data/global/bot-data.json`, JSON.stringify(botdata, null, 4), (err) => { if (err) return bot.log.post("error", err); });

  //Production Mode
  if (bot.settings.mode === "production") {
    //Static Status
    // let guilds = bot.guilds.cache.size;
    // bot.user.setPresence({ activity: { name: `sb!help on ${guilds} servers!`, type: `WATCHING` }, status: 'online' });

    //Starting Status
    bot.user.setPresence({ activity: { name: "sb!help", type: 'WATCHING'}, status: 'online'});

    //Changing Status
    let l = 1;
    setInterval(function() {

      //Useful Values
      let totalGuilds = bot.guilds.cache.size;
      let totalUsers = bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0);

      //Status array
      // let statuses = [`sb!help`, `on ${totalGuilds} servers`, `with ${totalUsers} users`];
      let statuses = [{name: `sb!help`, type: `WATCHING`}, {name: `on ${totalGuilds} servers!`, type: `PLAYING`}, {name: `with ${totalUsers} users!`, type: `PLAYING`}, {name: `sbdocs.benwhybrow.com`, type: 'PLAYING'}, {name: `sb!invite`, type: 'WATCHING'}, {name: `on Version ${bot.packageJSON.version}`, type: 'PLAYING'}];

      //Pick from array
      let status = statuses[l];

      //Set as presence
      bot.user.setPresence({ activity: { name: status.name, type: status.type}, status: 'online'});

      //Incrementation and Reset
      l++;
      if (l === statuses.length) l = 0;

    }, 300000) // 5 MINUTES

    // let l = 0
    // setInterval(() => {
    //   l++
    //   console.log(l)
    // }, 1000);

    //Console Log
    let date = new Date();
    bot.log.post("success", `${bot.user.username} Started Successfully in Production Mode. Version: ${bot.packageJSON.version}`);
  }

  //Development Mode
  if (bot.settings.mode === "development") {
    //Status
    date = new Date();
    bot.user.setPresence({ activity: { name: `In Development Mode`, type: `PLAYING` }, status: 'dnd' });

    //Console Log
    bot.log.post("success", `${bot.user.username} Started Successfully in Development Mode | Date: ${date}`);
  }

  //VERIFICATION FOR SUPPORT DISCORD
  if (bot.settings.options.verifEnabled) {
    utils.resetVerif(bot);
  }
  
};
