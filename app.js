/**
 *
 * Definitions
 *
 */
import { Client, Collection, GatewayIntentBits, Partials } from 'discord.js';
import fs from 'fs';
import mongoose from 'mongoose';

const settings = JSON.parse(fs.readFileSync('./Main/settings.json', 'utf8'));

const bot = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildModeration, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildPresences, GatewayIntentBits.DirectMessages], partials: [Partials.User, Partials.Message, Partials.Channel, Partials.ThreadMember, Partials.GuildMember] });
  
/**
   *
   * GLOBAL VALUES
   *
   */
//Logging Functions
import logUtilModule from './Main/Functions/logUtils.js';
bot.log = logUtilModule;
//Purge logs older than 60 days on startup
await bot.log.purge(60).then(() => bot.log.post('success', 'Logs purged successfully from the past 60 days')).catch((error) => bot.log.post('error', error));
//Purge logs older than 60 days every 24 hours
setInterval(async () => {
  await bot.log.purge(60).then(() => bot.log.post('success', 'Logs purged successfully from the past 60 days')).catch((error) => bot.log.post('error', error));
}, 86400000);

//Settings File
bot.settings = settings;
  
//Embed Functions
import embedUtils from './Main/Functions/embedUtils.js';
bot.createEmbed = embedUtils.createEmbed;
bot.noPermsEmbed = embedUtils.noPermsEmbed;
bot.helpEmbed = embedUtils.helpEmbed;
bot.eventEmbed = embedUtils.eventEmbed;
  
//Event Functions
import efunctions from './Main/Functions/eventUtils.js';
bot.efunctions = efunctions;
  
//Timeout Utilities
import TimeoutModule from './Main/Functions/timeoutUtils.js';
const { TimeoutUtils } = TimeoutModule;
const timeouts = new TimeoutUtils(bot);
bot.timeouts = timeouts;
  
//Punishment Utilities
import PunishmentModule from './Main/Functions/punishmentUtils.js';
const { PunishmentUtils } = PunishmentModule;
const punishments = new PunishmentUtils(bot);
bot.punishments = punishments;

//General Utilities
import utilities from './Main/Functions/utilities.js';
bot.utils = utilities;
  
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
  
import { commandHandler } from './Main/Handlers/commands.js';
await commandHandler(bot);
import { eventHandler } from './Main/Handlers/events.js';
await eventHandler(bot);
  
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

mongoose.set('strictQuery', false);
mongoose.connect(connectionURL).then(() => {
  bot.log.post('success', 'MongoDB connection successful');
}).catch(error => bot.log.post('error', `MongoDB connection unsuccessful: ${error}`));
  
//Globally
import mutils from './Main/Functions/mongoUtils.js';
bot.mutils = mutils;
  
/**
   *
   * API & WEBSITE
   *
   */
// import express from 'express';
// const app = express();
// import cors from 'cors';
// import path from 'path';
// const port = bot.settings.options.apiPort;
// import { renderFile } from 'ejs';
// import { readdir } from 'fs/promises';

// //__dirname
// import { fileURLToPath } from 'url';
// import { time } from 'console';
// const __dirname = path.dirname(fileURLToPath(import.meta.url));
  
// //Middleware
// app.use(express.json());
// app.use(express.urlencoded({
//   extended: false
// }));
// app.use(cors());
  
// app.use('/assets', express.static('Main/Website/assets'));
// app.set('views', path.join(__dirname, 'Main/Website/views'));
// app.engine('html', (filePath, options, callback) => {
//   renderFile(filePath, options, callback);
// })
// app.set('view engine', 'html');
  
// app.listen(port, () => {
//   bot.log.post('success', `Webserver server started on port ${port}`);
// });
  
// // Routers
// const loadRouters = async () => {
//   try {
//     const files = await readdir(path.join(__dirname, './Main/Routers'));
//     files.forEach(async (file) => {
//       if (file.split('.')[1] === 'js') {
//         const router = await import(`./Main/Routers/${file}`);
//         app.use(router.default);
//       }
//     });
//   } catch (error) {
//     console.error('Error loading routers:', error);
//   }
// };

// loadRouters();
  
//EXPORT BOT MODULE (DONT PUT ANYTHING BELOW THIS)
export default bot;
  
/**
   *
   * END OF APP.JS
   *
   */