const Discord = require("discord.js");
const utils = require("../main/functions/utilities.js");

module.exports = {
  name: "love",
  category: "fun",
  description: "Calculate the love between you and someone else.",
  usage: "sb!love <@USER>",
  run: async (bot, message, args) => {
    
    let person = utils.getMember(message, args[0]);

    if (!person || message.author.id === person.id) {
      person = message.guild.members
        .filter((m) => m.id !== message.author.id)
        .random();
    }

    const love = Math.random() * 100;
    const loveIndex = Math.floor(love / 10);
    const loveLevel = "💓".repeat(loveIndex) + "💔".repeat(10 - loveIndex);

    bot.createEmbed("success","",``,[{name: `**${person.displayName}** loves **${message.member.displayName}** this much:`,value: `💟${Math.floor(love)}%\n\n${loveLevel}`,},],`${message.guild.name}`,bot)
      .then((embed) => message.channel.send(embed))
      .catch((error) => bot.log.post("error", error));
  },
};
