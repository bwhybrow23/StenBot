exports.run = async (bot, message, args) => {

    const Discord = require("discord.js");
    const fs = require("fs");
    const eco = require("discord-economy");
    
    var output = await eco.Daily(message.author.id);

    if (output.updated) {
        var profile = await eco.AddToBalance(message.author.id, 150)
        message.reply(`You have claimed your daily rewards for today! Check back tomorrow for more!`)
    } else {
        message.reply(`You have already claimed your daily reward for today. Check back in ${output.timetowait} where you can gain your daily reward again!`)
    }

}