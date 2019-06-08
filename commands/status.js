exports.run = (bot, message, args) => {

    const fs = require('fs');
    const cmdusage = JSON.parse(fs.readFileSync("./data/global/command-usage.json", "utf8"));
    const memusage = JSON.parse(fs.readFileSync("./data/global/memory-usage.json", "utf8"));
    const Discord = require("discord.js");



    let ping = Math.floor(bot.ping);
    let pinghistory = bot.pings;
    let cmdtotal = cmdusage.total;
    let memused = Math.floor(memusage.memory);
    let totalguilds = bot.guilds.size;

    message.channel.send({
        embed: {
            color: bot.settings.green,
            title: 'StenBot Status',
            description: `**Bot Statistics**\n\n**Ping:** ${ping}\n**Ping History:** ${pinghistory}\n**Total Commands Used:** ${cmdtotal}\n**Memory Usage:** ${memused}MB/2GB\n**Total Guilds:** ${totalguilds}\n**Version:** ${bot.settings.version}`
        }
    });

};