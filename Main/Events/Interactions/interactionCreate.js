import Discord from 'discord.js';
import fs from 'fs';
const botData = JSON.parse(fs.readFileSync('./Data/Global/bot-data.json', 'utf8'));

// Ensure daily-bot-data.json exists and is formatted correctly
const dailyDataPath = './Data/Global/daily-bot-data.json';
if (!fs.existsSync(dailyDataPath)) {
  const emptyWeeks = Array.from({ length: 52 }, () =>
    Array.from({ length: 7 }, () => ({}))
  );
  fs.writeFileSync(dailyDataPath, JSON.stringify(emptyWeeks, null, 4));
}
const dailyData = JSON.parse(fs.readFileSync(dailyDataPath, 'utf8'));

export default {
  name: 'interactionCreate',
  once: false,
  async execute(bot, interaction) {

    if (!interaction) return;

    // Ignore if blacklisted
    var bStatus;
    await bot.mutils.checkBlacklist(interaction.user.id).then((data) => {
      if (!data) return bStatus = 'No';
      if (data.info.blacklisted === true) bStatus = 'Yes';
    });
    if (bStatus === 'Yes') return;

    const command = bot.commands.get(interaction.commandName);
    if (!command) return;

    if (command.options.cooldown) {
      if (!bot.cooldowns.has(interaction.commandName)) {
        bot.cooldowns.set(interaction.commandName, new Discord.Collection());
      }

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

    try {
      await command.run(bot, interaction);
      logToStats(command.name, command.category);
      logToDaily(command.name);
    } catch (error) {
      if (error) bot.log.post('error', error);

      const errorMsg = 'An error occured whilst running that command. Please try running it again. If the error persists, please contact the bot owner.';
      if (interaction.replied === false) {
        interaction.reply({ content: errorMsg, ephemeral: true });
      } else if (interaction.replied === true) {
        interaction.editReply({ content: errorMsg, ephemeral: true });
      }
    }

    function logToStats(cmdName, cmdCategory) {
      botData.stats.commands[cmdCategory][cmdName]++;
      botData.stats.commands[cmdCategory].total++;
      botData.stats.commands.total++;
      fs.writeFileSync('./Data/Global/bot-data.json', JSON.stringify(botData, null, 4));
    }

    function logToDaily(cmdName) {
      const now = new Date();
      const week = getWeekNumber(now);
      const day = now.getDay(); // Sunday = 0

      // Expand weeks if necessary
      while (dailyData.length <= week) {
        dailyData.push(Array.from({ length: 7 }, () => ({})));
      }

      const dayData = dailyData[week][day];

      if (!dayData[cmdName]) {
        dayData[cmdName] = 0;
      }
      dayData[cmdName]++;

      fs.writeFileSync(dailyDataPath, JSON.stringify(dailyData, null, 4));
    }

    function getWeekNumber(date) {
      const startOfYear = new Date(date.getFullYear(), 0, 1);
      const pastDaysOfYear = (date - startOfYear) / 86400000;
      return Math.floor((pastDaysOfYear + startOfYear.getDay()) / 7);
    }
  }
};