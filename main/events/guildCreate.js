module.exports = async (bot, guild) => {
  const Discord = require("discord.js");
  const fs = require("fs");

  //When bot joins new server, create that servers file system.
  //Check if the server is blacklisted
  var serverstats = undefined;
  try {
    var serverstats = mutils.getGuildById(guild.id)
  } catch (err) {
    var serverstats = undefined;
  }

  //Leave the guild if its blacklisted
  if (serverstats != undefined) {
    if (serverstats.blacklisted === true) {
      bot.createEmbed("error", "", `I'm afraid that StenBot cannot join your server **${guild.name}** as your server is blacklisted from the bot. If you believe this is an error, please contact **Stentorian#9524** or join the **[Discord](https://discord.benwhybrow.com)**.`, [], `${guild.name}`, bot)
              .then(embed => guild.owner.send(embed))
              .catch(error => console.error(error))
      guild.leave();
      bot.log.post("info", `Left guild: ${guild.name} | ${guild.id} because this server was blacklisted!`);
    } else {
      return;
    }
  }
  bot.log.post("info", `Joined guild ${guild.name} | ${guild.id}`);

  /**** OLD STORAGE SYSTEM ****/
  /* 
  //Create the servers root dir
  fs.mkdir(`./data/servers/server-${guild.id}`, (err) => {
    if (err && err.code != "EEXIST") return;
  });

  //Create the servers users directory
  fs.mkdir(`./data/servers/server-${guild.id}/users`, (err) => {
    if (err && err.code != "EEXIST") return;
  });

  //Inside the servers directory, we will create the tempbans folder Done as functions as this does not always work !
  function tempbanCreate(guild) {
    fs.mkdir(`./data/servers/server-${guild.id}/tempbans`, (err) => {
      if (err && err.code != "EEXIST") tempbanCreate(guild);
    });
  }
  tempbanCreate(guild);

  //Create server stats file and set its contents to the servers stats
  let date = new Date();
  let stats = {
    joined: date,
    created: guild.createdAt,
    blacklisted: false,
  };
  fs.writeFileSync(
    `./data/servers/server-${guild.id}/serverstats.json`,
    JSON.stringify(stats, null, 4),
    (err) => {
      if (err) return;
    }
  );

  //Create server configuration file and set it to default contents
  let defaultContent = {
    welcomerenabled: false,
    welcomerchannel: 0,
    welcomermessage: "Welcome {user} to {server}!",
    userjoinenabled: false,
    userjoinedrole: 0,
    userjoinedname: 0,
    staffrole: false,
    staffadminenabled: false,
    stafflinkblocker: false,
    stafffilter: [],
    staffautoban: 0,
    loggingenabled: false,
    loggingchannel: 0,
    logginglevel: "medium",
    ticketsenabled: false,
    ticketsmsg: 0,
    economyenabled: false,
    economyrobbing: false,
    economypay: true,
    economysymbol: 0,
    musicenabled: false,
    selfroleslist: [],
    levellingenabled: false,
  };
  fs.writeFileSync(
    `./data/servers/server-${guild.id}/serverconfig.json`,
    JSON.stringify(defaultContent, null, 4),
    (err) => {
      if (err) return;
    }
  );

  //levelling system
  let levelDefault = {};
  fs.writeFileSync(
    `./data/servers/server-${guild.id}/levelling.json`,
    JSON.stringify(levelDefault, null, 4),
    (err) => {
      if (err) return;
    }
  );
  */
  
  /**** MONGO STORAGE ****/
  await bot.mutils.createGuild({
    guild_id: guild.id,
    guild_name: guild.name,
    guild_owner_id: guild.ownerID,
    blacklisted: false,
    welcomer_enabled: false,
    welcomer_channel: "0",
    welcomer_message: "Welcome {user} to {server}!",
    userjoin_enabled: false,
    userjoin_role: "0",
    userjoin_nickname: "None",
    staff_role: "0",
    staff_admin: false,
    staff_linkblock: false,
    staff_filter: [],
    staff_autoban: "",
    logging_enabled: false,
    logging_channel: "0",
    logging_level: "medium",
    logging_ignore: [],
    tickets_enabled: false,
    tickets_message: "None",
    music_enabled: false,
    levelling_enabled: false
    });

  // Update Status
  /*if (bot.settings.mode === "production") {
    let guilds = bot.guilds.cache.size;
    bot.user.setPresence({
      game: {
        name: `sb!help on ${guilds} servers!`,
        type: "WATCHING",
      },
      status: "online",
    });
  }*/

  //Update bot-data.json
  let botdata = require("../../data/global/bot-data.json");
  botdata.totalGuilds = bot.guilds.cache.size;
  fs.writeFileSync(`./data/global/bot-data.json`, JSON.stringify(botdata, null, 4), (err) => { if (err) return bot.log.post("error", err); });
  
};
