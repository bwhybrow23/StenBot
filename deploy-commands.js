import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import { Collection } from 'discord.js';

import settings from './Main/settings.js';

let token;
let bot = {};
bot.value = 'value';
bot.commands = new Collection();
bot.commandsArray = [];

import { commandHandler } from './Main/Handlers/commands.js';
commandHandler(bot);

let commandsArray = bot.commandsArray;

//Check if in production or development
if(settings.mode === 'production') {
  //Production Mode
  token = settings.connections.token;
} else if(settings.mode === 'development') {
  //Development Mode
  token = settings.connections.devToken;
}

const rest = new REST({ version: '9' }).setToken(token);

//Function for the magic
(async () => {
  try {
    //Production mode = push global commands & botowner commands
    if (settings.mode === 'production') {

      //Split the commands
      //Array of bot owner commands
      let ownerCommandsArray = ['bash', 'blacklist', 'eco', 'eval', 'ginvite', 'glist', 'gsay', 'mode', 'sync'];
      //Array of bot owner commands
      let botOwnerCommands = commandsArray.filter(
        function (obj) {
          return ownerCommandsArray.includes(obj.name);
        }
      );
      //Array of global (other) commands
      let globalCommands = commandsArray.filter(
        function (obj) {
          return !ownerCommandsArray.includes(obj.name);
        }
      );

      //Push global commands
      await rest.put(Routes.applicationCommands(settings.ids.mainBot), {
        body: globalCommands
      });
      console.log('Sucessfully pushed slash commands globally');

      //Push bot owner commands to dev and sten server
      await rest.put(Routes.applicationGuildCommands(settings.ids.mainBot, settings.ids.testGuild), {
        body: botOwnerCommands
      });
      await rest.put(Routes.applicationGuildCommands(settings.ids.mainBot, settings.ids.mainGuild), {
        body: botOwnerCommands
      });
      console.log('Sucessfully pushed guild-only slash commands');

    } else if (settings.mode === 'development') {

      //Development mode = push all commands as server-specific
      await rest.put(Routes.applicationGuildCommands(settings.ids.testBot, settings.ids.testGuild), {
        body: bot.commandsArray
      });

      console.log('Sucessfully pushed guild-only slash commands');

    }
  } catch (error) {
    if (error) return console.log(error);
    // fs.writeFileSync(`./Data/Logs/slashOutput.json`, JSON.stringify(error, null, 4), (err) => {
    //   if (err) return bot.log.post("error", err);
    // });
  }
})();