const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("You can't do that.");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply("Correct Usage: `.warns @<user>`");
  let warnlevel = warns[wUser.id].warns || "0";

  let logChannel = message.guild.channels.find(`name`, "logs")

  message.channel.send(`<@${wUser.id}> has **${warnlevel}** warning(s). If you would like to see the reasons, please go to ${logChannel} and search for it manually as the bot is not eligible to retrieve reasons from warnings!`);

}

module.exports.help = {
  name: "warns"
}
