module.exports = {
    name: "animal",
    category: "fun",
    description: "Get a random image of an animal from a list.",
    usage: "<ANIMAL>",
    example: "dog",
    permission: "EVERYONE",
    aliases: [],
    enabled: true,
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
                    .setFooter(`${message.guild.name}`, `https://i.imgur.com/BkZY6H8.png`);

                message.channel.send(catEmbed);
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
                    .setFooter(`${message.guild.name}`, `https://i.imgur.com/BkZY6H8.png`);

                message.channel.send(dogEmbed);

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
                    .setFooter(`${message.guild.name}`, `https://i.imgur.com/BkZY6H8.png`);

                message.channel.send(gooseEmbed);

                break;

            default:
                break;
        }
    },
};