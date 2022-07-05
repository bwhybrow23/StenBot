const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lewd").setDescription("A randomly generated photo of *you know what*."),
  category: "fun",
  usage: "",
  example: "",
  options: { permission: "EVERYONE", enabled: true, cooldown: 3, guildOnly: true },
  run: async (bot, interaction) => {

    const fetch = require("node-fetch");

    if (interaction.channel.channel.nsfw === false) {
      return interaction.reply("Run this command in an **NSFW** channel.")
    }

    let url;
    await fetch(`http://api.nekos.fun:8080/api/lewd`)
      .then(res => res.json())
      .then(json => url = json.image)

    const lewdEmbed = {
      "title": "Here you go, you filthy animal:",
      "image": {
        "url": url
      },
      "color": bot.settings.color.yellow,
      "footer": {
        "text": "Powered by nekos.fun"
      }
    }

    interaction.reply({ embeds: [lewdEmbed] });

  },
}