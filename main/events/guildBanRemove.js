module.exports = async (bot, guild, user) => {

  const Discord = require("discord.js");
	const efunctions = require("../functions/eventfunctions.js")
	
  let config = efunctions.getConfig(guild.id)
  if (config.loggingenabled == true) {
      if (config.logginglevel == "medium" || config.logginglevel == "high") {
        if (efunctions.checkChannel(config.loggingchannel, bot) == true) {  
          let lchannel = bot.channels.get(config.loggingchannel);
          lchannel.send({embed: {color: bot.settings.color.yellow, description: `**Member Unbanned**\n**User:** ${user.tag}\n**Unban Date:** ${new Date()}`, footer: {icon_url: user.avatarURL, text: 'Member Unbanned'}, timestamp: new Date()}})
        }
      }
    }
};