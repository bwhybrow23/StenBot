module.exports = {
  name: "binary",
  category: "fun",
  description: "Convert text into binary.",
  usage: "<MESSAGE>",
  example: "Hello There",
  permission: "EVERYONE",
  aliases: [],
  enabled: true,
  run: async (bot, message, args) => {

    const Discord = require("discord.js");

    var output = "";
    var input = args.join(" ");
    if (!input || args[0] == "help") {
      return bot.helpEmbed("binary", bot)
      .then((embed) => message.channel.send(embed))
      .catch((error) => bot.log.post("error", error));
    }
    for (var i = 0; i < input.length; i++) {
      output += input[i].charCodeAt(0).toString(2) + " ";
    }

    bot.createEmbed("success","",``,[{ name: "Original Text", value: `${input}` },{ name: "Binary", value: `${output}` },],`${message.guild.name}`,bot)
      .then((embed) => message.channel.send(embed))
      .catch((error) => bot.log.post("error", error));
  },
};
