module.exports = {
  name: "blacklist",
  category: "bot",
  description: "Blacklist a server from using StenBot.",
  usage: "sb!blacklist <SERVER ID>",
  permission: "BOT OWNER",
  run: async (bot, message, args) => {
    const Discord = require("discord.js");
    const fs = require("fs");
    const colors = require("colors");

    //Check if the command was sent in the team guild
    if (message.guild.id != 455782308293771264) {
      bot
        .noPermsEmbed(`${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => console.error(error));
    }

    const targetserver = args[0];

    //Check if args have been included
    if (targetserver == undefined) {
      bot
        .createEmbed(
          "error",
          "",
          `Error! You need to include the ID of the server to blacklist.`,
          [],
          `${message.guild.name}`,
          bot
        )
        .then((embed) => message.channel.send(embed))
        .catch((error) => console.error(error));
    }

    if (targetserver == bot.settings.guilds.mainGuild) {
      bot
        .createEmbed(
          "error",
          "",
          `Error! You do not have permission to blacklist the bot's main guild.`,
          [],
          `${message.guild.name}`,
          bot
        )
        .then((embed) => message.channel.send(embed))
        .catch((error) => console.error(error));
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
      bot
        .createEmbed(
          "error",
          "",
          `Error! I cannot find the server for the ID you provided.`,
          [],
          `${message.guild.name}`,
          bot
        )
        .then((embed) => message.channel.send(embed))
        .catch((error) => console.error(error));
    }

    //Get the target guilds guild object
    const targetguild = bot.guilds.get(targetserver);

    //Set blacklist to true
    targetserverfile.blacklisted = true;

    fs.writeFileSync(
      `./data/servers/server-${targetserver}/serverstats.json`,
      JSON.stringify(targetserverfile, null, 4),
      (err) => {
        if (err) return console.log("[SYSTEM]".grey + err);
      }
    );

    //Black list success message
    bot
      .createEmbed(
        "success",
        "",
        `Success!\nServer: **${targetguild.name} | ${targetguild.id}** has been blacklisted.`,
        [],
        `${message.guild.name}`,
        bot
      )
      .then((embed) => message.channel.send(embed))
      .catch((error) => console.error(error));

    //Log message
    bot
      .createEmbed(
        "warning",
        "",
        `Server **${targetguild.name} | ${targetguild.id}** has been blacklisted by **${message.author.tag}**`,
        [],
        `${message.guild.name}`,
        bot
      )
      .then((embed) => bot.channels.get("565273737201713153").send(embed))
      .catch((error) => console.error(error));

    //DM Guild Owner
    bot
      .createEmbed(
        "warning",
        "",
        `I'm afraid that your server **${targetguild.name} has been blacklisted from StenBot. If you believe this is an error, please contact Stentorian#9524 or join the [Discord](https://discord.benwhybrow.com)`,
        [],
        `${message.guild.name}`,
        bot
      )
      .then((embed) => targetguild.owner.send(embed))
      .catch((error) => console.error(error));

    //Leave the blacklisted guild
    targetguild.leave();
  },
};
