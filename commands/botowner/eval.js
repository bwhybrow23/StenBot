module.exports = {
  name: "eval",
  category: "botowner",
  description: "Run JavaScript code from within the bot",
  usage: "<CODE>",
  example: "message.channel.send(\"Hello World!\")",
  permission: "BOT OWNER",
  run: async (bot, message, args) => {

    const Discord = require("discord.js");
    if (!message.guild) return;

    if (message.author.id !== bot.settings.ids.botOwner) {
      return bot.noPermsEmbed(`${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    };

    try {
      let codein = args.join(" ");
      if (!codein || args[0] == "help") {
        return bot.helpEmbed("eval", bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
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
      message.channel.send(embed);
    } catch (e) {
      message.channel.send(`\`\`\`js\n${e}\n\`\`\``);
    }
  },
};
