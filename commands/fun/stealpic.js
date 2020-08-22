module.exports = {
  name: "stealpic",
  category: "fun",
  description: "Steal a user's avatar.",
  usage: "sb!stealpic <@USER>",
  permission: "EVERYONE",
  run: async (bot, message, args) => {
    const Discord = require("discord.js");

    let stolen = message.mentions.users.first();
    let stolenPic = stolen.avatarURL();

    let embed = new Discord.MessageEmbed()
      .setColor(bot.settings.color.yellow)
      .setDescription(`**${message.author.username}** has stolen **${stolen.username}**'s profile picture!\n\nFind it here: [${stolen.username}'s Profile Picture](${stolenPic})`)
      .setImage(stolenPic)
      .setFooter(message.guild.name, `https://i.imgur.com/BkZY6H8.png`);

    message.channel.send(embed);
  },
};
