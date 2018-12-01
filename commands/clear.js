const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  let clearHelp = new Discord.RichEmbed()
      .setColor("#a905fc")
      .setTitle("Command: Clear")
      .addField("Description:", "Clear a certain number of messages from a chat.", true)
      .addField("Usage", ".clear <number of messages>", true)
      .addField("Example", ".clear 10")
      .addField("Note", "All cleared messages are logged in the set log channel!");


  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Insufficient Permissions");
  if(!args[0]) return message.channel.send("Please provide a number of messages to be cleared!");
  message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`Cleared ${args[0]} messages.`).then(msg => msg.delete(5000));
  });
}

module.exports.help = {
  name: "clear"
}
