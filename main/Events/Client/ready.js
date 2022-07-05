module.exports = {
    name: 'ready',
    once: true,
    async execute(bot) {

        const { REST } = require('@discordjs/rest');
        const fs = require('fs');
        const { Routes } = require('discord-api-types/v9');

        const utils = require('../../Functions/utilities.js');
        let token;

        //Mode Checker
        const packageJSON = require('../../../package.json');

        //Update bot-data.json
        let botdata = require('../../../Data/Global/bot-data.json');
        botdata.info.botName = bot.user.tag;
        botdata.info.botID = bot.user.id;
        botdata.stats.totalGuilds = bot.guilds.cache.size;
        botdata.stats.totalUsers = bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0);
        fs.writeFileSync('./Data/Global/bot-data.json', JSON.stringify(botdata, null, 4), (err) => {
            if (err) return bot.log.post('error', err);
        });

        //Production Mode
        if (bot.settings.mode === 'production') {

            token = bot.settings.connections.token;

            //Starting Status
            bot.user.setPresence({
                activities: [{
                    name: '/help',
                    type: 'WATCHING'
                }],
                status: 'online'
            });

            //Changing Status
            let l = 1;
            setInterval(function() {

                //Useful Values
                let totalGuilds = bot.guilds.cache.size;
                let totalUsers = bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0);

                //Status array
                // let statuses = [`/help`, `on ${totalGuilds} servers`, `with ${totalUsers} users`];
                let statuses = [{
                    name: '/help',
                    type: 'WATCHING'
                }, {
                    name: `on ${totalGuilds} servers!`,
                    type: 'PLAYING'
                }, {
                    name: `with ${totalUsers} users!`,
                    type: 'PLAYING'
                }, {
                    name: 'wiki.benwhybrow.com',
                    type: 'PLAYING'
                }, {
                    name: '/invite',
                    type: 'WATCHING'
                }, {
                    name: `on Version ${packageJSON.version}`,
                    type: 'PLAYING'
                }];

                //Pick from array
                let status = statuses[l];

                //Set as presence
                bot.user.setPresence({
                    activities: [{
                        name: status.name,
                        type: status.type
                    }],
                    status: 'online'
                });

                //Incrementation and Reset
                l++;
                if (l === statuses.length) l = 0;

            }, 300000); // 5 MINUTES

            //Console Log
            bot.log.post('success', `${bot.user.username} Started Successfully in Production Mode. Version: ${packageJSON.version}`);
        }

        //Development Mode
        if (bot.settings.mode === 'development') {

            token = bot.settings.connections.devToken;

            //Status
            let date = new Date();
            bot.user.setPresence({
                activities: [{
                    name: 'In Development Mode',
                    type: 'PLAYING'
                }],
                status: 'dnd'
            });

            //Console Log
            bot.log.post('success', `${bot.user.username} Started Successfully in Development Mode | Date: ${date}`);
        }

        //VERIFICATION FOR SUPPORT DISCORD
        if (bot.settings.options.verifEnabled) {
            utils.resetVerif(bot);
        }

        //Slash commands
        const rest = new REST({
            version: '9'
        }).setToken(token);

        (async () => {
            try {
                if (bot.settings.mode === 'production') {
                    await rest.put(Routes.applicationCommands(bot.user.id), {
                        body: bot.commandsArray
                    });

                    bot.log.post('success', 'Pushed slash commands globally');

                } else if (bot.settings.mode === 'development') {
                    await rest.put(Routes.applicationGuildCommands(bot.user.id, bot.settings.ids.testGuild), {
                        body: bot.commandsArray
                    });

                    bot.log.post('success', 'Pushed guild-only slash commands');


                }
            } catch (error) {
                if (error) return bot.log.post('error', error);
                // fs.writeFileSync(`./Data/Logs/slashOutput.json`, JSON.stringify(error, null, 4), (err) => {
                //   if (err) return bot.log.post("error", err);
                // });
            }
        })();

        /**
     * 
     * Bot Lists
     * 
     */
        // const dbots = require("dbots");
        // const poster = new dbots.Poster({
        //   clientID: '452053607383302145',
        //   apiKeys: {
        //     botsfordiscord: bot.settings.connections.botslist.bfd,
        //     discordbotlist: bot.settings.connections.botslist.dbl,
        //     topgg: bot.settings.connections.botslist.topgg
        //   }, 
        //   clientLibrary: 'discord.js',
        //   serverCount: async () => bot.guilds.cache.size,
        //   userCount: async () => bot.memberCount,
        //   voiceConnections: async () => 0
        // });

        // // Posting Function
        // let post = () => {
        //   poster.post('botsfordiscord');
        //   poster.post('discordbotlist');
        //   // poster.post('topgg');
        //   return bot.log.post("success", "Voting sites updated with guild and user information");
        // }
        // //Initial post
        // post();

        // setTimeout(() => {
        //   post();
        // }, 1800000); // Every 30 minutes! 

        //Refresh Cache
        // try {
        //   bot.guilds.cache.forEach(async (guild) => {
        //     await guild.members.fetch();
        //   });
        // } catch (e) {
        //   console.log(e);
        // }

    }
};