module.exports = async (bot, message) => {

    const fs = require("fs");
  
    //Link Blocker & Filter
    if (message.author.bot) return;
    if (message.content.indexOf(bot.settings.prefix) !== 0) {
      if (message.guild) {
        const config = await bot.mutils.getGuildById(message.guild.id);
        //Check if its an url
        if (config.staff_linkblock) {
          var checker = require("is-url");
          if (checker(message.content)) {
            if (message.member.hasPermission("ADMINISTRATOR") == true) return;
            message.delete();
            return;
          }
        }
        //Check if it contains words from filter
        if (config.staff_filter.some((word) => message.content.toLowerCase().includes(word))) {
          if (message.member.hasPermission("ADMINISTRATOR") == true) return;
          message.delete();
          return;
        }
        return;
      }
    };
  
    //Command Handler
    const prefix = bot.settings.prefix;
  
    if (message.author.bot) return;
    // if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    // if (!message.member)
    //   message.member = await message.guild.fetchMember(message);
  
    // Ignore if blacklisted
    var bStatus;
    await bot.mutils.checkBlacklist(message.author.id).then((data) => {
      if (!data) return bStatus = "No";
      if (data.blacklisted === true) bStatus = "Yes";
    })
    if (bStatus === "Yes") return;
  
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
  
    if (cmd.length === 0) return;
  
    let command = bot.commands.get(cmd);
    // if (!command) command = bot.commands.get(bot.aliases.get(cmd));
    if (!command) command = bot.commands.get(bot.aliases.get(cmd));
  
    if (command) {
      command.run(bot, message, args);
      logToStats(command);
    }
  
    //Log to stats json
    function logToStats(cmd) {
      let botData = require("../../data/global/bot-data.json");
      botData.stats.commands[cmd.category][cmd.name]++;
      botData.stats.commands[cmd.category].total++;
      fs.writeFileSync("./data/global/bot-data.json", JSON.stringify(botData, null, 4));
    }
  
  };