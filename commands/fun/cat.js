module.exports = {
  name: "cat",
  category: "fun",
  description: "Get a random image of a cat.",
  usage: "sb!cat",
  permission: "EVERYONE",
  run: async (bot, message, args) => {
    const Discord = require("discord.js");
    const superagent = require("superagent");

    let { body } = await superagent.get(`http://aws.random.cat/meow`);

    const catEmbed = new Discord.RichEmbed()
      .setTitle("Aww... Kitty!")
      .setColor("#ff9900")
      .setImage(body.file)
      .setFooter(`${message.guild.name}`, `https://i.imgur.com/BkZY6H8.png`);

    message.channel.send(catEmbed);
  },
};
