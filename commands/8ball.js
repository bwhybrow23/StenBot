exports.run = (bot, message, args) => {

    const Discord = require("discord.js");

    let ballHelp = new Discord.RichEmbed()
        .setColor("#a905fc")
        .setTitle("Command: 8ball")
        .addField("Description:", "Predict your future with questions!", true)
        .addField("Usage", "`.8ball <question>`", true)
        .addField("Example", "`.8ball Is StenBot a good bot?`")
        .addField("Note", "The responses are completely random and this is only a game!")
        .setFooter(`${message.author.tag}`, `${message.author.avatarURL}`);

    if (!args[0]) return message.channel.send(ballHelp);

    var replies = [
        "Yes.",
        "No.",
        "I don't know.",
        "Ask again later.",
        "Umm...",
        "Questionable.",
        "Maybe.",
        "Ask someone else.",
        "There's a possibility.",
        "Never."
    ]

    let result = Math.floor((Math.random() * replies.length));
    let question = args.slice(0).join(" ");

    let ballEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.tag)
        .setColor("#000000")
        .addField("Question", question)
        .addField("Answer", replies[result])
        .setFooter(`${message.author.tag}`, `${message.author.avatarURL}`);

    message.channel.send("The 8ball is working it's magic! :tada:").then(m => {
            setTimeout(() => {
                m.edit(ballEmbed)
            }, 1000)
        })
        .catch(e => {
            console.log(e);
        });

};