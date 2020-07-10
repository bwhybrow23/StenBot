module.exports = {
  name: "time",
  category: "general",
  description: "Find out the time in a different timezone.",
  usage: "sb!time 9PM BST",
  permission: "EVERYONE",
  run: async (bot, message, args) => {
    const Discord = require("discord.js");
    const tz = require("moment-timezone");

    let subc = args[0];

    message.reply("This command is still in the works, sorry. :/");

    // if(!subc) {
    //     //HELP EMBED
    // } else if(subc === "SOMETHING") {

    // }
  },
};
