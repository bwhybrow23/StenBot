module.exports = {
    name: "sync",
    category: "bot",
    description: "Sync all servers to replace missing files.",
    usage: "sb!sync",
    permission: "BOT OWNER",
    run: async (bot, message, args) => {
   
      const Discord = require("discord.js");
      if (!message.guild) return;
   
      //Check Perms
      if (message.author.id !== bot.settings.ids.botOwner) {
        return bot.noPermsEmbed(`${message.guild.name}`, bot)
          .then((embed) => message.channel.send(embed))
          .catch((error) => bot.logger("error", error));
      }
   
      var amountsynced = 0;
   
      async function syncServers(g) {
        //Loop through all guilds for server root
        bot.guilds.cache.forEach(async (g) => {
          //Check if guild config exist
          var config = undefined;
          try {
            var config = await bot.mutils.getGuildById(g.id)
          } catch (err) {
            var config = undefined;
          }
          //If it doesnt create the config
          if (config == undefined) {
            
            //Create config
            bot.mutils.createGuild({
              guild_id: g.id,
              guild_name: g.name,
              guild_owner_id: g.owner.id,
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
              tickets_enabled: false,
              tickets_message: "None",
              music_enabled: false,
              levelling_enabled: false
              });
   
            // console.log(`[SYNC]`.blue, `Synced guild ${g.name} | ${g.id}`.cyan);
            bot.logger("info", `Synced guild ${g.name} | ${g.id}`);
   
            //Counter
            amountsynced = amountsynced + 1
   
          }
        });
      }
   
      let attempt = 1;
      while (syncServers(message.guild) == false) {
        syncServers(message.guild);
        attempt = attempt + 1;
      }
   
      //Round up the goodies
      console.log(`[SYNC]`.blue, `${amountsynced} servers have been synced in ${attempt} attempts.`.cyan);
      bot.createEmbed("success", "", `**${amountsynced}** servers have been synced in ${attempt} attempts.`, [], `${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
        
    }
  };