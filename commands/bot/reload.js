exports.run = async (bot, message, args) => {

  const Discord = require('discord.js');
 
  if (message.author.id !== bot.settings.ids.botOwner) return message.channel.send("⛔ **ACCESS DENIED**");
 
  try {
   delete require.cache[require.resolve(`./${args[0]}.js`)]
  } catch (e) {
   return message.channel.send(`Unable to reload ${args[0]}`);
  }
 
  message.channel.send(`Successfully reloaded ${args[0]}`);
 
 };