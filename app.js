/**
 *
 * Definitions
 *
 */
const { Client, Collection } = require("discord.js");
const settings = require("./main/settings.json");
const fs = require("fs");
const mongoose = require("mongoose");
const bot = new Client({
  "intents": [
    "GUILDS",
    "GUILD_MEMBERS",
    "GUILD_BANS",
    "GUILD_MESSAGES",
    "GUILD_MESSAGE_REACTIONS",
    "GUILD_PRESENCES",
    "DIRECT_MESSAGES",
    "DIRECT_MESSAGE_REACTIONS"
  ]
});

/**
 *
 * GLOBAL VALUES
 *
 */
//Logger
const logUtils = require("./main/functions/logUtils.js");
bot.log = logUtils;

//Settings File
bot.settings = settings;

//Embed Functions
const embedUtils = require("./main/functions/embedUtils.js");
bot.createEmbed = embedUtils.createEmbed;
bot.noPermsEmbed = embedUtils.noPermsEmbed;
bot.helpEmbed = embedUtils.helpEmbed;
bot.eventEmbed = embedUtils.eventEmbed;

//Event Functions
const efunctions = require("./main/functions/eventUtils.js");
bot.efunctions = efunctions;

//Timeout Utils
const {
  TimeoutUtils
} = require("./main/functions/timeoutUtils");
const timeouts = new TimeoutUtils(bot);
bot.timeouts = timeouts;

//Punishment Utils
const {
  PunishmentUtils
} = require("./main/functions/punishmentUtils.js");
const punishments = new PunishmentUtils(bot);
bot.punishments = punishments;

//General Utils
const utils = require("./main/functions/utils.js");
bot.utils = utils;

/**
 *
 * COMMAND HANDLER
 *
 */
bot.commands = new Collection();
bot.aliases = new Collection();
bot.cooldowns = new Collection();
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
const botData = JSON.parse(fs.readFileSync("./data/global/bot-data.json", "utf8"));

function getMemUsage() {
  const arr = [1, 2, 3, 4, 5, 6, 9, 7, 8, 9, 10];
  arr.reverse();
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  return Math.round(used * 100) / 100;
};
setInterval(function() {
  botData.info.memoryUsage = getMemUsage();
  fs.writeFileSync("./data/global/bot-data.json", JSON.stringify(botData, null, 4));
}, 600000);
setInterval(function() {
  let memoryusage = getMemUsage();
  let guilds = bot.guilds.cache.size;
  let ping = Math.floor(bot.ws.ping);
  bot.log.post("info", `Memory Usage: ${memoryusage} || Ping: ${ping} || Guilds: ${guilds}`);
}, 600000);

/**
 *
 * MODE CHECKER
 *
 */
let mongo, token;
if (bot.settings.mode === "production") {
  mongo = bot.settings.mongo;

  token = bot.settings.connections.token;
} else if (bot.settings.mode === "development") {
  mongo = bot.settings.mongoDev;

  token = bot.settings.connections.devToken;
  // token = bot.settings.connections.token;
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

mongoose.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  bot.log.post("success", "MongoDB connection successful")
}).catch(error => bot.log.post("error", `MongoDB connection unsuccessful: ${error}`));

//Globally
const mutils = require("./main/functions/mongoUtils");
bot.mutils = mutils;

/**
 *
 * API & WEBSITE
 *
 */
const express = require('express');
const app = express();
const cors = require('cors');
const path = require("path");
const port = bot.settings.options.apiPort;

//Middleware
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cors());

app.use("/assets", express.static("main/website/assets"));
app.set('views', path.join(__dirname, 'main/website/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.listen(port, () => {
  bot.log.post("success", `Webserver server started on port ${port}`);
});

//Routers
fs.promises.readdir(path.join(__dirname, "./main/routers"))
  .then(files => {
    files.forEach(file => {
      if (file.split(".")[1] === "js") {
        let router = require(`./main/routers/${file}`);
        app.use(router);
      };
    });
  });

//EXPORT BOT MODULE (DONT PUT ANYTHING BELOW THIS)
module.exports = bot;

/**
 *
 * END OF APP.JS
 *
 */