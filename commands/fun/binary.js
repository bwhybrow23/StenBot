module.exports = {
  name: "binary",
  category: "fun",
  description: "Convert text into binary.",
  usage: "sb!binary <MESSAGE>",
  permission: "EVERYONE",
  run: async (bot, message, args) => {
    var output = "";
    const Discord = require("discord.js");

    let helpE = new Discord.RichEmbed()
      .setColor(bot.settings.color.blue)
      .setTitle("Command: Binary")
      .addField("Description:", "Convert any message into binary.", true)
      .addField("Usage", "`sb!binary <text>`", true)
      .addField(
        "Example",
        "`sb!binary This is a top secret message from Discord HQ.`"
      )
      .setFooter(message.author.tag, message.author.avatarURL)
      .setTimestamp();

    if (!args[0]) return message.channel.send(helpE);

    var input = args.join(" ");
    for (var i = 0; i < input.length; i++) {
      output += input[i].charCodeAt(0).toString(2) + " ";
    }

    bot
      .createEmbed(
        "success",
        "",
        ``,
        [
          { name: "Original Text", value: `${input}` },
          { name: "Binary", value: `${output}` },
        ],
        `${message.guild.name}`,
        bot
      )
      .then((embed) => message.channel.send(embed))
      .catch((error) => console.error(error));
  },
};
