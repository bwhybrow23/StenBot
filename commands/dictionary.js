const Discord = require("discord.js")
const urban = require("relevant-urban");

exports.run = async (bot, message, args, tools) => {

  let dictionaryHelp = new Discord.RichEmbed()
      .setColor("GREEN")
      .setTitle("Command: Dictionary")
      .addField("Description:", "Check for a word in the Urban Dictionary", true)
      .addField("Usage", ".dictionary {word}", true)
      .addField("Example", ".dictionary Discord")
      .addField("Note", "All definitions are gathered from the Online Urban Dictionary. We cannot guarantee these definitions to be accurate and we cannot add our own definitions!");

  if (!args[0]) return message.channel.send(dictionaryHelp);

  let res = await urban(args.join(' ')).catch(e => { 
    return message.channel.send("I am afraid that the word you are looking for is not in the Urban Dictionary. If you believe it should then feel free to ask for it to be added.");
  });

  const dictionaryEmbed = new Discord.RichEmbed()
    .setColor("GREEN") 
    .setTitle(res.word) 
    .setURL(res.urbanURL)
    .addField("Definition", res.definition)
    .addField("Example", res.example)
    .addField("Ratings", `**\`Upvotes: ${res.thumbsUp} | Downvotes: ${res.thumbsDown}\`**`) 

  if (res.tags.length > 0 && res.tags.join(' ').length < 1024) {
    embed.addField('Tags', res.tags.join(', '), true) 
  }

  message.channel.send(dictionaryEmbed);

}

module.exports.help = {
    name: "dictionary"
  }
  