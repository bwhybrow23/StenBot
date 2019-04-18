exports.run = async (bot, message, args) => {

const Discord = require("discord.js");
const Fortnite = require('fortnite');
const ft = new Fortnite('426e69f9-770d-4df7-8853-7d7d64a0e524');
// There goes my API-Key xD

//Get createEmbed from help.js
const helpCMD = require("./help.js");

let createEmbed = helpCMD.createEmbed;

let game = args[0]
    //Check if the user has given a game or no
    if (!game) {
        return message.channel.send(createEmbed('Gaming Commands', '`.gamestats fortnite [your account]` - Shows your fortnite account stats\n`.gamestats overwatch [your account]` - Shows your overwatch account stats\n`.mcping [server ip] [Optional: port]` - Pings a minecraft server and shows the results'));
    }

    switch (game) {
        case 'fortnite':
            let platform = args[1] || 'pc'
            let user = args[2]
            let data = await ft.user(user, platform)
            console.log(data)
    }
};
