module.exports = async (bot, emoji) => {

  const Discord = require("discord.js");
	const efunctions = require("../functions/eventfunctions.js")
	
  let config = efunctions.getConfig(emoji.guild.id)
  if (config.loggingenabled == true) {
    if (config.logginglevel == "high") {
      if (efunctions.checkChannel(config.loggingchannel, bot) == true) {
        let lchannel = bot.channels.get(config.loggingchannel);
        let author = await emoji.fetchAuthor()
        lchannel.send({embed: {color: bot.settings.yellow, description: `**Emoji Created**\n**Name:** ${emoji.name}\n**Identifier:** ${emoji.identifier}\n**Created by:** ${author}`, footer: {icon_url: emoji.url, text: 'Emoji Created'}, timestamp: new Date()}})
      }
    }
  }
};