//Define
const { Client, Collection } = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const settings = require("./main/settings.json");
const fs = require("fs");
const os = require("os");
const colors = require("colors");
const schedule = require("node-schedule");
// const Sequelize = require('sequelize');
// require('sqlite3');

//CREATE DISCORD BOT
const bot = new Client();

//FUNCTIONS
const logger = require("./main/functions/console.js");
const utils = require("./main/functions/utilities.js");
const reactionFunctions = require("./main/functions/reactions.js");

//Lets make the settings file available everywhere
bot.settings = settings;

// Embed Function Available Everywhere
const {
  createEmbed,
  noPermsEmbed,
  helpEmbed,
} = require("./main/functions/embed.js");
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
bot.on("message", (message) => {
  if (message.author.bot) return;
  if (message.content.indexOf(bot.settings.prefix) !== 0) {
    const config = JSON.parse(fs.readFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, "utf8"));
    //Check if its an url
    if (config.stafflinkblocker) {
      var checker = require("is-url");
      if (checker(message.content)) {
        message.delete();
        return;
      }
    }
    //Check if it contains words from filter
    if (config.stafffilter.some((word) => message.content.includes(word))) {
      message.delete();
      return;
    }
    return;
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
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;
  if (!message.member)
    message.member = await message.guild.fetchMember(message);

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
  fs.readFileSync("./data/global/memory-usage.json", "utf8")
);
var getMemUsage = () => {
  const arr = [1, 2, 3, 4, 5, 6, 9, 7, 8, 9, 10];
  arr.reverse();
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  return Math.round(used * 100) / 100;
};
bot.setInterval(function () {
  memusage.memory = getMemUsage();
  fs.writeFileSync("./data/global/memory-usage.json",JSON.stringify(memusage, null, 4));
}, 30000);
bot.setInterval(function () {
  let memoryusage = getMemUsage();
  let guilds = bot.guilds.cache.size;
  let ping = Math.floor(bot.ws.ping);
  console.log(
    `[INFO]`.grey,
    `Memory Usage: ${memoryusage}`.yellow,
    `\n[INFO]`.grey,
    `Ping: ${ping}`.yellow,
    `\n[INFO]`.grey,
    `Guilds: ${guilds}`.yellow
  );
}, 300000);

//TOKENS FOR CONNECTING
//bot.login(bot.settings.connections.devToken);
bot.login(bot.settings.connections.token);
