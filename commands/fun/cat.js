module.exports = {
  name: "cat",
  category: "fun",
  description: "Get a random image of a cat.",
  usage: "",
  example: "",
  permission: "EVERYONE",
  run: async (bot, message, args) => {

    const Discord = require("discord.js");
    if (!message.guild) return;
    const fetch = require("node-fetch");
  
    let url;
    await fetch(`https://nekos.life/api/v2/img/meow`)
              .then(res => res.json())
              .then(json => url = json.url)

    const catEmbed = new Discord.MessageEmbed()
      .setTitle("Aww... Kitty!")
      .setColor("#ff9900")
      .setImage(url)
      .setFooter(`${message.guild.name}`, `https://i.imgur.com/BkZY6H8.png`);

    message.channel.send(catEmbed);
  },
};
