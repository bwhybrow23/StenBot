const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);

module.exports = async (bot, message) => {

  const Discord = require("discord.js");
	const efunctions = require("../functions/eventfunctions.js")
	
  let config = efunctions.getConfig(message.guild.id)
  if (config.loggingenabled == true) {
    if (config.logginglevel == "medium" || config.logginglevel == "high") {
      if (efunctions.checkChannel(config.loggingchannel, bot) == true) {
        if (message.author.bot) return;
        let files = await readdir("./commands/");
        possiblefilename = message.content.split(' ')[0].slice(bot.settings.prefix.length)+'.js'
        if (files.includes(possiblefilename)) return;

        let lchannel = bot.channels.get(config.loggingchannel);
        lchannel.send({embed: {color: bot.settings.color.yellow, description:`**Message Deleted**\n**Message:**\n${message}\n**Sent by:** ${message.author}\n**Deleted in:** ${message.channel}`, footer: {icon_url: message.author.avatarURL, text: 'Message Deleted'}, timestamp: new Date()}})
      }
    }
  }
};