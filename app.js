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
var utils = require('bot-utils');

//Lets make the settings file available everywhere
bot.settings = settings;

//Add another command to total amount of commands executed function
const cmdusage = JSON.parse(fs.readFileSync("./data/global/command-usage.json", "utf8"));
var addCmdToTotal = () => {
    cmdusage.total = parseInt(cmdusage.total) + 1;
    fs.writeFileSync('./data/global/command-usage.json', JSON.stringify(cmdusage))
};

//Command handler
bot.on("message", message => {
    if (message.author.bot) return;
    //Gotta make sure we thank tod for his hard work
    if (message.content == "tod") return message.channel.send("sucks");
    if (message.content.indexOf(settings.prefix) !== 0) {
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
    const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    try {
        let commandFile = require(`./commands/${command}.js`);
        commandFile.run(bot, message, args);
        //Add to cmd used total
        addCmdToTotal();
    } catch (err) {
        //Only enable these two for development puposes or else spam
        //console.error('[SYSTEM]'.grey, 'Command Not Found.'.red);
        console.log('[SYSTEM]'.grey, err);
    };
});

//Event Handler (O)
const ehandler = async () => {
    var efiles = await readdir("./main/events/");
    efiles.forEach(file => {
        var ename = /*Should Work*/ file.split(".")[0];
        var event = require(`./main/events/${file}`);
        //Stole this line as it was so much better than what I had:
        bot.on(ename, event.bind(null, bot));
    });
};
ehandler();

let guildSize = bot.guilds.size;

//playing statuses
var presences = [
    "StenDevelopment",
    ".help",
    "With Code",
    `On ${guildSize} servers!`,
    `Version ${settings.version}`
]

//Ready event
bot.on("ready", () => {
    let date = new Date;
    console.log('[SYSTEM]'.grey, `StenBot Started Successfully. Version: ${settings.version}`.green);

    //changes playing status every X seconds
    bot.user.setActivity(utils.randItemFromArray(presences)).then(() => {
        setTimeout(() => {
            bot.user.setActivity(utils.randItemFromArray(presences))
        }, 600000)
    });
});

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


//bot.login(settings.devtoken);
bot.login(settings.token);