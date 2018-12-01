const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {

  let onlineEmbed = new Discord.RichEmbed()
      .setDescription("StenBot is online! :tada:")
      .setColor("#00ff00")

  message.delete().catch(O_o => {});
  message.channel.send(onlineEmbed);
}

module.exports.help = {
  name: "online"
}
