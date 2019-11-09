const Discord = require('discord.js');
const fetch = require('superagent');
const url = "https://mcapi.us/server/status?ip="

exports.run = async (bot, message, args) => {

    if (!args.length) {
        return message.channel.send({
            embed: {
                color: bot.settings.color.green,
                description: "**Usage:** `.mcping [server ip] [Optional: port]`\n**__Note:__** Its better to only add a port if its different than `25565`",
                footer: {
                    icon_url: message.author.avatarURL
                }
            }
        })
    }

    const ip = args[0];
    if (args[1]) {
        const port = args[1]
    }

    let request = await fetch.get(args[1] ? url + `&port=${port}` : url + ip)
    let res = request.body
    if (res.status !== "success") {
        return message.channel.send({
            embed: {
                color: bot.settings.color.red,
                description: `Something was wrong! Probably an invalid ip or port.`,
                footer: {
                    icon_url: message.author.avatarURL
                }
            }
        })
    }

    var players = 0
    if (res.players.now) {
        players += res.players.now;
    } else {
        players += 0
    };

    if (res.online) {
        let onlineEmbed = new Discord.RichEmbed()
            .setColor(bot.settings.color.green)
            .setTitle("Server Status:")
            .addField("IP:", ip)
            .addField("Status:", "Online")
            .addField("Player Count:", `${players}/${res.players.max}`)
            .addField("Server Version:", res.server.name)
            .addField("MOTD:", res.motd)
            .setFooter(message.author.tag, message.author.avatarURL);

        message.channel.send(onlineEmbed);
    };

    if (!res.online) {
        let offlineEmbed = new Discord.RichEmbed()
            .setColor(bot.settings.color.red)
            .setTitle("Server Status:")
            .addField("IP:", ip)
            .addField("Status:", "Offline")
            .setFooter(message.author.tag, message.author.avatarURL);

        message.channel.send(offlineEmbed);
    }

}