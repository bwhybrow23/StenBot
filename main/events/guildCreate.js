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
  
  /**
   * 
   * MONGO STORAGE 
   * 
   */
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

  //Update bot-data.json
  let botdata = require("../../data/global/bot-data.json");
  botdata.stats.totalGuilds = bot.guilds.cache.size;
  fs.writeFileSync(`./data/global/bot-data.json`, JSON.stringify(botdata, null, 4), (err) => { if (err) return bot.log.post("error", err); });
  
};
