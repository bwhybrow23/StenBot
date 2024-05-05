import { Events } from '../../Data/Global/eventNames.js';
import ascii from 'ascii-table3';
import fs from 'fs/promises';

const table = new ascii().setHeading('Event', 'Load status');

export async function eventHandler(bot) {
  try {
    const dirs = await fs.readdir('./Main/Events/');
    for (const dir of dirs) {
      const events = await fs.readdir(`./Main/Events/${dir}/`);
      for (const file of events) {
        if (file.endsWith('.js')) {
          const event = await import(`../Events/${dir}/${file}`);
          if (!Events.includes(event.name) || !event.name) {
            table.addRow(event.name, '❌ -> Missing Something??');
          }
          if (event.once) {
            bot.once(event.name, (...args) => event.execute(bot, ...args));
          } else {
            bot.on(event.name, (...args) => event.execute(bot, ...args));
          }
          table.addRow(event.name, '✅');
        }
      }
    }
    console.log(table.toString());
  } catch (error) {
    console.error('Error in eventHandler:', error);
  }
}