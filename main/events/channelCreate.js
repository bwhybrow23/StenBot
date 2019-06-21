module.exports = async (bot, channel) => {

    const Discord = require("discord.js");
    const efunctions = require("../functions/eventfunctions.js");

    //Get config
    let config=efunctions.getConfig(channel.guild.id);

    //Check if logging is enabled
    if (config.loggingenabled==true) {

      //Check if channel is valid
      if (efunctions.checkChannel(config.loggingchannel, bot) == true) {

        let lchannel=bot.channels.get(config.loggingchannel);
        lchannel.send({embed: {color: bot.settings.yellow, description:`**Channel Created**\n**Name:** ${channel.name}\n**Id:** ${channel.id}`, footer: {text: 'Channel Created'}, timestamp: new Date()}});
        
      };
    };

};