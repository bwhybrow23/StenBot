module.exports = {
  name: "zalgo",
  category: "fun",
  description: "Make the text look l̻̗̠ik͐̇̂e t̢͟h͘͢҉̷͜iṣ̹͖.",
  usage: "<MESSAGE>",
  example: "Hello World",
  permission: "EVERYONE",
  aliases: [],
  enabled: true,
  run: async (bot, message, args) => {

    const zalgo = require("zalgolize");

    const sayMessage = args.join(" ");
    if(!sayMessage || sayMessage == "help") {
      return bot.helpEmbed("zalgo", bot)
      .then((embed) => message.channel.send(embed))
      .catch((error) => bot.log.post("error", error));
    }

    message.channel.send(`\u180E${zalgo(sayMessage, 0.3, [12, 6, 12])}`);
  },
};
