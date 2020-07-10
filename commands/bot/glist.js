module.exports = {
  name: "glist",
  category: "bot",
  description:
    "Gain a list of all the guilds the bot is in. Only name and ID is given.",
  usage: "sb!glist",
  permission: "BOT OWNER",
  run: async (bot, message, args) => {
    const Discord = require("discord.js");

    let guildList = [];
    bot.guilds.forEach(function (guilds) {
      guildList.push(`${guilds.name} ||  ${guilds.id}`);
    });

    bot
      .createEmbed(
        "info",
        "**Guild List**",
        "",
        [
          {
            name: "Guilds",
            value: `\`\`\`${guildList.join("\n")}\`\`\``,
          },
        ],
        `${message.guild.name}`,
        bot
      )
      .then((embed) => message.channel.send(embed))
      .catch((error) => console.error(error));
  },
};
