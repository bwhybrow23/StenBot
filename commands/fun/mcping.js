module.exports = {
  name: "mcping",
  category: "fun",
  description: "Ping a Minecraft Server",
  usage: "sb!mcping <SERVER IP>{:PORT}",
  permission: "EVERYONE",
  run: async (bot, message, args) => {

    const Discord = require("discord.js");
    if (!message.guild) return;
    const fetch = require("superagent");
    const url = "https://mcapi.us/server/status?ip=";

    if (!args.length) {
      return message.channel.send("help embed not done");
    }

    const ip = args[0];
    if (args[1]) {
      const port = args[1];
    }

    let request = await fetch.get(args[1] ? url + `&port=${port}` : url + ip);
    let res = request.body;
    if (res.status !== "success") {
      bot.createEmbed("error","",`Error! The status couldn't be fetched, perhaps an invalid IP or Port.`,[],`${message.guild.name}`,bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
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
      bot.createEmbed("success","Server Status:",``,[{ name: "IP", value: `${ip}` },{ name: `Status`, value: `Online` },{ name: `Player Count`, value: `${players}/${res.players.max}` },{ name: `Server Version`, value: `${res.server.name}` },{ name: `MOTD`, value: `${motd}` },],`${message.guild.name}`,bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }

    if (!res.online) {
      bot.createEmbed("success","Server Status:",``,[{ name: "IP", value: `${ip}` },{ name: `Status`, value: `Offline` },],`${message.guild.name}`,bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }
  },
};
