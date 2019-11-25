const Discord = require("discord.js");
const utils = require("../../main/functions/utilities.js");

module.exports = {
    name: "love",
    aliases: ["Affinity"],
    category: "fun",
    description: "Calculate the love between you and someone else.",
    usage: ".love {@user}",
    run: async (bot, message, args) => {
        let person = utils.getMember(message, args[0]);

        if (!person || message.author.id === person.id) {
            person = message.guild.members
            .filter(m => m.id !== message.author.id)
            .random()
        }

        const love = Math.random() * 100;
        const loveIndex = Math.floor(love / 10);
        const loveLevel = "💓".repeat(loveIndex) + "💔".repeat(10 - loveIndex);

        const embed = new Discord.RichEmbed()
            .setColor(bot.settings.color.green)
            .addField(`**${person.displayName}** loves **${message.member.displayName}** this much:`,
            `💟${Math.floor(love)}%\n\n${loveLevel}`)
            .setFooter(`${message.author.tag}`, `${message.author.avatarURL}`);

        message.channel.send(embed);
        }
}
