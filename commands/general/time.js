module.exports = {
    name: "time",
    category: "general",
    description: "Find out the time in a different timezone.",
    example: ".time 9PM BST",
    permission: "EVERYONE",
    run: async (bot, message, args) => {

    const Discord = require("discord.js");
    const tz = require("moment-timezone");

    let subc = args[0]

    if(!subc) {
        //HELP EMBED
    } else if(subc === "SOMETHING") {

    }

}};
