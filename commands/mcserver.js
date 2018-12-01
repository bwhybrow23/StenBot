const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
  message.delete().catch(O_o => {});
  message.channel.send("Do you play Minecraft? Do you want to help grow StenBot? Then I would consider that you join Quest Universe! It is a Minecraft server that is in development and is Co-Owned by Stentorian himself! Check it out here: https://discord.gg/M2jxcFg");

}

module.exports.help = {
  name: "mcserver"
}
