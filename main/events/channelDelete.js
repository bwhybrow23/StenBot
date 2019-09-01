module.exports = async (bot, channel) => {

  const Discord = require("discord.js");
    const efunctions = require("../functions/eventfunctions.js");

    
    let config=efunctions.getConfig(channel.guild.id);
    if (config.loggingenabled==true) {
      if (efunctions.checkChannel(config.loggingchannel, bot) == true) {
        let lchannel=bot.channels.get(config.loggingchannel);
        lchannel.send({embed: {color: bot.settings.color.yellow, description:`**Channel Deleted**\n**Name:** ${channel.name}\n**Id:** ${channel.id}`, footer: {text: 'Channel Deleted'}, timestamp: new Date()}})
      };
    };
};