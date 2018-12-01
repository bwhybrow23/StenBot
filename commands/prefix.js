const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args, prefix) => {

let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

if(!message.member.hasPermission("MANAGE_SERVER")) return message.reply("You have insufficient permissions!");

let setprefixEmbed = new Discord.RichEmbed()
.setColor("GREEN")
.setTitle("Command: Prefix")
.addField("Description:", "Set a custom prefix for the guild.", true)
.addField("Usage", ".prefix <prefix>", true)
.addField("Example", ".prefix ?")
.addField("Note", "To unban the user you have banned, you need to navigate to Server Settings > Bans");


if(!args[0]) return message.reply(`Usage: ${prefix}prefix <new prefix>`);

prefixes[message.guild.id] = {
  prefixes: args[0]
};

fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
  if (err) console.log(err)
});

let sEmbed = new Discord.RichEmbed()
.setColor("#FF9900")
.setTitle("Prefix Set!")
.setDescription(`Set to ${args[0]}`);

message.channel.send(sEmbed);

}

module.exports.help = {
  name: "prefix"
}
