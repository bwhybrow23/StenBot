module.exports = {
  name: "test",
  category: "admin",
  description: "Test Command",
  usage: "sb!test",
  example: "sb!test test",
  permission: "Admins",
  run: async (bot, message, args) => {
    const Discord = require("discord.js");

    // bot.noPermsEmbed(`${message.guild.name}`, bot)
    // .then(embed => message.channel.send(embed))
    // .catch(error => console.error(error))

    bot
      .helpEmbed(
        "test",
        [
          { name: "`sb!test 1`", value: "First subcommand" },
          { name: "`sb!test 2`", value: "Second subcommand" },
        ],
        `${message.guild.name}`,
        bot
      )
      .then((embed) => message.channel.send(embed))
      .catch((error) => console.error(error));
  },
};
