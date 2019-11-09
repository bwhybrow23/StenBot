module.exports = {
    name: "ban",
    category: "mod",
    description: "Permanently Ban a user from your server.",
    example: ".ban @Danny Being an idiot",
    permission: "STAFF",
    run: async (bot, message, args) => {
        
    const Discord = require("discord.js");
    const fs = require("fs");

    var config = JSON.parse(fs.readFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, "utf8"));

    if (config.staffrole == false) {
        return message.channel.send({
            embed: {
                color: bot.settings.color.red,
                description: `Error! A staff role has not been set. Ask an administrator or the server owner to set one.`
            }
        });
    };

    let staffrole = message.guild.roles.get(config.staffrole);

    if (staffrole == undefined) {
        return message.channel.send({
            embed: {
                color: bot.settings.color.red,
                description: `Error! The staff role set is invalid. Ask an administrator or the server owner to set a new one.`
            }
        });
    };

    if (!message.member.roles.has(config.staffrole)) {
        return message.channel.send({
            embed: {
                color: bot.settings.color.red,
                description: `Error! You do not have permission to do that!`
            }
        });
    };

    var targetuser = message.mentions.members.first();

    if (targetuser == undefined) {
        return message.channel.send({
            embed: {
                color: bot.settings.color.red,
                description: `Error! You forgot to mention a user!`
            }
        });

    };

    var reason = args.slice(1).join(" ");

    if (reason.length < 1) {
        return message.channel.send({
            embed: {
                color: bot.settings.color.red,
                description: `Error! You forgot to include a reason!`
            }
        });
    };

    if (!targetuser.bannable) {
        return message.channel.send({
            embed: {
                color: bot.settings.color.red,
                description: `Error! I am unable to ban this user.`
            }
        });
    };




    targetuser.ban(`By ${message.author.id}`);

    message.channel.send({
        embed: {
            color: bot.settings.color.green,
            description: `Successfully banned **${targetuser.user.tag}** for **${reason}**`
        }
    });

}};
