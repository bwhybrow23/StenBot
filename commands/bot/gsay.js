module.exports = {
  name: "gsay",
  category: "bot",
  description: "Sends a message to all the owners of the servers that the bot is in.",
  usage: "sb!gsay <MESSAGE>",
  permission: "BOT OWNER",
  run: async (bot, message, args) => {

    const Discord = require("discord.js");

    if (message.author.id !== bot.settings.ids.botOwner) {
      return bot.noPermsEmbed(`${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => console.error(error));
    }

    let message1 = args.slice(0).join(" ");
    if (!message1) {
      return bot.createEmbed("error", "", `Error! You have not included the message that you would like to send.`, [], `${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => console.error(error));
    }

    const date = new Date();
    const timestamp = date.getTime();

    bot.guilds.cache.forEach(async (guild) => {
      bot.createEmbed("info", "Message from StenBot Owner", `You have been sent this message by the owner of StenBot (Stentorian#9524) to inform you. The bot has seen that you are the server owner of ${guild.name} so it has been sent to you. Feel free to communicate the below message to other people.`, [{ name: "Server Name", value: `${guild.name}`}, { name: "Message", value: `${message1}`}], `${message.guild.name}`, bot)
        .then((embed) => guild.owner.send(embed))
        .catch((error) => console.error(error));

      message.reply(`Your message has been sent to ${guild.name} succesfully.`);

      await sleep(3000);
    });

    function sleep(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    }  

  }
};