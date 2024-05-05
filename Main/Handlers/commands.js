import fs from 'fs';
import { AsciiTable3 } from 'ascii-table3';
const botData = JSON.parse(fs.readFileSync('./Data/Global/bot-data.json', 'utf8'));

const table = new AsciiTable3().setHeading('Command', 'Load status');

export async function commandHandler(bot) {
  try {
    const commandDirs = await fs.promises.readdir('./Commands/');
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
            fs.writeFileSync('./Data/Global/bot-data.json', JSON.stringify(botData, null, 4));
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
    console.log(table.toString());
  } catch (error) {
    console.error('Error in commandHandler:', error);
  }
}
