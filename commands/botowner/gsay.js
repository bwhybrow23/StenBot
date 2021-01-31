module.exports = {
  name: "gsay",
  category: "botowner",
  description: "Sends a message to all the owners of the servers that the bot is in.",
  usage: "<MESSAGE>",
  example: "Hello Everyone!",
  options: { permission: "BOTOWNER", enabled: true, guildOnly: true },
  run: async (bot, message, args) => {

    const Discord = require("discord.js");

    //Permission Check
    if (message.author.id !== bot.settings.ids.botOwner) {
      return;
    };

    let msg = args.slice(0).join(" ");
    if (!msg || args[0] == "help") {
      return bot.helpEmbed("gsay", bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }

    const date = new Date();
    const timestamp = date.getTime();

    bot.guilds.cache.forEach(async (guild) => {
      bot.createEmbed("info", "Message from StenBot Owner", `You have been sent this message by the owner of StenBot (Stentorian#9524) to inform you. The bot has seen that you are the server owner of **${guild.name}** so it has been sent to you. Feel free to communicate the below message to other people.`, [{
          name: "Server Name",
          value: `${guild.name}`
        }, {
          name: "Message",
          value: `${msg}`
        }], `${message.guild.name}`, bot)
        .then((embed) => guild.owner.send(embed))
        .catch((error) => bot.log.post("error", error));

      message.reply(`Your message has been sent to **${guild.name}** succesfully.`);

      await sleep(3000);
    });

    function sleep(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    }

  }
};