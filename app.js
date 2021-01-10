/**
*
* Definitions
*
*/
const { Client, Collection } = require("discord.js");
const settings = require("./main/settings.json");
const fs = require("fs");
const mongoose = require("mongoose");
//CREATE DISCORD BOT
const bot = new Client();

/**
*
* Utility Functions
*
*/
const logUtils = require("./main/functions/logUtils.js");
const utils = require("./main/functions/utilities.js");
const reactionFunctions = require("./main/functions/reactionUtils.js");

/**
*
* GLOBAL VALUES
*
*/
//Logger
bot.log = logUtils;
//Settings File
bot.settings = settings;
//Embed Functions
const { createEmbed, noPermsEmbed, helpEmbed, eventEmbed } = require("./main/functions/embedUtils.js");
bot.createEmbed = createEmbed;
bot.noPermsEmbed = noPermsEmbed;
bot.helpEmbed = helpEmbed;
bot.eventEmbed = eventEmbed;
//Package.JSON FIle
const packageJSON = require("./package.json");
bot.packageJSON = packageJSON;
//Timeout Utilities
const { TimeoutUtils } = require("./main/functions/timeoutUtils");
const timeouts = new TimeoutUtils(bot);
bot.timeouts = timeouts;

//Discord-Moderation Module (For Muting)
const { Moderator } = require("discord-moderation");
const moderator = new Moderator(bot, {
storage: './data/global/cases.json',
updateCountdownEvery: 5000
});
bot.moderator = moderator;

/**
*
* COMMAND HANDLER
*
*/
bot.commands = new Collection();
bot.aliases = new Collection();

bot.categories = fs.readdirSync("./commands/");

["command"].forEach((handler) => {
require(`./main/handlers/${handler}`)(bot);
});

/**
*
* EVENT HANDLER
*
*/
let events = fs.readdirSync("./main/events/");
events.forEach((file) => {
const name = file.slice(0, -3);
const event = require(`./main/events/${file}`);
bot.on(name, event.bind(null, bot));
});

/**
*
* USAGE STATISTICS
*
*/
const memusage = JSON.parse(fs.readFileSync("./data/global/bot-data.json", "utf8"));
function getMemUsage() {
const arr = [1, 2, 3, 4, 5, 6, 9, 7, 8, 9, 10];
arr.reverse();
const used = process.memoryUsage().heapUsed / 1024 / 1024;
return Math.round(used * 100) / 100;
};
bot.setInterval(function() {
memusage.info.memoryUsage = getMemUsage();
fs.writeFileSync("./data/global/bot-data.json", JSON.stringify(memusage, null, 4));
}, 300000);
bot.setInterval(function() {
let memoryusage = getMemUsage();
let guilds = bot.guilds.cache.size;
let ping = Math.floor(bot.ws.ping);
bot.log.post("info", `Memory Usage: ${memoryusage}`)
bot.log.post("info", `Ping: ${ping}`)
bot.log.post("info", `Guilds: ${guilds}`)
}, 300000);

/**
*
* MODE CHECKER
*
*/
let mongo;
let token;
if (bot.settings.mode === "production") {
mongo = bot.settings.mongo;

token = bot.settings.connections.token;
} else if (bot.settings.mode === "development") {
mongo = bot.settings.mongoDev;

token = bot.settings.connections.devToken
}
//Connect to Discord's API
bot.login(token);

/**
*
* MONGO CONNECTION
*
*/
const connectionURL = `mongodb://${mongo.user}:${mongo.password}@${mongo.host}:${mongo.port}/${mongo.database}?authSource=admin`;
bot.log.post("info", `Creating MongoDB connection at ${mongo.host}:${mongo.port}`)

mongoose.connect(connectionURL, {
useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex: true
}).then(() => {
bot.log.post("success", "MongoDB connection successful")
}).catch(error => bot.log.post("error", `MongoDB connection unsuccessful: ${error}`));

//Globally
const mutils = require("./main/functions/mongoUtils");
bot.mutils = mutils;

/**
*
* API
*
*/
const express = require('express');
const app = express();
const bodyparser = require("body-parser");
const cors = require('cors');
const path = require("path");
const port = bot.settings.options.apiPort;

//Middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
extended: false
}));
app.use(cors());

app.use("/assets", express.static("main/website/assets"));
app.set('views', path.join(__dirname, 'main/website/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.listen(port, () => {
bot.log.post("success", `API server started on ${port}`);
});

//Routers
fs.promises.readdir(path.join(__dirname, "./main/routers"))
.then(files => {
files.forEach(file => {
if (file.split(".")[1] == "js") {
let router = require(`./main/routers/${file}`);
app.use(router);
};
});
});

/**
*
* END OF APP.JS
*
*/