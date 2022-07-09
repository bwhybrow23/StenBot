const { Events } = require('../../Data/Global/eventNames.js');
const ascii = require('ascii-table');
const fs = require('fs');

const table = new ascii().setHeading('Event', 'Load status');

module.exports = async (bot) => {

  //Read each directory
  fs.readdirSync('./Main/Events/').forEach((dir) => {

    //Find all .js files in each directory
    const events = fs.readdirSync(`./Main/Events/${dir}/`).filter((f) =>
      f.endsWith('.js')
    );

    events.forEach(file => {

      const event = require(`../Events/${dir}/${file}`);

      if(!Events.includes(event.name) || !event.name) {
        table.addRow(event.name, '❌ -> Missing Something??');
      }

      if(event.once) { 
        bot.once(event.name, (...args) => event.execute(bot, ...args));
      } else { 
        bot.on(event.name, (...args) => event.execute(bot, ...args));
      }

      table.addRow(event.name, '✅');

    });

    console.log(table.toString());

  });
};