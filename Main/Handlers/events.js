import EventsFile from '../../Data/Global/eventNames.js';
const EventsNames = EventsFile.Events;
import { AsciiTable3 } from 'ascii-table3';
import fs from 'fs/promises';

const table = new AsciiTable3().setHeading('Event', 'Load status');

export async function eventHandler(bot) {
  try {
    const dirs = await fs.readdir('./Main/Events/');
    for (const dir of dirs) {
      const eventsFiles = await fs.readdir(`./Main/Events/${dir}/`);
      for (const file of eventsFiles) {
        if (file.endsWith('.js')) {
          const eventFile = await import(`../Events/${dir}/${file}`);
          const eventObj = eventFile.default;
          if (!EventsNames.includes(eventObj.name) || !eventObj.name) {
            table.addRow(eventObj.name, '❌ -> Missing Something??');
          }
          if (eventObj.once) {
            bot.once(eventObj.name, (...args) => eventObj.execute(bot, ...args));
          } else {
            bot.on(eventObj.name, (...args) => eventObj.execute(bot, ...args));
          }
          table.addRow(eventObj.name, '✅');
        }
      }
    }
    console.log(table.toString());
  } catch (error) {
    bot.log.post('error', error);
    
    // Report to GitHub
    bot.createGithubIssue(error, {
      fileName: "events.js", 
      additonalInfo: "Event Handler"
    });
  }
}