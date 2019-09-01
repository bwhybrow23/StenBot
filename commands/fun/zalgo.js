exports.run = (bot, message, args) => {
    const zalgo = require("zalgolize");

    const sayMessage = args.join(" ");
    message.delete();
    message.channel.send(`\u180E${zalgo(sayMessage, 0.3, [12, 6, 12])}`)
}