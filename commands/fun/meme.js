const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("meme").setDescription("Generate a random Reddit meme."),
  category: "fun",
  options: { permission: "EVERYONE", enabled: true, cooldown: 2, guildOnly: false },
  run: async (bot, interaction) => {
    
    let fetch = require("node-fetch");

    let meme;
    await fetch(`https://meme-api.herokuapp.com/gimme`)
      .then(res => res.json())
      .then(json => meme = json)
      .catch((error) => {
        bot.log.post("error", error)
        return interaction.reply({ content: "An error occured while generating a meme. This could be because the API is down. Please try again later and if the issue persists, contact the bot owner.", ephemeral: "true" });
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

    interaction.reply({embeds: embed});

  },
}