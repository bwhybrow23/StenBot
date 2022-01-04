module.exports = async (bot, guild) => {

  const Discord = require("discord.js");
  const fs = require("fs");
  const Punishment = require("../models/punishment.js");

  let gOwner = await guild.fetchOwner();

  //When bot joins new server, create that servers file system.
  //Check if the server is blacklisted
  var serverstats;
  try {
    var serverstats = bot.mutils.getGuildById(guild.id)
  } catch (err) {
    return bot.log.post("error", err);
  }

  //Leave the guild if its blacklisted
  if (serverstats.info.blacklisted === true) {
    bot.createEmbed("error", "", `I'm afraid that StenBot cannot join your server **${guild.name}** as your server is blacklisted from the bot. If you believe this is an error, please contact **Stentorian#9524** or join the **[Discord](https://discord.benwhybrow.com)**.`, [], `${guild.name}`, bot)
      .then(embed => gOwner.send(embed))
      .catch(error => bot.log.post("error", error));
    guild.leave();
    return bot.log.post("info", `Left guild: ${guild.name} | ${guild.id} because this server was blacklisted!`);
  }
  bot.log.post("info", `Joined guild ${guild.name} | ${guild.id}`);

  /**
   * 
   * MONGO STORAGE 
   * 
   */
  if(!serverstats) {
  await bot.mutils.createGuild({
    info: {
      id: guild.id,
      name: guild.name,
      owner_id: guild.ownerId,
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
      filter: [],
      mute_role: ""
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
}

  if(!Punishment.findOne({ guildId: guild.id })) {
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
  let botdata = require("../../data/global/bot-data.json");
  botdata.stats.totalGuilds = bot.guilds.cache.size;
  botdata.stats.totalUsers = bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0);
  fs.writeFileSync(`./data/global/bot-data.json`, JSON.stringify(botdata, null, 4), (err) => {
    if (err) return bot.log.post("error", err);
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
  await bot.channels.cache.get("839509992041218049").send({
    embeds: [{
      "title": "Joined Guild!",
      "thumbnail": {
        "url": guild.iconURL()
      },
      "footer": {
        "icon_url": "https://i.imgur.com/klY5xCe.png",
        "text": guild.id
      },
      "color": 982784,
      "timestamp": Date.now(),
      "fields": [{
          name: "Server Name",
          value: guild.name,
          inline: true
        },
        {
          name: "Server Owner",
          value: `${gOwner.tag} || ${gOwner.id}`,
          inline: true
        },
        {
          name: "Member Count",
          value: `${guild.memberCount}`,
          inline: false
        },
        {
          name: "New Guild Count",
          value: `${totalGuilds}`,
          inline: true
        },
        {
          name: "New Member Count",
          value: `${totalUsers}`,
          inline: true
        }
      ]
    }]
  })

};
