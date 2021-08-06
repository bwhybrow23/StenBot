module.exports = {
    name: "fact",
    category: "fun",
    description: "Get a random cool fact!",
    usage: "",
    example: "",
    options: { permission: "EVERYONE", enabled: true, cooldown: 10, guildOnly: false },
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
        .setFooter(message.server.name, `https://i.imgur.com/BkZY6H8.png"`);
  
      message.channel.send({embeds: [embed.toJSON()]});
  
    }
  }