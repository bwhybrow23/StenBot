module.exports = {
  name: "gsay",
  category: "bot",
  description: "Sends a message to all the guild's owners that the bot is in.",
  example: ".gsay Hey y'all.",
  permission: "BOT OWNER",
  run: async (bot, message, args) => {

    const Discord = require("discord.js");
   
    if (message.author.id !== bot.settings.ids.botOwner) {
     message.reply("You do not have permission to do this command.")
    }
   
    let message1 = args.slice(0).join(" ");
    if (!message1) return message.reply(`You have not included your message you want to send to all guild owners.`);
   
    const date = new Date();
    const timestamp = date.getTime();
   
    bot.guilds.forEach(guild => {
   
     const embed = {
      "title": "Message from StenBot Owner",
      "description": `You have been sent this message by the owner of StenBot (Stentorian#9524) to inform you. The bot has seen that you are the server owner of ${guild.name} so it has been sent to you. Feel free to communicate the below message to other people.`,
      "color": bot.settings.color.blue,
      "footer": {
       "icon_url": message.author.displayURL,
       "text": "${message.author.tag} || ${timestamp}"
      },
      "fields": [{
        "name": "Server Name",
        "value": guild.name
       },
       {
        "name": "Message",
        "value": message1
       }
      ]
     };
   
     guild.owner.send(embed);
   
     message.reply(`Your message has been sent to ${guild.name} succesfully.`);
   
    })
   
   }};
