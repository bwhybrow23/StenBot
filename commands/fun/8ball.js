module.exports = {
  name: "8ball",
  category: "fun",
  description: "Ask a question to the magic ball and it will answer.",
  usage: "<QUESTION>",
  example: "Will I ever stop losing the game?",
  options: { permission: "EVERYONE", enabled: true, cooldown: 10, guildOnly: false },
  run: async (bot, message, args) => {

    const Discord = require("discord.js");
    let fetch = require("node-fetch");

    let question = args.slice(0).join(" ");
    if (!question || args[0] == "help") {
      return bot.helpEmbed("8ball", bot)
        .then((embed) => message.reply(embed))
        .catch((error) => bot.log.post("error", error));
    }

    //Nekos.life API integration
    let result;
    await fetch(`https://nekos.life/api/v2/8ball`)
      .then(res => res.json())
      .then(json => result = json)


    let ballEmbed = new Discord.MessageEmbed()
      .setColor(bot.settings.color.yellow)
      .addField("Question", question)
      .addField("Answer", result.response)
      .setImage(result.url)
      .setFooter(`${message.server.name}`, `https://i.imgur.com/BkZY6H8.png`);

    message.reply({ content: "The 8ball is working it's magic! :tada:" }).then((m) => {
      setTimeout(() => {
        m.edit({ content: "Your result!", embeds: [ballEmbed.toJSON()] });
      }, 1000);
    }).catch((e) => {
      bot.log.post("error", e);
    })
    
  },
};