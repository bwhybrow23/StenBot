//Define
const {
  Client,
  Collection
} = require("discord.js");
const {
  promisify
} = require("util");
const readdir = promisify(require("fs").readdir);
const settings = require("./main/settings.json");
const fs = require("fs");
const os = require("os");
const colors = require("colors");
// const schedule = require("node-schedule");
const mongoose = require("mongoose");

//CREATE DISCORD BOT
const bot = new Client();

//FUNCTIONS
const logUtils = require("./main/functions/logUtils.js");
const utils = require("./main/functions/utilities.js");
const reactionFunctions = require("./main/functions/reactionUtils.js");
const packageJSON = require("./package.json");

//Global logger
bot.log = logUtils;

//Lets make the settings file available everywhere
bot.settings = settings;

// Embed Function Available Everywhere
const {
  createEmbed,
  noPermsEmbed,
  helpEmbed,
  eventEmbed
} = require("./main/functions/embedUtils.js");
bot.createEmbed = createEmbed;
bot.noPermsEmbed = noPermsEmbed;
bot.helpEmbed = helpEmbed;
bot.eventEmbed = eventEmbed;
bot.packageJSON = packageJSON;

//Discord-Moderation Module (For Muting)
const {
  Moderator
} = require("discord-moderation");
const moderator = new Moderator(bot, {
  storage: './data/global/cases.json',
  updateCountdownEvery: 5000
});
bot.moderator = moderator;

//NEW COMMAND HANDLER
bot.commands = new Collection();
bot.aliases = new Collection();

bot.categories = fs.readdirSync("./commands/");

["command"].forEach((handler) => {
  require(`./main/handlers/${handler}`)(bot);
});

/*
// Status fixer thingy (runs every 6h)
function fixStatus() {
  //Production Mode
  if (bot.settings.mode === "production") {
      //Status
      let guilds = bot.guilds.cache.size;
      bot.user.setPresence({
          activity: {
              name: `sb!help on ${guilds} servers!`,
              type: `WATCHING`
          },
          status: 'online'
      });

      //Console Log
      bot.log.post("info", `Status has been set successfully.`);
  }
}
setInterval(fixStatus, 21600000);
*/

/**
* Event Handler
*
* Read in each event file from ./main/events and then setup listeners for each event
* on the bot client. Each event will be called with `bot, ...args`, i.e. it's normal
* parameters preceeded with a reference to the bot client.
*/
// New
const {
  readdirSync
} = require("fs");
let events = readdirSync("./main/events/");
events.forEach((file) => {
  const name = file.slice(0, -3);
  const event = require(`./main/events/${file}`);
  bot.on(name, event.bind(null, bot));
});

//Usage Statistics
const memusage = JSON.parse(
  fs.readFileSync("./data/global/bot-data.json", "utf8")
);
var getMemUsage = () => {
  const arr = [1, 2, 3, 4, 5, 6, 9, 7, 8, 9, 10];
  arr.reverse();
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  return Math.round(used * 100) / 100;
};
bot.setInterval(function() {
  memusage.memoryUsage = getMemUsage();
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

//MongoDB
const connectionURL = `mongodb://${mongo.user}:${mongo.password}@${mongo.host}:${mongo.port}/${mongo.database}?authSource=admin`;
bot.log.post("info", `Creating MongoDB connection at ${mongo.host}:${mongo.port}`)

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  bot.log.post("success", "MongoDB connection successful")
}).catch(error => bot.log.post("error", `MongoDB connection unsuccessful: ${error}`));

//Mongo Stuff Global
const mutils = require("./main/functions/mongoUtils");
bot.mutils = mutils;

const { TimeoutUtils } = require("./main/functions/timeoutUtils");
const timeouts = new TimeoutUtils(bot);
bot.timeouts = timeouts;

// Global API
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
