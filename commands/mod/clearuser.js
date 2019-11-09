module.exports = {
    name: "clearuser",
    category: "mod",
    description: "Clear all messages from a specific user.",
    example: ".clearuser @Danny 100",
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


    var amount = args[0];
    if (amount == undefined) {
        return message.channel.send({
            embed: {
                color: bot.settings.color.red,
                description: `Error! You didn't include an amount of messages to clear!`
            }
        });
    };

    if (isNaN(amount)) {
        return message.channel.send({
            embed: {
                color: bot.settings.color.red,
                description: `Error! The amount of messages you are clearing needs to be a number!`
            }
        });
    };


    if (amount > 100) {
        return message.channel.send({
            embed: {
                color: bot.settings.color.red,
                description: `Error! You cant clear more than 100 messsages at a time!`
            }
        });
    };

    if (amount < 1) {
        return message.channel.send({
            embed: {
                color: bot.settings.color.red,
                description: `Error! You cant clear less than 1 message!`
            }
        });
    };

    var targetuser = message.mentions.members.first();

    if (targetuser == undefined) {
        return message.channel.send({
            embed: {
                color: bot.settings.color.red,
                description: `Error! You need to include someone to clear the messages from.`
            }
        });
    };

    message.channel.fetchMessages({
        limit: amount,
    }).then((messages) => {
        message.delete();
        const filterBy = targetuser ? targetuser.id : bot.user.id;
        messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
        message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
    });

    message.channel.send({
        embed: {
            color: bot.settings.color.green,
            description: `Successfully cleared **${amount}** messages from **${targetuser.user.tag}**`
        }
    });



}};
