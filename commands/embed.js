const Discord = require("discord.js");

exports.run = (bot, message, args) => {
  message.delete();

  const customEmbed = new Discord.RichEmbed()
    .setDescription(args.join(" "))
    .setColor("#26ff00");
    
  message.channel.send(customEmbed);
};

exports.help = {
  name: 'embed'
};
