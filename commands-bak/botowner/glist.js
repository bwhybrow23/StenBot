module.exports = {
    name: 'glist',
    category: 'botowner',
    description: 'Gain a list of all the guilds the bot is in.',
    usage: '',
    example: '',
    options: { permission: 'BOTOWNER', enabled: true, guildOnly: true },
    run: async (bot, message, args) => {

        const Discord = require('discord.js');

        //Permission Check
        if (message.author.id !== bot.settings.ids.botOwner) {
            return;
        }

        let guildList = [];
        bot.guilds.cache.forEach(function(guilds) {
            guildList.push(`${guilds.name} ||  ${guilds.id}`);
        });

        //Split arrays to every N amount
        let n = 25;
        let result = new Array(Math.ceil(guildList.length / n))
            .fill()
            .map(_ => guildList.splice(0, n));

        let page = 1;
        result.forEach((array) => {
            bot.createEmbed('info', '**Guild List**', '', [{
                name: 'Guilds',
                value: `\`\`\`${array.join('\n')}\`\`\``
            }], `Page ${page}`, message)
                .then((embed) => message.reply(embed))
                .catch((error) => bot.log.post('error', error));
            page++;
        });
    }
};