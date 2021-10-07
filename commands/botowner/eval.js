module.exports = {
  name: "eval",
  category: "botowner",
  description: "Run JavaScript code from within the bot",
  usage: "<CODE>",
  example: "message.channel.send(\"Hello World!\")",
  options: { permission: "BOTOWNER", enabled: true, guildOnly: true },
  run: async (bot, message, args) => {

    const Discord = require("discord.js");

    //Permission Check
    if (message.author.id !== bot.settings.ids.botOwner) {
      return;
    };

    try {
      let codein = args.join(" ");
      if (!codein || args[0] === "help") {
        return bot.helpEmbed("eval", bot)
          .then((embed) => message.reply(embed))
          .catch((error) => bot.log.post("error", error));
      }
      let code = eval(codein);

      if (typeof code !== "string")
        code = require("util").inspect(code, {
          depth: 0,
        });
      let embed = new Discord.MessageEmbed()
        .setAuthor("Evaluate")
        .setColor(bot.settings.color.yellow)
        .addField(":inbox_tray: Input", `\`\`\`js\n${codein}\`\`\``)
        .addField(":outbox_tray: Output", `\`\`\`js\n${code}\n\`\`\``)
        .setFooter(`Eval Command`, bot.user.displayURL)
        .setTimestamp();
      message.channel.send({embeds: [embed.toJSON()]});
    } catch (e) {
      message.channel.send(`\`\`\`js\n${e}\n\`\`\``);
    }
  },
};