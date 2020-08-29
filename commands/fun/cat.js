module.exports = {
  name: "cat",
  category: "fun",
  description: "Get a random image of a cat.",
  usage: "sb!cat",
  permission: "EVERYONE",
  run: async (bot, message, args) => {

    const Discord = require("discord.js");
    if (!message.guild) return;
    const superagent = require("superagent");

    let { body } = await superagent.get(`http://api.thecatapi.com/v1/images/search`);

    const catEmbed = new Discord.MessageEmbed()
      .setTitle("Aww... Kitty!")
      .setColor("#ff9900")
      .setImage(body[0].url)
      .setFooter(`${message.guild.name}`, `https://i.imgur.com/BkZY6H8.png`);

    message.channel.send(catEmbed);
  },
};
