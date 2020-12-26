module.exports = {
  name: "stealpic",
  category: "fun",
  description: "Steal a user's avatar.",
  usage: "<@USER>",
  example: "@Jake#4012",
  permission: "EVERYONE",
  run: async (bot, message, args) => {

    const Discord = require("discord.js");
    if (!message.guild) return;

    let stolen = message.mentions.users.first();
    if (!stolen || args[0] == "help") {
      return bot.helpEmbed("stealpic", bot)
      .then((embed) => message.channel.send(embed))
      .catch((error) => bot.log.post("error", error));
    }
    let stolenPic = stolen.avatarURL();

    let embed = new Discord.MessageEmbed()
      .setColor(bot.settings.color.yellow)
      .setDescription(`**${message.author.username}** has stolen **${stolen.username}**'s profile picture!\n\nFind it here: [${stolen.username}'s Profile Picture](${stolenPic})`)
      .setImage(stolenPic)
      .setFooter(message.guild.name, `https://i.imgur.com/BkZY6H8.png`);

    message.channel.send(embed);
  },
};
