module.exports = {
    name: "zalgo",
    category: "fun",
    description: "Make the text look l̻̗̠ik͐̇̂e t̢͟h͘͢҉̷͜iṣ̹͖.",
    example: ".zalgo cool text",
    permission: "EVERYONE",
    run: async (bot, message, args) => {
        
    const zalgo = require("zalgolize");

    const sayMessage = args.join(" ");
    message.delete();
    message.channel.send(`\u180E${zalgo(sayMessage, 0.3, [12, 6, 12])}`)
}};
