module.exports = {
  name: "8ball",
  category: "fun",
  description: "Ask a question to the magic ball and it will answer.",
  usage: "sb!8ball <MESSAGE>",
  permission: "EVERYONE",
  run: async (bot, message, args) => {

    const Discord = require("discord.js");
    let fetch = require("node-fetch");
    if (!message.guild) return;

    if (!args[0]) return message.channel.send("Help embed needs doing.");

    // var replies = [
    //   "Yes.",
    //   "No.",
    //   "I don't know.",
    //   "Ask again later.",
    //   "Umm...",
    //   "Questionable.",
    //   "Maybe.",
    //   "Ask someone else.",
    //   "There's a possibility.",
    //   "Never.",
    // ];

    // let result = Math.floor(Math.random() * replies.length);
    let question = args.slice(0).join(" ");

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
      .setFooter(`${message.guild.name}`, `https://i.imgur.com/BkZY6H8.png`);

    message.channel.send("The 8ball is working it's magic! :tada:").then((m) => {setTimeout(() => {m.edit(ballEmbed);}, 1000);})
      .catch((e) => {
        bot.logger("error", e);
      });
  },
};
