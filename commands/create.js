exports.run = (bot, message, args) => {

    const Discord = require("discord.js");
    const fs = require("fs");

    const config = JSON.parse(fs.readFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, "utf8"));

    if (config.staffadminenabled == false) {
        return message.channel.send({
            embed: {
                color: bot.settings.red,
                description: `Error! Admin commands are disabled. To use them, enable them with **.config-staff admin enable**`
            }
        });
    };

    var type = args[0];

    if (!type) {
        let helpEmbed = new Discord.RichEmbed()
            .setColor("#a905fc")
            .setTitle("Command: Create")
            .addField("Description:", "Create a text or voice channel", true)
            .addField("Usage", ".create <type> <name> {category}", true)
            .addField("Example", ".create voice Music Channel")
            .addField("Note", "You can only assign a category to a text channel. Join the name of a text channel with `-`")
            .setFooter(`${message.author.tag}`, `${message.author.avatarURL}`);

        message.channel.send(helpEmbed);
    }

    if (message.member.hasPermission("ADMINISTRATOR") == false) {
        return message.channel.send({
            embed: {
                color: bot.settings.red,
                description: `Error! You do not have permission to issue this command!`
            }
        });
    };

    if (type == "voice" || "v") {
        var n = args.slice(1).join(" ");
        if (n.length > 100) {
            return message.channel.send({
                embed: {
                    color: bot.settings.red,
                    description: `The voice channel name has to be between 1 and 100 in **length**`
                }
            })
        };
        message.guild.createChannel(`${n}`, "voice").then(channel => {
            message.channel.send({
                embed: {
                    color: bot.settings.green,
                    description: `The voice channel **${channel.name}** has been created.`
                }
            });
        });
    };

    if (type == "text" || "t") {
        var n = args[1];
        var cat = args.slice(2).join(" ") || "None";

        if (n.length > 100) {
            return message.channel.send({
                embed: {
                    color: bot.settings.red,
                    description: `The voice channel name has to be between 1 and 100 in **length**`
                }
            })
        };

        if (cat.length > 1024) {
            return message.channel.send({
                embed: {
                    color: bot.settings.red,
                    description: `The channel topic has to be less that 1024 characters.`
                }
            })
        };


        message.guild.createChannel(`${n}`, "text").then(channel => {
            channel.setTopic(`${cat}`);
            message.channel.send({
                embed: {
                    color: bot.settings.green,
                    description: `The channel **${channel.name}** has been created.`
                }
            });
        });
    };
};