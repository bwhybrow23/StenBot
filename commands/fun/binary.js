exports.run = async (bot, message, args) => {

    var output = "";
    const Discord = require("discord.js");

    let helpE = new Discord.RichEmbed()
    .setColor(bot.settings.color.blue)
    .setTitle("Command: Binary")
    .addField("Description:", "Convert any message into binary.", true)
    .addField("Usage", "`.binary <text>`", true)
    .addField("Example", "`.binary This is a top secret message from Discord HQ.`")
    .setFooter(message.author.tag, message.author.avatarURL)
    .setTimestamp();

    if (!args[0]) return message.channel.send(helpE);

    var input = args.join(" ");
    for (var i = 0; i < input.length; i++) {
        output += input[i].charCodeAt(0).toString(2) + " ";
    }

    const outputEmbed = new Discord.RichEmbed()
        .setColor(bot.settings.color.yellow)
        .setTitle("Binary Command")
        .addField("Original Text", input)
        .addField("Binary", output)
        .setFooter(message.author.tag, message.author.displayURL);

    message.channel.send(outputEmbed);

}