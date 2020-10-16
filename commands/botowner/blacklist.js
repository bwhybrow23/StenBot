module.exports = {
  name: "blacklist",
  category: "botowner",
  description: "Blacklist a server from using StenBot.",
  usage: "<SERVER ID>",
  example: "712815477344305262",
  permission: "BOT OWNER",
  run: async (bot, message, args) => {

    const Discord = require("discord.js");
    if (!message.guild) return;
    const fs = require("fs");
    const colors = require("colors");

    //Check if the command was sent by Sten
    if (message.author.id != 346246641595973633) {
      return bot.noPermsEmbed(`${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }

    const targetserver = args[0];
    if (!targetserver || args[0] == "help") {
      return bot.helpEmbed("blacklist", bot)
      .then((embed) => message.channel.send(embed))
      .catch((error) => bot.logger("error", error));
    }

    if (targetserver === '455782308293771264') {
      return bot.createEmbed("error", "", `Error! You do not have permission to blacklist the bot's main guild.`, [], `${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }

    //Attempt to read the server's config
    try {
      var targetserverfile = await bot.mutils.getGuildById(message.guild.id);
    } catch (err) {
      return bot.createEmbed("error", "", `Error! I cannot find the server for the ID you provided.`, [], `${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }

    //Get the target guilds guild object
    const targetguild = bot.guilds.cache.get(targetserver);

    //Blacklist server
    bot.mutils.updateGuildById(targetserverfile, { blacklisted: true }).then(() => {

    //Black list success message
    bot.createEmbed("success", "", `Success!\nServer: **${targetguild.name} | ${targetguild.id}** has been blacklisted.`, [], `${message.guild.name}`, bot)
      .then((embed) => message.channel.send(embed))
      .catch((error) => bot.logger("error", error));

    //Log message
    bot.createEmbed("warning", "", `Server **${targetguild.name} | ${targetguild.id}** has been blacklisted by **${message.author.tag}**`, [], `${message.guild.name}`, bot)
      .then((embed) => bot.guilds.cache.get("455782308293771264").channels.cache.get("565273737201713153").send(embed))
      .catch((error) => bot.logger("error", error));

    //DM Guild Owner
    bot.createEmbed("error", "", `I'm afraid that your server **${targetguild.name}** has been blacklisted from StenBot. If you believe this is an error, please contact **Stentorian#9524** or join the **[Discord](https://discord.benwhybrow.com)**.`, [], `${message.guild.name}`, bot)
      .then((embed) => targetguild.owner.send(embed))
      .catch((error) => bot.logger("error", error));

    //Leave the blacklisted guild
    targetguild.leave();

    })

  },
};
