module.exports = {
  name: "ginvite",
  category: "bot",
  description:
    "Get an invite to a guild the bot is in. (Mainly used for finding abuse)",
  usage: "sb!ginvite <SERVER ID>",
  permission: "BOT OWNER",
  run: async (bot, message, args) => {

    const Discord = require("discord.js");
    if (!message.guild) return;

    if (message.author.id !== bot.settings.ids.botOwner) {
      return bot.noPermsEmbed(`${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }

    let guildid = args[0];
    let guild = bot.guilds.cache.get(guildid);
    if (!guild) {
      return bot.createEmbed("error", "", `Error! The bot isn't in a guild with that ID.`, [], `${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }

    let invitechannels = guild.channels.cache.filter((c) =>
      c.permissionsFor(guild.me).has("CREATE_INSTANT_INVITE")
    );

    if (!invitechannels) {
      return bot.createEmbed("error", "", `Error! I don't have permission to create an invite in that guild.`, [], `${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }

    invitechannels.random().createInvite()
      .then((invite) =>
        message.channel.send(`Server name: **${guild.name}**\nInvite: https://discord.gg/${invite.code}`)
      );
  },
};
