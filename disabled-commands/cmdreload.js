module.exports = {
  name: "cmdreload",
  category: "bot",
  description: "Reloads a command to prevent restarting the bot.",
  usage: "sb!cmdreload <COMMAND>",
  permission: "BOT OWNER",
  run: async (bot, message, args) => {
    const Discord = require("discord.js");

    //COMMENTED OUT DUE TO COMMAND NOT FUNCTIONING WITH NEW HANDLER
    /*
    const fs = require('fs');
  
    if (message.member.id != "346246641595973633") {
        message.reply(`Only the owner of the bot can execute this command!`)
    } else {
        if (!args[0]) return message.channel.send('Give me a command to reload!');
  
        message.delete().catch(err => {})
        bot.loadCommand = (commandName) => {
            try {
                const props = require(`./${commandName}`);
                if (props.init) {
                    props.init(bot);
                }
                bot.commands.set(props.help.name, props);
                return false;
            } catch (e) {
                return message.channel.send(e);
            }
        };
        bot.unloadCommand = async (commandName) => {
            console.log(`Reloaded ${commandName}.js`)
            let command;
            if (bot.commands.has(commandName)) {
                command = bot.commands.get(commandName);
            } else if (bot.aliases.has(commandName)) {
                command = bot.commands.get(bot.aliases.get(commandName));
            }
            if (!command) return message.channel.send('Woops, Cant load that cmd!')
  
            delete require.cache[require.resolve(`./${commandName}.js`)];
            return false;
        };
  
        let response = await bot.unloadCommand(args[0]);
        if (response) return message.reply(`Error Unloading: ${response}`)
  
        response = bot.loadCommand(args[0]);
        if (response) return message.reply(`Error Loading: ${response}`)
  
        let doneEmbed = new Discord.RichEmbed()
            .setColor(bot.settings.color.green)
            .setDescription(`Command ${args[0]} has been reloaded successfully!`);
  
        message.channel.send(doneEmbed);
    }
    */

    //Temporary Message as command as broken
    message.reply(`This command doesn't work at the moment.`);
  },
};
