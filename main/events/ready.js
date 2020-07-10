module.exports = (bot) => {
  const utils = require("../functions/utilities.js");

  //Mode Checker
  const fs = require("fs");

  //Production Mode
  if (bot.settings.mode === "production") {
    //Status
    let guilds = bot.guilds.size;
    bot.user.setPresence({
      game: {
        name: `sb!help on ${guilds} servers!`,
        type: "WATCHING",
      },
      status: "online",
    });

    //Console Log
    let date = new Date();
    console.log(
      "[SYSTEM]".grey,
      `StenBot Started Successfully in Production Mode. Version: ${bot.settings.version}`
        .green
    );
  }

  if (bot.settings.mode === "development") {
    //Status
    date = new Date();
    bot.user.setPresence({
      game: {
        name: `In Development Mode`,
        type: "PLAYING",
      },
      status: "dnd",
    });

    //Console Log
    console.log(
      "[SYSTEM]".grey,
      `StenBot Started Successfully in Development Mode | Date: ${date}`.green
    );
  }

  //VERIFICATION FOR SUPPORT DISCORD
  if (bot.settings.options.verifEnabled) {
    utils.resetVerif(bot);
  }
};
