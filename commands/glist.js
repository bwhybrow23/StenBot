exports.run = async (bot, message, args) => {

    const snekfetch = require('snekfetch');
    bot.hastebinit = (input, extension) => { //replace <bot> with what your client is defined as
        return new Promise(function(res, rej) {
            if (!input) rej("Input argument is required.");
            snekfetch.post("https://hasteb.in/documents%22").send(input).then(body => {
                res("https://hasteb.in/" + body.body.key + ((extension) ? "." + extension : ""));
            }).catch(e => rej(e));
        })
    };

    const discord = require('discord.js');
    const moment = require("moment");
    const table = require('table');
    const abbreviate = require('number-abbreviate');

    let generated = `${moment().format("MM-DD-YYYY | hh:mm:ss")} UTC`;
    let guildtable = [
        ['#', 'Guild Name', 'Guild ID', 'Guild Owner ID', 'Normal Users', 'Bot Users', 'Total Users']
    ];
    let guilds = ` My Guilds:
Total Guilds: ${abbreviate(bot.guilds.size, 2)}

Text Channels: ${abbreviate(bot.channels.filter(c => c.type === 'text').size, 2)}
Voice Channels: ${abbreviate(bot.channels.filter(c => c.type === 'voice').size, 2)}
Category Channels: ${abbreviate(bot.channels.filter(c => c.type === 'category').size, 2)}
Total Channels: ${abbreviate(bot.channels.size, 2)}

Normal Users: ${abbreviate(bot.users.filter(m => m.bot == false).size, 2)}
Bot Users: ${abbreviate(bot.users.filter(m => m.bot).size, 2)}
Total Users: ${abbreviate(bot.users.size, 2)}\n\n`
    let i = 0
    bot.guilds.sort((a, b) => b.members.filter(m => m.user.bot == false).size - a.members.filter(m => m.user.bot == false).size).forEach(g => {
        i++;
        guildtable.push([i, g.name, g.id, g.owner ? g.owner.user.id : "???", g.members.filter(m => m.user.bot == false).size, g.members.filter(m => m.user.bot).size, g.members.size]);
    })
    let entireThing = guilds + table.table(guildtable) + `\n\nGenerated @ ${generated}`
    bot.hastebinit(entireThing).then(r => {
        let embed = new discord.RichEmbed()
            .setDescription(r)
            .setColor(bot.settings.yellow)
        message.channel.send({
            embed
        });
    }).catch(console.error);
}