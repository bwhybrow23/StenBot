const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
  message.delete().catch(O_o => {});
  message.channel.send("The website is currently in development. If you would like to help with the development of the website then contact Stentorian#1202 or donate using `.donate`");

}

module.exports.help = {
  name: "website"
}
