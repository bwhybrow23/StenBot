module.exports = {
    name: "goose",
    category: "fun",
    description: "Get a random image of a goose.",
    usage: "",
    example: "",
    permission: "EVERYONE",
    run: async (bot, message, args) => {
  
      const Discord = require("discord.js");
      if (!message.guild) return;
      const fetch = require("node-fetch");
  
      let url;
      await fetch(`https://nekos.life/api/v2/img/goose`)
                .then(res => res.json())
                .then(json => url = json.url)
  
      const gooseEmbed = new Discord.MessageEmbed()
        .setTitle("Hjonk!")
        .setColor("#ff9900")
        .setImage(url)
        .setFooter(`${message.guild.name}`, `https://i.imgur.com/BkZY6H8.png`);
  
      message.channel.send(gooseEmbed);
    },
  };
  