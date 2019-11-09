//Define
const Discord = require("discord.js");
const bot = new Discord.Client();
const {
    promisify
} = require("util");
const readdir = promisify(require("fs").readdir);
const settings = require("./main/settings.json");
const fs = require("fs");
const os = require("os");
const colors = require("colors");
const schedule = require("node-schedule");
// const Sequelize = require('sequelize');
// require('sqlite3');

//FUNCTIONS
const logger = require("./main/functions/console.js");
const utils = require("./main/functions/utilities.js");
const reactionFunctions = require("./main/functions/reactions.js");

//Lets make the settings file available everywhere
bot.settings = settings;

//COMMAND-USAGE.JSON UPDATES
const cmdusage = JSON.parse(fs.readFileSync("./data/global/command-usage.json", "utf8"));
//TOTAL
var addCmdToTotal = () => {
    cmdusage.total = parseInt(cmdusage.total) + 1;
    fs.writeFileSync('./data/global/command-usage.json', JSON.stringify(cmdusage))
};
//ADMIN
var addCmdToAdmin = () => {
    cmdusage.sub.admin = parseInt(cmdusage.sub.admin) + 1;
    fs.writeFileSync('./data/global/command-usage.json', JSON.stringify(cmdusage))
};
//BOT
var addCmdToBot = () => {
    cmdusage.sub.bot = parseInt(cmdusage.sub.bot) + 1;
    fs.writeFileSync('./data/global/command-usage.json', JSON.stringify(cmdusage))
};
//CONFIG
var addCmdToConfig = () => {
    cmdusage.sub.config = parseInt(cmdusage.sub.config) + 1;
    fs.writeFileSync('./data/global/command-usage.json', JSON.stringify(cmdusage))
};
//CUSTOM
var addCmdToCustom = () => {
    cmdusage.sub.custom = parseInt(cmdusage.sub.custom) + 1;
    fs.writeFileSync('./data/global/command-usage.json', JSON.stringify(cmdusage))
};
//ECO
var addCmdToEco = () => {
    cmdusage.sub.eco = parseInt(cmdusage.sub.eco) + 1;
    fs.writeFileSync('./data/global/command-usage.json', JSON.stringify(cmdusage))
};
//FUN
var addCmdToFun = () => {
    cmdusage.sub.fun = parseInt(cmdusage.sub.fun) + 1;
    fs.writeFileSync('./data/global/command-usage.json', JSON.stringify(cmdusage))
};
//GENERAL
var addCmdToGeneral = () => {
    cmdusage.sub.general = parseInt(cmdusage.sub.general) + 1;
    fs.writeFileSync('./data/global/command-usage.json', JSON.stringify(cmdusage))
};
//MOD
var addCmdToMod = () => {
    cmdusage.sub.mod = parseInt(cmdusage.sub.mod) + 1;
    fs.writeFileSync('./data/global/command-usage.json', JSON.stringify(cmdusage))
};
//TICKETING
var addCmdToTicketing = () => {
    cmdusage.sub.ticketing = parseInt(cmdusage.sub.ticketing) + 1;
    fs.writeFileSync('./data/global/command-usage.json', JSON.stringify(cmdusage))
};
//SUPPORT DISCORD
var addCmdTosupportDiscord = () => {
    cmdusage.sub.supportDiscord = parseInt(cmdusage.sub.supportDiscord) + 1;
    fs.writeFileSync('./data/global/command-usage.json', JSON.stringify(cmdusage))
}

//Command handler
bot.on("message", message => {
    if (message.author.bot) return;
    if (message.content.indexOf(bot.settings.prefix) !== 0) {
        const config = JSON.parse(fs.readFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, "utf8"));
        //Check if its an url
        if (config.stafflinkblocker) {
            var checker = require("is-url");
            if (checker(message.content)) {
                message.delete();
                return;
            };
        };
        //Check if it contains words from filter
        if (config.stafffilter.some(word => message.content.includes(word))) {
            message.delete();
            return;
        };
        return;
    };
    const args = message.content.slice(bot.settings.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    try {
        let adminFile = require(`./commands/admin/${command}.js`);
        adminFile.run(bot, message, args);

        //Command-usage.json updates
        addCmdToTotal();
        addCmdToAdmin();
    } catch (err) {
        //Only enable these two for development puposes or else spam
        //console.error('[SYSTEM]'.grey, 'Command Not Found.'.red);
        // console.log('[SYSTEM]'.grey, err);
    };
    try {
        let botFile = require(`./commands/bot/${command}.js`);
        botFile.run(bot, message, args);

        //Command-usage.json updates
        addCmdToTotal();
        addCmdToBot();
    } catch (err) {
        //Only enable these two for development puposes or else spam
        //console.error('[SYSTEM]'.grey, 'Command Not Found.'.red);
        // console.log('[SYSTEM]'.grey, err);
    }
    try {
        let configFile = require(`./commands/config/${command}.js`);
        configFile.run(bot, message, args);

        //Command-usage.json updates
        addCmdToTotal();
        addCmdToConfig();
    } catch (err) {
        //Only enable these two for development puposes or else spam
        //console.error('[SYSTEM]'.grey, 'Command Not Found.'.red);
        // console.log('[SYSTEM]'.grey, err);
    }
    try {
        let customFile = require(`./commands/custom/${command}.js`);
        customFile.run(bot, message, args);

        //Command-usage.json updates
        addCmdToTotal();
        addCmdToCustom();
    } catch (err) {
        //Only enable these two for development puposes or else spam
        //console.error('[SYSTEM]'.grey, 'Command Not Found.'.red);
        // console.log('[SYSTEM]'.grey, err);
    }
    try {
        let ecoFile = require(`./commands/eco/${command}.js`);
        ecoFile.run(bot, message, args);

        //Command-usage.json updates
        addCmdToTotal();
        addCmdToEco();
    } catch (err) {
        //Only enable these two for development puposes or else spam
        //console.error('[SYSTEM]'.grey, 'Command Not Found.'.red);
        // console.log('[SYSTEM]'.grey, err);
    }
    try {
        let funFile = require(`./commands/fun/${command}.js`);
        funFile.run(bot, message, args);

        //Command-usage.json updates
        addCmdToTotal();
        addCmdToFun();
    } catch (err) {
        //Only enable these two for development puposes or else spam
        //console.error('[SYSTEM]'.grey, 'Command Not Found.'.red);
        // console.log('[SYSTEM]'.grey, err);
    }
    try {
        let generalFile = require(`./commands/general/${command}.js`);
        generalFile.run(bot, message, args);

        //Command-usage.json updates
        addCmdToTotal();
        addCmdToGeneral();
    } catch (err) {
        //Only enable these two for development puposes or else spam
        //console.error('[SYSTEM]'.grey, 'Command Not Found.'.red);
    }
    try {
        let modFile = require(`./commands/mod/${command}.js`);
        modFile.run(bot, message, args);

        //Command-usage.json updates
        addCmdToTotal();
        addCmdToMod();
    } catch (err) {
        //Only enable these two for development puposes or else spam
        //console.error('[SYSTEM]'.grey, 'Command Not Found.'.red);
        // console.log('[SYSTEM]'.grey, err);
    }
    try {
        let ticketingFile = require(`./commands/ticketing/${command}.js`);
        ticketingFile.run(bot, message, args);

        //Command-usage.json updates
        addCmdToTotal();
        addCmdToTicketing();
    } catch (err) {
        //Only enable these two for development puposes or else spam
        //console.error('[SYSTEM]'.grey, 'Command Not Found.'.red);
        // console.log('[SYSTEM]'.grey, err);
    }
    try {
        let supportDiscordFile = require(`./commands/supportDiscord/${command}.js`)
        supportDiscordFile.run(bot, message, args);

        //Command-usage.json updates
        addCmdToTotal();
        addCmdTosupportDiscord();
    } catch (err) {
        //Only enable these two for development puposes or else spam
        //console.error('[SYSTEM]'.grey, 'Command Not Found.'.red);
        // console.log('[SYSTEM]'.grey, err);
    }
});

/**
 * Event Handler
 * 
 * Read in each event file from ./main/events and then setup listeners for each event
 * on the bot client. Each event will be called with `bot, ...args`, i.e. it's normal
 * parameters preceeded with a reference to the bot client.
 */
(async () => {
    let events = await readdir("./main/events/");
    events.forEach(file => {
        const name = file.slice(0, -3);
        const event = require(`./main/events/${file}`);
        //Stole this line as it was so much better than what I had:
        bot.on(name, event.bind(null, bot));
    });
})();

//Usage Statistics
const memusage = JSON.parse(fs.readFileSync("./data/global/memory-usage.json", "utf8"));
var getMemUsage = () => {
    const arr = [1, 2, 3, 4, 5, 6, 9, 7, 8, 9, 10];
    arr.reverse();
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    return Math.round(used * 100) / 100
};
bot.setInterval(function() {
    memusage.memory = getMemUsage()
    fs.writeFileSync('./data/global/memory-usage.json', JSON.stringify(memusage, null, 4))
}, 30000);
bot.setInterval(function() {
    let memoryusage = getMemUsage();
    let guilds = bot.guilds.size;
    let ping = Math.floor(bot.ping);
    console.log(`[INFO]`.grey, `Memory Usage: ${memoryusage}`.yellow, `\n[INFO]`.grey, `Ping: ${ping}`.yellow, `\n[INFO]`.grey, `Guilds: ${guilds}`.yellow);
}, 300000);


//TOKENS FOR CONNECTING
// bot.login(bot.settings.connections.devToken);
bot.login(bot.settings.connections.token);
