module.exports = {
  name: "dog",
  category: "fun",
  description: "Get a random image of a dog.",
  usage: "sb!dog",
  permission: "EVERYONE",
  run: async (bot, message, args) => {
    const Discord = require("discord.js");
    const superagent = require("superagent");

    let { body } = await superagent.get(`http://api.thedogapi.com/v1/images/search`);

    const dogEmbed = new Discord.MessageEmbed()
      .setTitle("Aww... Doggo!")
      .setColor("#ff9900")
      .setImage(body[0].url)
      .setFooter(`${message.guild.name}`, `https://i.imgur.com/BkZY6H8.png`);

    message.channel.send(dogEmbed);
  },
};
