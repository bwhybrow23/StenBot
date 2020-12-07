module.exports = {
  name: "dog",
  category: "fun",
  description: "Get a random image of a dog.",
  usage: "",
  example: "",
  permission: "EVERYONE",
  run: async (bot, message, args) => {

    const Discord = require("discord.js");
    if (!message.guild) return;
    const fetch = require("node-fetch");
  
    let url;
    await fetch(`https://nekos.life/api/v2/img/woof`)
              .then(res => res.json())
              .then(json => url = json.url)

    const dogEmbed = new Discord.MessageEmbed()
      .setTitle("Aww... Doggo!")
      .setColor("#ff9900")
      .setImage(url)
      .setFooter(`${message.guild.name}`, `https://i.imgur.com/BkZY6H8.png`);

    message.channel.send(dogEmbed);
  },
};
