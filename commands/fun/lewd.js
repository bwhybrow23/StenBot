module.exports = {
  name: "lewd",
  category: "fun",
  description: "A randomly generated photo of *you know what*",
  usage: "",
  example: "",
  options: { permission: "EVERYONE", enabled: true, cooldown: 3, guildOnly: true },
  run: async (bot, message, args) => {
    
    const Discord = require("discord.js");
    const fetch = require("node-fetch");

    if(message.channel.nsfw === false) {
      return message.reply("Run this command in an **NSFW** channel.")
    }

    let url;
    await fetch(`http://api.nekos.fun:8080/api/lewd`)
        .then(res => res.json())
        .then(json => url = json.image)

    const lewdEmbed = {
      "title": "Here you go, you filthy animal:",
      "image": {
        "url": url
      },
      "color": bot.settings.color.yellow,
      "footer": {
        "text": "Powered by nekos.fun"
      }
    }

    message.reply({ embeds: [ lewdEmbed ]});

  },
}