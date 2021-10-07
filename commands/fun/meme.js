module.exports = {
  name: "meme",
  category: "fun",
  description: "Generate a random Reddit meme",
  usage: "",
  example: "",
  options: { permission: "EVERYONE", enabled: true, cooldown: 2, guildOnly: false },
  run: async (bot, message, args) => {
    
    const Discord = require("discord.js");
    let fetch = require("node-fetch");

    let meme;
    await fetch(`https://meme-api.herokuapp.com/gimme`)
      .then(res => res.json())
      .then(json => meme = json)
      .catch((error) => {
        bot.log.post("error", error)
        return message.reply("Command issue. Please contact the bot owner.");
      })

    let embed = [{
      "title": `r/${meme.subreddit} - ${meme.title}`,
      "url": meme.postLink,
      "color": "RANDOM",
      "image": {
        "url": meme.url
      },
      "footer": {
        "text": `👍 ${meme.ups.toString()}`
      }
    }]

    message.reply({embeds: embed});

  },
}