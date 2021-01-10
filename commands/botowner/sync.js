module.exports = {
  name: "sync",
  category: "botowner",
  description: "Checks all servers for configs and creates if they don't work. (For if the bot is offline when it's added to a guild).",
  usage: "",
  example: "",
  permission: "BOT OWNER",
  enabled: true,
  run: async (bot, message, args) => {

    const Discord = require("discord.js");
    if (!message.guild) return;

    //Permission Check
    if (message.author.id !== bot.settings.ids.botOwner) {
      return;
    };

    let amountSynced = 0;
    let syncedServers;
    //Loop through all guilds for server root
    await Promise.all(bot.guilds.cache.map(async (g) => {
      //Check if guild config exist
      var config = await bot.mutils.getGuildById(g.id);
      if (!config) {
        //Create config
        await bot.mutils.createGuild({
          guild_id: g.id,
          guild_name: g.name,
          guild_owner_id: g.ownerID,
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

        bot.log.post("info", `Synced guild ${g.name} | ${g.id}`);
        syncedServers += `\n${g.name} | ${g.id}`;

        //Counter
        amountSynced++;

      }
    }));

    //Round up the goodies
    bot.log.post("info", `${amountSynced} server(s) have been synced.`)
    bot.createEmbed("success", `**${amountSynced}** server(s) have been synced`, `\`\`\`${syncedServers}\`\`\``, [], `${message.guild.name}`, bot)
      .then((embed) => message.channel.send(embed))
      .catch((error) => bot.log.post("error", error));

  }
};