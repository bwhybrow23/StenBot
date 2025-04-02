import fs from 'fs';
import { AsciiTable3 } from 'ascii-table3';
const botData = JSON.parse(fs.readFileSync('./Data/Global/bot-data.json', 'utf8'));
const dailyBotData = JSON.parse(fs.readFileSync('./Data/Global/daily-bot-data.json', 'utf8'));

const table = new AsciiTable3().setHeading('Command', 'Load status');

export async function commandHandler(bot) {
  try {
    const commandDirs = await fs.promises.readdir('./Commands/');

    // Get today’s date
    const today = new Date().toISOString().slice(0, 10);

    // Find today's entry in dailyBotData
    let todayEntry = null;
    for (const week of dailyBotData) {
      const day = week.find(day => day.date === today);
      if (day) {
        todayEntry = day;
        break;
      }
    }

    // If today not found, create a new day in a new week
    if (!todayEntry) {
      const newDay = { date: today, commandLoads: {} };
      let currentWeek = dailyBotData[dailyBotData.length - 1];
      if (!currentWeek || currentWeek.length >= 7) {
        currentWeek = [];
        dailyBotData.push(currentWeek);
      }
      currentWeek.push(newDay);
      todayEntry = newDay;
    }

    const commandLoads = todayEntry.commandLoads;

    for (const dir of commandDirs) {
      const commands = await fs.promises.readdir(`./Commands/${dir}/`);
      for (const file of commands) {
        if (file.endsWith('.js')) {
          const commandModule = await import(`../../Commands/${dir}/${file}`);
          const command = commandModule.default;

          if (!command.options.enabled) continue;

          const { category, data } = command;
          const { name } = data;

          if (!botData.stats.commands[category][name]) {
            botData.stats.commands[category][name] = 0;
          }

          // Record command load in today's dailyBotData
          if (!commandLoads[name]) {
            commandLoads[name] = 1;
          } else {
            commandLoads[name]++;
          }

          const commandData = data.toJSON();
          if (name) {
            bot.commandsArray.push(commandData);
            bot.commands.set(name, command);
            table.addRow(file, '✅');
          } else {
            table.addRow(file, '❌ -> Missing Something??');
          }
        }
      }
    }

    // Write updated JSON files
    fs.writeFileSync('./Data/Global/bot-data.json', JSON.stringify(botData, null, 4));
    fs.writeFileSync('./Data/Global/daily-bot-data.json', JSON.stringify(dailyBotData, null, 4));

    console.log(table.toString());
  } catch (error) {
    console.error('Error in Command Handler:', error);
  }
}