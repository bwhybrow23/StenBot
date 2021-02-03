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
    if (serverstats.info.blacklisted == true) {
      bot.createEmbed("error", "", `I'm afraid that StenBot cannot join your server **${guild.name}** as your server is blacklisted from the bot. If you believe this is an error, please contact **Stentorian#9524** or join the **[Discord](https://discord.benwhybrow.com)**.`, [], `${guild.name}`, bot)
        .then(embed => guild.owner.send(embed))
        .catch(error => console.error(error))
      guild.leave();
      return bot.log.post("info", `Left guild: ${guild.name} | ${guild.id} because this server was blacklisted!`);
    } else {
      bot.createEmbed("error", "", `I'm afraid that StenBot cannot join your server **${guild.name}** as it failed to create the configuration for the server. Please try again and if this issue persists, please join the **[Discord](https://discord.benwhybrow.com)** and gain help.`, [], `${guild.name}`, bot)
        .then(embed => guild.owner.send(embed))
        .catch(error => console.error(error))
      guild.leave();
      return bot.log.post("error", `Left guild: ${guild.name} | ${guild.id} because there was an error creating the server's config!`);
    }
  }
  bot.log.post("info", `Joined guild ${guild.name} | ${guild.id}`);

  /**
   * 
   * MONGO STORAGE 
   * 
   */
  await bot.mutils.createGuild({
    info: {
      id: guild.id,
      name: guild.name,
      owner_id: guild.ownerID,
      blacklisted: false
    },
    gatekeeper: {
      welcome_enabled: false,
      welcome_channel: "0",
      welcome_message: "Welcome {user} to {server}",
      leave_enabled: false,
      leave_channel: "0",
      leave_message: "Goodbye {user} from {server}"
    },
    userjoin: {
      enabled: false,
      role: "0",
      nickname: "None"
    },
    moderation: {
      staff_role: "0",
      link_block: false,
      filter: []
    },
    logging: {
      enabled: false,
      channel: "0",
      level: "medium",
      ignore: []
    },
    tickets: {
      enabled: false,
      message: "**User:** {user}\n**Reason:** {reason}"
    }
  })

  //Update bot-data.json
  let botdata = require("../../data/global/bot-data.json");
  botdata.stats.totalGuilds = bot.guilds.cache.size;
  botdata.stats.totalUsers = bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0);
  fs.writeFileSync(`./data/global/bot-data.json`, JSON.stringify(botdata, null, 4), (err) => {
    if (err) return bot.log.post("error", err);
  });

};