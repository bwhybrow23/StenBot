const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Collection } = require('discord.js');

const settings = require('./Main/settings.json');

let token;
let bot = {};
bot.value = 'value';
bot.commands = new Collection();
bot.commandsArray = [];

require('./Main/Handlers/commands.js')(bot);


//Check if in production or development
if(settings.mode === 'production') {
  //Production Mode
  token = settings.connections.token;
} else if(settings.mode === 'development') {
  //Development Mode
  token = settings.connections.devToken;
}

const rest = new REST({ version: '9' }).setToken(token);


(async () => {
  try {
    //Production mode = push global commands & botowner commands
    if (settings.mode === 'production') {

      await rest.put(Routes.applicationCommands(settings.ids.mainBot), {
        body: bot.commandsArray
      });

      console.log('Sucessfully pushed slash commands globally');

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