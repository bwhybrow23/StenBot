module.exports = {
  name: "neko",
  category: "fun",
  description: "See a randomly generated picture of a Neko, also known as a Catgirl.",
  usage: "",
  example: "",
  options: { permission: "EVERYONE", enabled: true, cooldown: 3, guildOnly: false },
  run: async (bot, message, args) => {
    
    const Discord = require("discord.js");
    const nekos = require('nekos.life');
    const neko = new nekos();

    let url;
    await neko.neko()
      .then(data => url = data.url);

    const nekoEmbed = {
      "title": "I present your Neko:",
      "image": {
        "url": url
      },
      "color": bot.settings.color.yellow,
      "footer": {
        "text": "Powered by nekos.life",
        "iconURL": "https://nekos.life/static/icons/favicon-194x194.png"
      }
    }

    message.reply({ embeds: [ nekoEmbed ]});

  },
}