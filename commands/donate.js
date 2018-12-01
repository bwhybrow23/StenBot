const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
  message.delete().catch(O_o => {});
  message.channel.send("Do you want to help keep the bot running? If your answer is yes then please consider donating to the creator of the bot (Stentorian) as it will go to a great cause! https://paypal.me/qumc");

}

module.exports.help = {
  name: "donate"
}
