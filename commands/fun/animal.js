module.exports = {
  name: "animal",
  category: "fun",
  description: "Get a random image of an animal from a list.",
  usage: "<ANIMAL>",
  example: "fox",
  options: { permission: "EVERYONE", enabled: true, cooldown: 10, guildOnly: false },
  run: async (bot, message, args) => {

    const Discord = require("discord.js");
    const fetch = require("node-fetch");

    let animal = args[0];
    let url;

    const nekos = require('nekos.life');
    const neko = new nekos();

    // Fetch function
    async function apiFetch(action) {
      await neko.sfw[action]()
        .then(data => url = data.url)
    }

    switch (animal) {
      case "cat":
        await apiFetch("meow");
        if (!url) {
          await apiFetch("meow");
        }

        const catEmbed = new Discord.MessageEmbed()
          .setTitle("Aww... Kitty!")
          .setColor("#ff9900")
          .setImage(url)
          .setFooter(`${message.server.name}`, `https://i.imgur.com/BkZY6H8.png`);

        message.channel.send({embeds: [catEmbed.toJSON()]});
        break;

      case "dog":

        await apiFetch("woof");
        if (!url) {
          await apiFetch("woof");
        }

        const dogEmbed = new Discord.MessageEmbed()
          .setTitle("Aww... Doggo!")
          .setColor("#ff9900")
          .setImage(url)
          .setFooter(`${message.server.name}`, `https://i.imgur.com/BkZY6H8.png`);

        message.channel.send({embeds: [dogEmbed.toJSON()]});

        break;

      case "fox":

        await fetch("https://randomfox.ca/floof/")
          .then(res => res.json())
          .then(json => url = json.image)

        const foxEmbed = new Discord.MessageEmbed()
          .setTitle("Aww... Fox!")
          .setColor("#ff9900")
          .setImage(url)
          .setFooter(`${message.server.name}`, `https://i.imgur.com/BkZY6H8.png`);

        message.channel.send({embeds: [foxEmbed.toJSON()]});

        break;

      case "goose":

        await apiFetch("goose");
        if (!url) {
          await apiFetch("goose");
        }

        const gooseEmbed = new Discord.MessageEmbed()
          .setTitle("Hjonk!")
          .setColor("#ff9900")
          .setImage(url)
          .setFooter(`${message.server.name}`, `https://i.imgur.com/BkZY6H8.png`);

        message.channel.send({embeds: [gooseEmbed.toJSON()]});

        break;

      default:

        message.channel.send({
          embeds: [{
            title: "Command: Animal",
            color: 4886754,
            url: `https://wiki.benwhybrow.com/commands/animal`,
            fields: [
              {
                name: "Description:",
                value: "Get a random image of an animal from the list"
              },
              {
                name: "Usage:",
                value: "`sb!animal <ANIMAL>`"
              },
              {
                name: "Example:",
                value: "`sb!animal fox`"
              },
              {
                name: "Aliases:",
                value: "None"
              },
              {
                name: "Possible Values:",
                value: "Cat, Dog, Fox, Goose"
              }
            ],
            footer: {
              icon_url: "https://i.imgur.com/BkZY6H8.png",
              text: `Help Command | Syntax: <> = required, [] = optional`,
            },
          }]
        })

        break;
    }
  },
};