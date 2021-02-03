module.exports = {
  name: "mcping",
  category: "fun",
  description: "Ping a Minecraft Server to find out more information about it.",
  usage: "<SERVER IP>[:PORT]",
  example: "play.hypixel.net",
  options: { permission: "EVERYONE", aliases: ["mc"], enabled: true, cooldown: 15, guildOnly: false },
  run: async (bot, message, args) => {

    const Discord = require("discord.js");
    const fetch = require("superagent");
    const url = "https://mcapi.us/server/status?ip=";

    if (!args.length || args[0] == "help") {
      return bot.helpEmbed("mcping", bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }

    const ip = args[0];
    if (args[1]) {
      const port = args[1];
    }

    let request = await fetch.get(args[1] ? url + `&port=${port}` : url + ip);
    let res = request.body;
    if (res.status == "error" && res.error == "server timeout") {
      bot.createEmbed("error", "", `Error! The status couldn't be fetched, perhaps an invalid IP or Port.`, [], `${message.server.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }

    var players = 0;
    if (res.players.now) {
      players += res.players.now;
    } else {
      players += 0;
    }

    let motd;
    if (!res.motd) {
      motd = "None";
    } else {
      motd = res.motd;
    }

    if (res.online) {
      bot.createEmbed("success", "Server Status:", ``, [{
          name: "IP",
          value: `${ip}`
        }, {
          name: `Status`,
          value: `Online`
        }, {
          name: `Player Count`,
          value: `${players}/${res.players.max}`
        }, {
          name: `Server Version`,
          value: `${res.server.name}`
        }, {
          name: `MOTD`,
          value: `${motd}`
        }, ], `${message.server.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }

    if (!res.online) {
      bot.createEmbed("success", "Server Status:", ``, [{
          name: "IP",
          value: `${ip}`
        }, {
          name: `Status`,
          value: `Offline`
        }, ], `${message.server.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }
  },
};