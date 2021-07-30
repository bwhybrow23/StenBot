module.exports = async (bot, message) => {

    const Discord = require("discord.js");
    const fs = require("fs");
  
    //Link Blocker & Filter
    if (message.author.bot) return;
    if (message.content.indexOf(bot.settings.prefix) !== 0) {
      if (message.guild) {
        const config = await bot.mutils.getGuildById(message.guild.id);
        //Check if its an url
        if (config.moderation.link_block) {
          var checker = require("is-url");
          if (checker(message.content)) {
            if (message.member.permissions.has("ADMINISTRATOR") == true) return;
            message.delete();
            return;
          }
        }
        //Check if it contains words from filter
        if (config.moderation.filter.some((word) => message.content.toLowerCase().includes(word))) {
          if (message.member.permissions.has("ADMINISTRATOR") == true) return;
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
      if (data.info.blacklisted == true) bStatus = "Yes";
    })
    if (bStatus == "Yes") return;
  
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
  
    if (cmd.length == 0) return;
  
    let command = bot.commands.get(cmd);
    // if (!command) command = bot.commands.get(bot.aliases.get(cmd));
    if (!command) command = bot.commands.get(bot.aliases.get(cmd));
    if (!command) return;

    //Check if GuildOnly
    if(command.options.guildOnly == true) {
      if(!message.guild) return message.reply("This command can only be ran in a guild.");
    }

    //Pass author as guild if command is ran in DMs
    if(message.channel.type == "DM") {
      if(!message.guild) {
        message.server = message.author;
        message.server.name = message.author.username;
      }
    } else {
      message.server = message.guild;
    }
  
    //Check Cooldown
    if(command.options.cooldown) {
    if (!bot.cooldowns.has(command.name)) {
      bot.cooldowns.set(command.name, new Discord.Collection());
    }
    
    const now = Date.now();
    const timestamps = bot.cooldowns.get(command.name);
    const cooldownAmount = (command.options.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    
      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
      }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  }

    if (command) {
      command.run(bot, message, args);
      logToStats(command);
    }
  
    //Log to stats json
    function logToStats(cmd) {
      let botData = require("../../data/global/bot-data.json");
      botData.stats.commands[cmd.category][cmd.name]++;
      botData.stats.commands[cmd.category].total++;
      botData.stats.commands.total++;
      fs.writeFileSync("./data/global/bot-data.json", JSON.stringify(botData, null, 4));
    }
  
  };