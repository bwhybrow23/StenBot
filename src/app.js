import { CommandHandler } from './commands';
import { EventHandler } from './event';

const Discord = require('discord.js');

const bot = new Discord.Client();

const CommandHandler = new CommandHandler();
const EventHandler = new EventHandler();
