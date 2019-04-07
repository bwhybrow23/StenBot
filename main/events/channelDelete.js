module.exports = async (bot, channel) => {

    const efunctions = require("../functions/eventfunctions.js");

    
    let config=efunctions.getConfig(channel.guild.id);
    if (config.loggingenabled==true) {
      if (efunctions.checkChannel(config.loggingchannel, bot) == true) {
				if (channel.parent.name === "Tickets" && channel.name.startsWith("ticket-")) return;
        let lchannel=bot.channels.get(config.loggingchannel);
        lchannel.send({embed: {color: bot.settings.yellow, description:`**Channel Deleted**\n**Name:** ${channel.name}\n**Id:** ${channel.id}`, footer: {text: 'Channel Deleted'}, timestamp: new Date()}})
      };
    };
};