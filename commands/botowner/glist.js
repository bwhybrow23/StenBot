module.exports = {
  name: "glist",
  category: "botowner",
  description: "Gain a list of all the guilds the bot is in.",
  usage: "",
  example: "",
  options: { permission: "BOTOWNER", enabled: true, guildOnly: true },
  run: async (bot, message, args) => {

    const Discord = require("discord.js");

    //Permission Check
    if (message.author.id !== bot.settings.ids.botOwner) {
      return;
    };

    let guildList = [];
    bot.guilds.cache.forEach(function(guilds) {
      guildList.push(`${guilds.name} ||  ${guilds.id}`);
    });

    bot.createEmbed("info", "**Guild List**", "", [{
        name: "Guilds",
        value: `\`\`\`${guildList.join("\n")}\`\`\``
      }], `${message.guild.name}`, bot)
      .then((embed) => message.channel.send(embed))
      .catch((error) => bot.log.post("error", error));
  }
};