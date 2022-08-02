/* eslint-disable no-inner-declarations */
module.exports = {
  name: 'messageCreate',
  once: false,
  async execute(bot, message) {

    if (!message) return;

    //Link Blocker & Filter
    if (message.author.bot) return;
    if (message.content.indexOf(bot.settings.prefix) !== 0) {
      if (message.guild) {
        const config = await bot.mutils.getGuildById(message.guild.id);
        if (!config) return;
        //Check if its an url
        if (config.moderation.link_block) {
          var checker = require('is-url');
          if (checker(message.content)) {
            if (message.member.permissions.has('ADMINISTRATOR') === true) return;
            message.delete();
            return;
          }
        }
        //Check if it contains words from filter
        if (config.moderation.filter.some((word) => message.content.toLowerCase().includes(word))) {
          if (message.member.permissions.has('ADMINISTRATOR') === true) return;
          message.delete();
          return;
        }
        return;
      }
    }

    //Message about new slash commands
    if (message.content.startsWith(bot.settings.prefix)) {
      message.reply('StenBot has now moved over to using slash commands. Please ensure that the bot has the correct permissions. If you\'re unsure, invite the bot again through https://sbinvite.benwhybrow.com. \n\nFrom there, you can do `/` and it will show what commands are available. \n\nIf you have any questions, please join the Discord server and we\'ll be glad to help! https://discord.gg/PGfSYct');
    }


    /**
     * OLD COMMAND HANDLER
     * DEPRECATED
     */
    /*
    //Command Handler
    const prefix = bot.settings.prefix;

    if (!message.content.startsWith(prefix)) return;

    // Ignore if blacklisted
    var bStatus;
    await bot.mutils.checkBlacklist(message.author.id).then((data) => {
      if (!data) return bStatus = "No";
      if (data.info.blacklisted === true) bStatus = "Yes";
    })
    if (bStatus === "Yes") return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = bot.commands.get(cmd);
    // if (!command) command = bot.commands.get(bot.aliases.get(cmd));
    if (!command) command = bot.commands.get(bot.aliases.get(cmd));
    if (!command) return;

    //Check if GuildOnly
    if (command.options.guildOnly === true) {
      if (!message.guild) return message.reply("This command can only be ran in a guild.");
    }

    //Pass author as guild if command is ran in DMs
    if (message.channel.type === "DM") {
      if (!message.guild) {
        message.server = message.author;
        interaction.guild.name = message.author.username;
      }
    } else {
      message.server = message.guild;
    }

    //Check Cooldown
    if (command.options.cooldown) {
      if (!bot.cooldowns.has(command.name)) {
        bot.cooldowns.set(command.name, new Discord.Collection());
      }

      //Ignore bot owner
      if (message.author.id !== bot.settings.ids.botOwner) {

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

    }

    if (command) {
      command.run(bot, message, args);
      logToStats(command);
    }

    //Log to stats json
    function logToStats(cmd) {
      let botData = require("../../Data/Global/bot-data.json");
      botData.stats.commands[cmd.category][cmd.name]++;
      botData.stats.commands[cmd.category].total++;
      botData.stats.commands.total++;
      fs.writeFileSync("./Data/Global/bot-data.json", JSON.stringify(botData, null, 4));
    }
    */

  }
};