const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  let ballHelp = new Discord.RichEmbed()
      .setColor("#a905fc")
      .setTitle("Command: 8ball")
      .addField("Description:", "Predict your future with questions!", true)
      .addField("Usage", ".8ball <question>", true)
      .addField("Example", ".8ball Is Haydn a good content creator?")
      .addField("Note", "The responses are completely random and this is only a game!");

  if(!args[0]) return message.channel.send(ballHelp);

  let replies = ["Yes.", "No.", "I don't know.", "Ask again later.", "Umm...", "Questionable.", "Maybe.", "Ask someone else."]

  let result = Math.floor((Math.random() * replies.length));
  let question = args.slice(0).join(" ");

  let ballEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.tag)
  .setColor("#000000")
  .addField("Question", question)
  .addField("Answer", replies[result]);

  message.channel.send(ballEmbed);

}

module.exports.help = {
  name: "8ball"
}
