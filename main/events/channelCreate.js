module.exports = async (bot, channel) => {

    const efunctions = require("../functions/eventfunctions.js");

    //Get config
    let config=efunctions.getConfig(channel.guild.id);

    //Check if logging is enabled
    if (config.loggingenabled==true) {

      //Check if channel is valid
      if (efunctions.checkChannel(config.loggingchannel, bot) == true) {
        if (channel.parent.name === "Tickets" && channel.name.startsWith("ticket-")) return;

        let lchannel=bot.channels.get(config.loggingchannel);
        lchannel.send({embed: {color: bot.settings.yellow, description:`**Channel Created**\n**Name:** ${channel.name}\n**Id:** ${channel.id}`, footer: {text: 'Channel Created'}, timestamp: new Date()}});
        
      };
    };

};