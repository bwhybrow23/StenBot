const Discord = require("discord.js");

module.exports.run = async (bot, message, args, level) => {

  let suggestion = args.slice(0).join(" ");

  let suggestHelpEmbed = new Discord.RichEmbed()
  .setColor("#a905fc")
  .setTitle("Command: Suggest")
  .addField("Description:", "Suggest something to be added to the server!", true)
  .addField("Usage", ".suggest <suggestion>", true)
  .addField("Example", ".suggest Cool Commands for the Bot")
  .addField("Note", "People can vote on your suggestion in #suggestions and which ever has the most votes will be added!");

  if (args.length === 0)
  return message.channel.send(suggestHelpEmbed);

  message.delete().catch(O_o => {});

  let suggestEmbed = new Discord.RichEmbed()
  .setDescription(`Suggestion from ${message.author}!`)
  .setColor("#a905fc")
  .addField("Suggestion",`${suggestion}`)
  .setFooter(`Suggestion From: ${message.author.username}`, `${message.author.avatarURL}`)

  let suggestionChannel = message.guild.channels.find(`name`, "suggestions");

  suggestionChannel.send(suggestEmbed).then(msg => {
    msg.react(`✅`)
    msg.react(`❌`)
});
};

module.exports.help = {
    name: "suggest"
}