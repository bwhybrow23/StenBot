const Discord = require("discord.js");

module.exports.run = async (bot, message, args, level) => {

  let question = args.slice(0).join(" ");

  let pollhelpEmbed = new Discord.RichEmbed()
  .setColor("#a905fc")
  .setTitle("Command: Poll")
  .addField("Description:", "Ask a question for people to answer", true)
  .addField("Usage", ".poll <question>", true)
  .addField("Example", ".poll Pineapple on Pizza?")
  .addField("Note", "The poll will last forever and will not end so you can tally the answers up by yourself. You don't need a bot to do that for you!");

  if (args.length === 0)
  return message.channel.send(pollhelpEmbed);

  message.delete().catch(O_o => {});

  let pollEmbed = new Discord.RichEmbed()
  .setTitle("A Poll Has Been Started!")
  .setColor("#a905fc")
  .setDescription(`${question}`)
  .setFooter(`Poll Started By: ${message.author.username}`, `${message.author.avatarURL}`)

  message.channel.send(pollEmbed).then(msg => {
    msg.react(`👍`)
    msg.react(`👎`)
})

}

module.exports.help = {
    name: "poll"
}