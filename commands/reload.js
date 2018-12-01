const Discord = require('discord.js');
const fs = require('fs')

module.exports.run = async (client, msg, args) => {
if(msg.member.id != "346246641595973633")
return msg.reply("Only the owner of the bot `Stentorian#1202` can execute this command!")
if(!args[0])return msg.channel.send('Give me a command to reload!')
msg.delete().catch(err => {})
client.loadCommand = (commandName) => {
    try {
      const props = require(`../commands/${commandName}`);
      if (props.init) {
        props.init(client);
      }
      client.commands.set(props.help.name, props);
      return false;
    } catch (e) {
      return msg.channel.send(e);
    }
  };
  client.unloadCommand = async (commandName) => {
    console.log(`Reloaded ${commandName}.js`)
    let command;
    if (client.commands.has(commandName)) {
      command = client.commands.get(commandName);
    } else if (client.aliases.has(commandName)) {
      command = client.commands.get(client.aliases.get(commandName));
    }
    if (!command) return msg.channel.send('Woops, Cant load that cmd!')
  
    delete require.cache[require.resolve(`../commands/${commandName}.js`)];
    return false;
  };

  let response = await client.unloadCommand(args[0]);
  if (response) return msg.reply(`Error Unloading: ${response}`)

  response = client.loadCommand(args[0]);
  if (response) return msg.reply(`Error Loading: ${response}`)

  msg.channel.send(':ok_hand: Done!')


}

module.exports.help = {
    name: 'reload'
  }