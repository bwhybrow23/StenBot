module.exports = {
  name: "mcping",
  category: "fun",
  description: "Ping a Minecraft Server to find out more information about it.",
  usage: "<SERVER IP>[:PORT]",
  example: "play.hypixel.net",
  options: { permission: "EVERYONE", aliases: ["mc"], enabled: true, cooldown: 3, guildOnly: false },
  run: async (bot, message, args) => {

    const Discord = require("discord.js");
    const fetch = require("superagent");
    const fs = require("fs");
    const url = "https://mcapi.us/server/status?ip=";

    if (!args.length || args[0] == "help") {
      return bot.helpEmbed("mcping", bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }

    let address = args[0].split(":");
    let ip = address[0];
    let port;
    if (address[1]) {
      port = address[1];
    }

    let request;
    if(port) {
      request = await fetch.get(url + ip + `&port=${port}`);
    }
    else if (!port) {
      request = await fetch.get(url + ip);
    }

    let res = request.body;
    if (res.status == "error" && res.error == "server timeout") {
      bot.createEmbed("error", "", `Error! The status couldn't be fetched, perhaps an invalid IP or Port.`, [], `${message.server.name}`, message)
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
        let onlineEmbed = new Discord.MessageEmbed()
          .setColor(1295876)
          .setTitle("Server Status:")
          .addField("IP:", `${address}`, true)
          .addField("Status:", "Online", true)
          .addField("Player Count:", `${players}/${res.players.max}`, true)
          .addField("Server Version:", res.server.name, true)
          .addField("MOTD:", motd, false)
          .setFooter(message.server.name, message.server.iconURL());
        message.channel.send({embeds: [onlineEmbed.toJSON()]});
    }

    if (!res.online) {
      bot.createEmbed("error", "Server Status:", ``, [{
          name: "IP",
          value: `${ip}`
        }, {
          name: `Status`,
          value: `Offline`
        }, ], `${message.server.name}`, message)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }
  },
};
