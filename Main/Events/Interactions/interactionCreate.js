import Discord from 'discord.js';
import fs from 'fs';
const botData = JSON.parse(fs.readFileSync('./Data/Global/bot-data.json', 'utf8'));

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
      logToStats(command.name, command.category);
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
  
  }
};