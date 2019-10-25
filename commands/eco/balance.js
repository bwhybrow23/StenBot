module.exports = {
    name: "balanace",
    category: "eco",
    description: "Check your balance.",
    example: ".balance",
    permission: "EVERYONE",
    run: async (bot, message, args) => {

    const Discord = require("discord.js");
    const fs = require("fs");
    const db = require('quick.db')

    let person = message.mentions.users.first() || message.author;

    let helpE = new Discord.RichEmbed()
        .setColor(bot.settings.color.blue)
        .setTitle("Command: Balance")
        .addField("Description:", "Find out yours or another user's balance.", true)
        .addField("Usage", "`.balance {@user}`", true)
        .setFooter(message.author.tag, message.author.avatarURL)
        .setTimestamp();

    if (!person) return message.channel.send(helpE);

    if (person.id === message.author.id) {
        let bal = db.fetch(`money_${message.author.id}`)
        if (bal === null) bal = 0;
        const embed1 = new Discord.RichEmbed()
            .setColor(bot.settings.color.blue)
            .setTitle("Balance")
            .setDescription(`You currently have a balance of **${bal}** coins.`)
            .setTimestamp()
            .setAuthor(message.author.tag, message.author.displayURL);
        message.channel.send(embed1);
    } else {
        let bal = db.fetch(`money_${message.author.id}`)
        if (bal === null) bal = 0;
        const embed2 = new Discord.RichEmbed()
            .setColor(bot.settings.color.blue)
            .setTitle(`${person.tag}'s Balance`)
            .setDescription(`${person.tag} currently has a balance of **${bal}** coins.`)
            .setTimestamp()
            .setFooter(message.author.tag, message.author.displayURL);
        message.channel.send(embed2);
    }

}};
