const fs = require("fs");
const ascii = require("ascii-table");
const table = new ascii().setHeading("Command", "Load status");

const botData = require("../../data/global/bot-data.json");

module.exports = (client) => {
  fs.readdirSync("./commands/").forEach((dir) => {
    const commands = fs.readdirSync(`./commands/${dir}/`).filter((f) =>
      f.endsWith(".js")
    );

    for (let file of commands) {
      let pull = require(`../../commands/${dir}/${file}`);

      if (pull.options.enabled == false) return;

      if (!botData.stats.commands[pull.category][pull.name]) {
        botData.stats.commands[pull.category][pull.name] = 0;
        fs.writeFileSync("./data/global/bot-data.json", JSON.stringify(botData, null, 4));
      }

      if (pull.name) {
        client.commands.set(pull.name, pull);

        if (pull.name) {
          client.commands.set(pull.name, pull);
          table.addRow(file, "✅");
        } else {
          table.addRow(file, "❌ -> Missing Something??");
          continue;
        }

        if (pull.options.aliases && Array.isArray(pull.options.aliases)) {
          pull.options.aliases.forEach((alias) => client.aliases.set(alias, pull.name));
        }
      }
    }
  });
};