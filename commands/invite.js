const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {

  let bicon = bot.user.avatarURL;

  let inviteEmbed = new Discord.RichEmbed()
  .setDescription ("Invite StenBot to your Discord Server")
  .addField("Default Help Command", "`.help`")
  .addField("How to Invite", "To invite StenBot to your server, please speak to Stentorian#1202 as the bot is only limited as of hosting conditions")
  .addField("Support Server", "https://discord.gg/d9zWhZu")
  .setThumbnail(bicon)


  message.delete().catch(O_o => {});
  message.channel.send(inviteEmbed);
}

module.exports.help = {
  name: "invite"
}
