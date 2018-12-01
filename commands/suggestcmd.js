const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let suggestionMessage = args.join(" ");

    let suggestCMDHelp = new Discord.RichEmbed()
    .setColor("#a905fc")
    .setTitle("Command: Suggest Command")
    .addField("Description:", "Suggest a command/module to be added to the bot!", true)
    .addField("Usage", ".suggestcmd <suggestion>", true)
    .addField("Example", ".suggestcmd A derp command")
    .addField("Note", "Your suggestion is DM'd through the bot to Stentorian#1202 who will evaluate it and contact you if it is added!");

    if(!suggestionMessage) return message.channel.send(suggestCMDHelp);

    let stentorian = bot.users.get("346246641595973633");

    let suggestionEmbed = new Discord.RichEmbed()
    .setColor("#303fc9")
    .setDescription("New Suggestion!")
    .setAuthor(message.author.username)
    .addField("Suggestion", suggestionMessage)
    .addField("Suggested by", `${message.author.username}`)
    .setFooter(`AntiGamingChair Command Suggestion from ${message.author.username}`)

    message.delete().catch();

    stentorian.send(suggestionEmbed)
  
}

module.exports.help = {
  name: "suggestcmd"
}
