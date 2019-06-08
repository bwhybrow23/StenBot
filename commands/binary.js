exports.run = async (bot, message, args) => {

    var output = "";
    const Discord = require("discord.js");

    //HELP EMBED HERE

    var input = args.join(" ");
    for (var i = 0; i < input.length; i++) {
        output += input[i].charCodeAt(0).toString(2) + " ";
    }

    const outputEmbed = new Discord.RichEmbed()
        .setColor(bot.settings.yellow)
        .setTitle("Binary Command")
        .addField("Original Text", input)
        .addField("Binary", output)
        .setFooter(message.author.tag, message.author.displayURL);

    message.channel.send(outputEmbed);

}