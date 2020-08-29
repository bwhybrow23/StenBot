module.exports = {
  name: "zalgo",
  category: "fun",
  description: "Make the text look l̻̗̠ik͐̇̂e t̢͟h͘͢҉̷͜iṣ̹͖.",
  usage: "sb!zalgo <MESSAGE>",
  permission: "EVERYONE",
  run: async (bot, message, args) => {

    const zalgo = require("zalgolize");
    if (!message.guild) return;

    const sayMessage = args.join(" ");
    message.channel.send(`\u180E${zalgo(sayMessage, 0.3, [12, 6, 12])}`);
  },
};
