module.exports = {
  name: "sync",
  category: "botowner",
  description: "Checks all servers for configs and creates if they don't work. (For if the bot is offline when it's added to a guild).",
  usage: "",
  example: "",
  options: { permission: "BOTOWNER", enabled: true, guildOnly: true },
  run: async (bot, message, args) => {

    const Discord = require("discord.js");

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
          info: {
            id: g.id,
            name: g.name,
            owner_id: g.ownerID,
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
            level: "medium"
          },
          tickets: {
            enabled: false,
            message: "**User:** {user}\n**Reason:** {reason}"
          }
        });

        bot.log.post("info", `Synced guild ${g.name} | ${g.id}`);
        syncedServers += `\n${g.name} | ${g.id}`;

        //Counter
        amountSynced++;

      }
    }));

    //Round up the goodies
    bot.log.post("info", `${amountSynced} server(s) have been synced.`)
    bot.createEmbed("success", `**${amountSynced}** server(s) have been synced`, `\`\`\`${syncedServers}\`\`\``, [], `${message.guild.name}`, message)
      .then((embed) => message.channel.send(embed))
      .catch((error) => bot.log.post("error", error));

  }
};