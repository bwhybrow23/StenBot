module.exports = {
    name: "gif",
    category: "fun",
    description: "Search for a specific GIF",
    usage: "<QUERY>",
    example: "monkeys",
    options: { permission: "EVERYONE", enabled: true, cooldown: 3, guildOnly: false },
    run: async (bot, message, args) => {
  
      let Discord = require("discord.js");
      let fetch = require("node-fetch");
  
      let query = args.slice(0).join(" ");
      if (!query) return message.channel.send("Please provide a search query.")
  
      let response;
      await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${bot.settings.connections.giphyAPI}&q=${query}&limit=10&offset=0&rating=pg-13&lang=en`)
        .then(res => res.json())
        .then(json => response = json)
        .catch(error => {
          bot.log.post("error", error);
          message.reply("An error occured, please contact support if this continues to happen.")
        });
  
      let toBeUsed = response.data[Math.floor(Math.random() * response.data.length)];
      if (!toBeUsed) return message.channel.send("There was no result for this query.");
  
      let embed = new Discord.MessageEmbed()
        .setTitle(`Giphy Image: ${toBeUsed.slug}`)
        .setImage(toBeUsed.images.original.url)
        .setURL(toBeUsed.url)
        .setColor(bot.settings.color.yellow)
        .setFooter({ text: `Powered by GIPHY`, iconURL: `https://i.imgur.com/gJMxGvU.gif`});
  
      message.channel.send({embeds: [embed.toJSON()]});
  
    }
  }