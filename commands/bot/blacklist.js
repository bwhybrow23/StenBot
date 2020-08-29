module.exports = {
  name: "blacklist",
  category: "bot",
  description: "Blacklist a server from using StenBot.",
  usage: "sb!blacklist <SERVER ID>",
  permission: "BOT OWNER",
  run: async (bot, message, args) => {

    const Discord = require("discord.js");
    if (!message.guild) return;
    const fs = require("fs");
    const colors = require("colors");

    //Check if the command was sent in the team guild
    if (message.author.id != 346246641595973633) {
      return bot.noPermsEmbed(`${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }

    const targetserver = args[0];

    //Check if args have been included
    if (targetserver == undefined) {
      return bot.createEmbed("error", "", `Error! You need to include the ID of the server to blacklist.`, [], `${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }

    if (targetserver === '455782308293771264') {
      return bot.createEmbed("error", "", `Error! You do not have permission to blacklist the bot's main guild.`, [], `${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }

    //Attempt to read the servers stats file
    try {
      var targetserverfile = JSON.parse(
        fs.readFileSync(
          `./data/servers/server-${targetserver}/serverstats.json`,
          "utf8"
        )
      );
    } catch (err) {
      return bot.createEmbed("error", "", `Error! I cannot find the server for the ID you provided.`, [], `${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }

    //Get the target guilds guild object
    const targetguild = bot.guilds.cache.get(targetserver);

    //Set blacklist to true
    targetserverfile.blacklisted = true;

    fs.writeFileSync(
      `./data/servers/server-${targetserver}/serverstats.json`,
      JSON.stringify(targetserverfile, null, 4),
      (err) => {
        if (err) return bot.logger("error", err);
      }
    );

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
  },
};
