const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("animal")
    .setDescription("Get a random image of an animal from a list")
    .addSubcommand(subCommand => subCommand.setName("cat").setDescription("Get a random image of a cat"))
    .addSubcommand(subCommand => subCommand.setName("dog").setDescription("Get a random image of a dog"))
    .addSubcommand(subCommand => subCommand.setName("fox").setDescription("Get a random image of a fox"))
    .addSubcommand(subCommand => subCommand.setName("goose").setDescription("Get a random image of a goose"))
    .addSubcommand(subCommand => subCommand.setName("lizard").setDescription("Get a random image of a lizard")),
  category: "fun",
  usage: "<ANIMAL>",
  example: "fox",
  options: { permission: "EVERYONE", enabled: true, cooldown: 10, guildOnly: false },
  run: async (bot, interaction) => {

    const Discord = require("discord.js");
    const fetch = require("node-fetch");

    let animal = interaction.options.getSubcommand();
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
          .setFooter({ text: interaction.guild.name, iconURL: `https://i.imgur.com/klY5xCe.png"` });

        interaction.reply({embeds: [catEmbed.toJSON()]});
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
          .setFooter({ text: interaction.guild.name, iconURL: `https://i.imgur.com/klY5xCe.png"` });

        interaction.reply({embeds: [dogEmbed.toJSON()]});

        break;

      case "fox":

        await fetch("https://randomfox.ca/floof/")
          .then(res => res.json())
          .then(json => url = json.image)

        const foxEmbed = new Discord.MessageEmbed()
          .setTitle("Aww... Fox!")
          .setColor("#ff9900")
          .setImage(url)
          .setFooter({ text: interaction.guild.name, iconURL: `https://i.imgur.com/klY5xCe.png"` });

        interaction.reply({embeds: [foxEmbed.toJSON()]});

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
          .setFooter({ text: interaction.guild.name, iconURL: `https://i.imgur.com/klY5xCe.png"` });

        interaction.reply({embeds: [gooseEmbed.toJSON()]});

        break;

        case "lizard":

          await apiFetch("lizard");
          if (!url) {
            await apiFetch("lizard");
          }
  
          const lizardEmbed = new Discord.MessageEmbed()
            .setTitle("Cute lil lizard!")
            .setColor("#ff9900")
            .setImage(url)
            .setFooter({ text: interaction.guild.name, iconURL: `https://i.imgur.com/klY5xCe.png"` });
  
          interaction.reply({embeds: [lizardEmbed.toJSON()]});
  
          break;

      default:
        break;
    }
  },
};