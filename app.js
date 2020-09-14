//Define
const { Client, Collection } = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const settings = require("./main/settings.json");
const fs = require("fs");
const os = require("os");
// const colors = require("colors");
// const schedule = require("node-schedule");
const mongoose = require("mongoose");

//CREATE DISCORD BOT
const bot = new Client();

//FUNCTIONS
const consoleUtils = require("./main/functions/consoleUtils.js");
const utils = require("./main/functions/utilities.js");
const reactionFunctions = require("./main/functions/reactionUtils.js");

//Global logger
bot.logger = consoleUtils.post;

//Lets make the settings file available everywhere
bot.settings = settings;

// Embed Function Available Everywhere
const { createEmbed, noPermsEmbed, helpEmbed } = require("./main/functions/embedUtils.js");
bot.createEmbed = createEmbed;
bot.noPermsEmbed = noPermsEmbed;
bot.helpEmbed = helpEmbed;

//Discord-Moderation Module (For Muting)
const { Moderator } = require("discord-moderation");
const moderator = new Moderator(bot, {
  storage: './data/global/cases.json',
  updateCountdownEvery: 5000
});
bot.moderator = moderator;

//Link Blocker & Filter
bot.on("message", async (message) => {
  if (message.author.bot) return;
  if (message.content.indexOf(bot.settings.prefix) !== 0) {
    if(message.guild) {
    const config = await bot.mutils.getGuildById(message.guild.id);
    //Check if its an url
    if (config.staff_linkblock) {
      var checker = require("is-url");
      if (checker(message.content)) {
        message.delete();
        return;
      }
    }
    //Check if it contains words from filter
    if (config.staff_filter.some((word) => message.content.includes(word))) {
      message.delete();
      return;
    }
    return;
  }
  }
});

//NEW COMMAND HANDLER
bot.commands = new Collection();
bot.aliases = new Collection();

bot.categories = fs.readdirSync("./commands/");

["command"].forEach((handler) => {
  require(`./main/handlers/${handler}`)(bot);
});

bot.on("message", async (message) => {
  const prefix = bot.settings.prefix;

  if (message.author.bot) return;
  // if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;
  // if (!message.member)
  //   message.member = await message.guild.fetchMember(message);

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = bot.commands.get(cmd);
  if (!command) command = bot.commands.get(bot.aliases.get(cmd));

  if (command) {
    command.run(bot, message, args);
  }
});

/**
 * Event Handler
 *
 * Read in each event file from ./main/events and then setup listeners for each event
 * on the bot client. Each event will be called with `bot, ...args`, i.e. it's normal
 * parameters preceeded with a reference to the bot client.
 */
// New
const { readdirSync } = require("fs");
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
bot.setInterval(function () {
  memusage.memoryUsage = getMemUsage();
  fs.writeFileSync("./data/global/bot-data.json",JSON.stringify(memusage, null, 4));
}, 30000);
bot.setInterval(function () {
  let memoryusage = getMemUsage();
  let guilds = bot.guilds.cache.size;
  let ping = Math.floor(bot.ws.ping);
  bot.logger("info", `Memory Usage: ${memoryusage}`)
  bot.logger("info", `Ping: ${ping}`)
  bot.logger("info", `Guilds: ${guilds}`)
}, 300000);

//MongoDB
let mongo = bot.settings.mongo;
const connectionURL = `mongodb://${mongo.user}:${mongo.password}@${mongo.host}:${mongo.port}/${mongo.database}?authSource=admin`;
bot.logger("info", `Creating MongoDB connection at ${mongo.host}:${mongo.port}`)

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => { bot.logger("success", "MongoDB connection successful")
}).catch(error => bot.logger("error", `MongoDB connection unsuccessful: ${error}`));

//Mongo Stuff Global
const mutils = require("./main/functions/mongoUtils");
bot.mutils = mutils;

//TOKENS FOR CONNECTING
bot.login(bot.settings.connections.devToken);
// bot.login(bot.settings.connections.token);
