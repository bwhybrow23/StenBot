module.exports = {
  name: "ship",
  category: "fun",
  description: "Calculate the love between two people.",
  usage: "<USER1> <USER2>",
  example: "Trump Boris",
  options: { permission: "EVERYONE", aliases: ["love"], enabled: true, guildOnly: true },
  run: async (bot, message, args) => {

    let person1 = args[0];
    let person2 = args[1];

    if (!person1 || !person2) {
      return bot.helpEmbed("ship", bot)
        .then((embed) => message.channel.send(embed));
    }

    const love = Math.random() * 100;
    const loveIndex = Math.floor(love / 10);
    const loveLevel = "💓".repeat(loveIndex) + "💔".repeat(10 - loveIndex);

    bot.createEmbed("info", `${person1} x ${person2}`, `💟${Math.floor(love)}%\n\n${loveLevel}`, [], ``, message)
      .then((embed) => message.channel.send(embed))
      .catch((error) => bot.log.post("error", error));
  },
};