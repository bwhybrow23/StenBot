exports.run = (bot, message, args) => {

    const Discord = require("discord.js");
    const ownersid = message.guild.ownerID;
    const adminperm = message.member.hasPermission("ADMINISTRATOR");


    var access = true;

    if (adminperm == false) {
        var access = false;
    };

    if (access == false) {
        if (ownersid == message.author.id) {
            var access = true;
        };
    };

    if (access == false) {
        return message.channel.send({
            embed: {
                color: bot.settings.red,
                description: `Error! You are not the owner or an admin!`
            }
        });
    };

    var msg = args.slice(0).join(" ");
    if (msg.length > 500) { return message.channel.send({embed: {color: bot.settings.red, description: `Error! Your message it too long. It must be less that **500** characters.`}})};
    if (msg.length < 2) { return message.channel.send({embed: {color: bot.settings.red, description: `Error! Your message is too short.`}})};

    message.channel.send({embed: {color: bot.settings.green, description:  `${msg}`, footer: {text: `Say command.`}}});
    message.delete();
};