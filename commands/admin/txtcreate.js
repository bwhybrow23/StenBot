module.exports = {
  name: "txtcreate",
  category: "admin",
  description: "Creates a text channel.",
  usage: "<NAME> [CATEGORY]",
  example: "general-chat Community",
  options: { permission: "ADMIN", aliases: ["txt"], enabled: true, guildOnly: true, cooldown: 5 },
  run: async (bot, message, args) => {

    const Discord = require("discord.js");

    //Config and Permission Check
    const config = await bot.mutils.getGuildById(message.guild.id);

    if (message.member.permissions.has("ADMINISTRATOR") == false) {
      return bot.noPermsEmbed(`${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }

    //Input validation
    var n = args[0];
    if (!n || args[0] == "help") {
      return bot.helpEmbed("txtcreate", bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }

    if (n == undefined) {
      return bot.createEmbed("error", "", `Error! You forgot to include a name for the channel!`, [], `${message.guild.name}`, message)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }

    var ca = args.slice(1).join(" ") || "None";

    if (n.length > 100) {
      return bot.createEmbed("error", "", `The channel name has to be between 1 and 100 in **length**`, [], `${message.guild.name}`, message)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }

    if (ca.length > 100) {
      return bot.createEmbed("error", "", `The channel category has to be less than 100 characters.`, [], `${message.guild.name}`, message)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }

    //If a category is provided find it (create it if it doesn't exist)
    let cat;
    try {
      cat = message.guild.channels.cache.find(channel => channel.name == ca && channel.type == "GUILD_CATEGORY");
    } catch (error) {
      message.guild.channels.create(ca, {
        type: 'category'
      }).then(channel => cat = channel);
    }
    if (!cat) {
      message.guild.channels.create(ca, {
        type: 'category'
      }).then(channel => cat = channel);
    }

    //Create the channel and do the stuff
    message.guild.channels.create(`${n}`, {
      type: 'text',
      reason: `Created by ${message.author.tag}`
    }).then((channel) => {
      channel.setParent(cat);
      return bot.createEmbed("success", "", `The channel **${channel.name}** has been created.`, [], `${message.guild.name}`, message)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    });
  },
};