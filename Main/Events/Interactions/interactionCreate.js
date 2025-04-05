import Discord from 'discord.js';
import fs from 'fs';
const botData = JSON.parse(fs.readFileSync('./Data/Global/bot-data.json', 'utf8'));

// Daily bot usage variable
const dailyBotDataPath = './Data/Global/daily-bot-data.json';
let dailyBotData = JSON.parse(fs.readFileSync(dailyBotDataPath, 'utf8'));

export default {
  name: 'interactionCreate',
  once: false,
  async execute(bot, interaction) {

    //Check if interaction exists and if it's a command
    if (!interaction) return;
  
    // Ignore if blacklisted
    var bStatus;
    await bot.mutils.checkBlacklist(interaction.user.id).then((data) => {
      if (!data) return bStatus = 'No';
      if (data.info.blacklisted === true) bStatus = 'Yes';
    });
    if (bStatus === 'Yes') return;
  
    //Fetch command and return if command doesn't exist
    const command = bot.commands.get(interaction.commandName);
    if (!command) return;
  
    //Check Cooldown
    if (command.options.cooldown) {
      if (!bot.cooldowns.has(interaction.commandName)) {
        bot.cooldowns.set(interaction.commandName, new Discord.Collection());
      }
  
      //Ignore bot owner
      if (interaction.user.id !== bot.settings.ids.botOwner) {
  
        const now = Date.now();
        const timestamps = bot.cooldowns.get(interaction.commandName);
        const cooldownAmount = (command.options.cooldown || 3) * 1000;
  
        if (timestamps.has(interaction.user.id)) {
          const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
  
          if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return interaction.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${interaction.commandName}\` command.`);
          }
        }
  
        timestamps.set(interaction.user.id, now);
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
  
      }
  
    }
  
    //Run command and output error if fails
    try {
      await command.run(bot, interaction);
      logToStats(command.data.name, command.category);
      logToDailyStats(command.data.name, command.category);
    } catch (error) {
      if (error) bot.log.post('error', error);
  
      if(interaction.replied === false) {
        interaction.reply({
          content: 'An error occured whilst running that command. Please try running it again. If the error persists, please contact the bot owner.',
          ephemeral: true
        });
      } else if(interaction.replied === true) {
        interaction.editReply({
          content: 'An error occured whilst running that command. Please try running it again. If the error persists, please contact the bot owner.',
          ephemeral: true
        });
      }
    }
  
    //Log to stats json
    function logToStats(cmdName, cmdCategory) {
      botData.stats.commands[cmdCategory][cmdName]++;
      botData.stats.commands[cmdCategory].total++;
      botData.stats.commands.total++;
      fs.writeFileSync('./Data/Global/bot-data.json', JSON.stringify(botData, null, 4));
    }

    // Log to daily stats json
    function logToDailyStats(cmdName, cmdCategory) {
      const now = new Date();
      const weekNumber = getWeekNumber(now);
      const dayName = now.toLocaleDateString('en-US', { weekday: 'long' });
    
      // Ensure the structure exists
      if (!dailyBotData[weekNumber]) dailyBotData[weekNumber] = {};
      if (!dailyBotData[weekNumber][dayName]) dailyBotData[weekNumber][dayName] = {};
      if (!dailyBotData[weekNumber][dayName][cmdCategory]) dailyBotData[weekNumber][dayName][cmdCategory] = {};
      if (!dailyBotData[weekNumber][dayName][cmdCategory][cmdName]) dailyBotData[weekNumber][dayName][cmdCategory][cmdName] = 0;
    
      // Increment the command usage
      dailyBotData[weekNumber][dayName][cmdCategory][cmdName]++;
    
      fs.writeFileSync(dailyBotDataPath, JSON.stringify(dailyBotData, null, 4));
    }
    
    // Helper to get ISO week number
    function getWeekNumber(date) {
      const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
      const dayNum = d.getUTCDay() || 7;
      d.setUTCDate(d.getUTCDate() + 4 - dayNum);
      const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
      return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    }
    
  
  }
};