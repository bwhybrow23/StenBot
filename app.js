/**
 *
 * Definitions
 *
 */
const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const settings = require('./Main/settings.json');
const fs = require('fs');
const mongoose = require('mongoose');
const bot = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildPresences, GatewayIntentBits.DirectMessages], partials: [Partials.User, Partials.Message, Partials.Channel, Partials.ThreadMember, Partials.GuildMember] });
  
/**
   *
   * GLOBAL VALUES
   *
   */
//Logger
const logUtils = require('./Main/Functions/logUtils.js');
bot.log = logUtils;
  
//Settings File
bot.settings = settings;
  
//Embed Functions
const embedUtils = require('./Main/Functions/embedUtils.js');
bot.createEmbed = embedUtils.createEmbed;
bot.noPermsEmbed = embedUtils.noPermsEmbed;
bot.helpEmbed = embedUtils.helpEmbed;
bot.eventEmbed = embedUtils.eventEmbed;
  
//Event Functions
const efunctions = require('./Main/Functions/eventUtils.js');
bot.efunctions = efunctions;
  
//Timeout Utilities
const {
  TimeoutUtils
} = require('./Main/Functions/timeoutUtils');
const timeouts = new TimeoutUtils(bot);
bot.timeouts = timeouts;
  
//Punishment Utilities
const {
  PunishmentUtils
} = require('./Main/Functions/punishmentUtils.js');
const punishments = new PunishmentUtils(bot);
bot.punishments = punishments;
  
/**
   *
   * COMMAND & EVENT HANDLER
   *
   */
bot.commands = new Collection();
bot.aliases = new Collection();
bot.cooldowns = new Collection();
bot.categories = fs.readdirSync('./Commands/');
bot.commandsArray = [];
  
require('./Main/Handlers/commands.js')(bot);
require('./Main/Handlers/events.js')(bot);
  
/**
   *
   * USAGE STATISTICS
   *
   */
const botData = JSON.parse(fs.readFileSync('./Data/Global/bot-data.json', 'utf8'));
  
function getMemUsage() {
  const arr = [1, 2, 3, 4, 5, 6, 9, 7, 8, 9, 10];
  arr.reverse();
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  return Math.round(used * 100) / 100;
}
setInterval(function() {
  botData.info.memoryUsage = getMemUsage();
  fs.writeFileSync('./Data/Global/bot-data.json', JSON.stringify(botData, null, 4));
}, 600000);
setInterval(function() {
  let memoryusage = getMemUsage();
  let guilds = bot.guilds.cache.size;
  let ping = Math.floor(bot.ws.ping);
  bot.log.post('info', `Memory Usage: ${memoryusage} || Ping: ${ping} || Guilds: ${guilds}`);
}, 600000);
  
/**
   *
   * MODE CHECKER
   *
   */
let mongo, token;
if (bot.settings.mode === 'production') {
  mongo = bot.settings.mongo;
  
  token = bot.settings.connections.token;
} else if (bot.settings.mode === 'development') {
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
bot.log.post('info', `Creating MongoDB connection at ${mongo.host}:${mongo.port}`);
  
mongoose.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  bot.log.post('success', 'MongoDB connection successful');
}).catch(error => bot.log.post('error', `MongoDB connection unsuccessful: ${error}`));
  
//Globally
const mutils = require('./Main/Functions/mongoUtils');
bot.mutils = mutils;
  
/**
   *
   * API & WEBSITE
   *
   */
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const port = bot.settings.options.apiPort;
  
//Middleware
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cors());
  
app.use('/assets', express.static('Main/Website/assets'));
app.set('views', path.join(__dirname, 'Main/Website/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
  
app.listen(port, () => {
  bot.log.post('success', `Webserver server started on port ${port}`);
});
  
//Routers
fs.promises.readdir(path.join(__dirname, './Main/Routers'))
  .then(files => {
    files.forEach(file => {
      if (file.split('.')[1] === 'js') {
        let router = require(`./Main/Routers/${file}`);
        app.use(router);
      }
    });
  });
  
//EXPORT BOT MODULE (DONT PUT ANYTHING BELOW THIS)
module.exports = bot;
  
/**
   *
   * END OF APP.JS
   *
   */