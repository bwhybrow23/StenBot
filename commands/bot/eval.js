module.exports = {
  name: "eval",
  category: "bot",
  description: "Run code from within the bot",
  usage: "sb!eval <CODE>",
  permission: "BOT OWNER",
  run: async (bot, message, args) => {
    const Discord = require("discord.js");

    if (message.author.id !== bot.settings.ids.botOwner) {
      return bot.noPermsEmbed(`${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => console.error(error));
    };

    try {
      let codein = args.join(" ");
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
