//Requirements
const fs = require("fs");
const ascii = require("ascii-table");

// Table for tracking commands
const table = new ascii().setHeading("Command", "Load status");

//Bot Data (obviously)
const botData = require("../../data/global/bot-data.json");

//Actual Code
module.exports = (bot) => {
  //Read "commands" directory
  fs.readdirSync("./commands/").forEach((dir) => {

    //Find all .js files in each directory
    const commands = fs.readdirSync(`./commands/${dir}/`).filter((f) =>
      f.endsWith(".js")
    );

    //For each file, do this
    commands.forEach((file) => {

      let command = require(`../../commands/${dir}/${file}`);
      if(command.category === "botowner") return;

      //Check if enabled
      if (command.options.enabled === false) return;

      //Check if stats tracking exists for it
      if (!botData.stats.commands[command.category][command.data.name]) {
        botData.stats.commands[command.category][command.data.name] = 0;
        fs.writeFileSync("./data/global/bot-data.json", JSON.stringify(botData, null, 4));
      };

      commandData = command.data.toJSON();

      //If not guild only, allow in DMs
      // if(commandData.options.guildOnly === false) {
      //   commandData.dm_permission = true;
      // }

      //Check if command has a name
      if(command.data.name) {
        //Push to array and to bot
        bot.commandsArray.push(commandData);
        bot.commands.set(command.data.name, command);
        table.addRow(file, "✅");
      } else {
        return table.addRow(file, "❌ -> Missing Something??");
      }

    })

  });
}