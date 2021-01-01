module.exports = {
  name: "ginvite",
  category: "botowner",
  description: "Get an invite to a guild the bot is in.",
  usage: "<SERVER ID>",
  example: "712815477344305262",
  permission: "BOT OWNER",
  aliases: [],
  enabled: true,
  run: async (bot, message, args) => {

    const Discord = require("discord.js");
    if (!message.guild) return;

    if (message.author.id !== bot.settings.ids.botOwner) {
      return bot.noPermsEmbed(`${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }

    let guildid = args[0];
    if (!guildid || args[0] == "help") {
      return bot.helpEmbed("ginvite", bot)
      .then((embed) => message.channel.send(embed))
      .catch((error) => bot.log.post("error", error));
    }
    let guild = bot.guilds.cache.get(guildid);
    if (!guild) {
      return bot.createEmbed("error", "", `Error! The bot isn't in a guild with that ID.`, [], `${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }

    let invitechannels = guild.channels.cache.filter((c) =>
      c.permissionsFor(guild.me).has("CREATE_INSTANT_INVITE")
    );

    if (!invitechannels) {
      return bot.createEmbed("error", "", `Error! I don't have permission to create an invite in that guild.`, [], `${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }

    invitechannels.random().createInvite()
      .then((invite) =>
        message.channel.send(`Server name: **${guild.name}**\nInvite: https://discord.gg/${invite.code}`)
      );
  },
};
