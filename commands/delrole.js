exports.run = (bot, message, args) => {

    const Discord = require("discord.js");
    const fs = require("fs");
    var r = message.mentions.roles.first();

    const config = JSON.parse(fs.readFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, "utf8"));

    if (config.staffadminenabled == false) {
        return message.channel.send({
            embed: {
                color: bot.settings.red,
                description: `Error! Admin commands are disabled. To use them, enable them with **.config-staff admin enable**`
            }
        });
    };



    if (r == undefined) {
        return message.channel.send({
            embed: {
                color: bot.settings.red,
                description: `Error! You forgot to mention a role to remove!`
            }
        });
    };

    if (message.member.hasPermission("ADMINISTRATOR") == false) {
        return message.channel.send({
            embed: {
                color: bot.settings.red,
                description: `Error! You do not have permission to issue this command!`
            }
        });
    };

    var bm = message.guild.members.get(bot.user.id);

    console.log(r.position);
    console.log(bm.highestRole.position);

    if (r.position > bm.highestRole.position) {
        return message.channel.send({
            embed: {
                color: bot.settings.red,
                description: `Error! I am unable to delete this role!`
            }
        });
    } else {
        var name = r.name;
        r.delete()
        return message.channel.send({
            embed: {
                color: bot.settings.green,
                description: `Deleted role **${name}** requested by **${message.author.tag}**`
            }
        });
    };


};