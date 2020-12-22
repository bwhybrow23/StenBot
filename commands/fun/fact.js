module.exports = {
    name: "fact",
    category: "fun",
    description: "Get a random cool fact!",
    usage: "",
    example: "",
    permission: "EVERYONE",
    run: async (bot, message, args) => {

        let Discord = require("discord.js");
        let fetch = require("node-fetch");

        let fact;
        await fetch(`https://nekos.life/api/v2/fact`)
                .then(res => res.json())
                .then(json => fact = json.fact)

        let embed = new Discord.MessageEmbed()
                    .setTitle("Random Fact")
                    .setDescription(fact)
                    .setColor(bot.settings.color.yellow)
                    .setFooter(message.guild.name, `https://i.imgur.com/BkZY6H8.png"`);

        message.channel.send(embed);

    }
}