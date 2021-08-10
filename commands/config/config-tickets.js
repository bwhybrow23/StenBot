module.exports = {
  name: "config-tickets",
  category: "config",
  description: "Change all config variables related to tickets.",
  usage: "<SUBCOMMAND>",
  example: "enable",
  options: { permission: "ADMIN", aliases: ["c-tickets"], enabled: true, guildOnly: true },
  run: async (bot, message, args) => {

    const Discord = require("discord.js");

    if (message.member.permissions.has("ADMINISTRATOR") == false) {
      return bot.noPermsEmbed(`${message.guild.name}`, bot)
        .then((embed) => message.reply(embed))
        .catch((error) => bot.log.post("error", error));
    }

    //Check if they included a setting
    let setting = args[0];

    if (setting == undefined) {
      return bot.createEmbed("error", "", `Error! You forgot to include a ticket setting.`, [], `${message.guild.name}`, message)
        .then((embed) => message.reply(embed))
        .catch((error) => bot.log.post("error", error));
    }

    //Get the server config
    let config = await bot.mutils.getGuildById(message.guild.id);

    //settings library
    switch (setting) {
      case "enable":
        
        if (config.tickets.enabled == true) {
          return bot.createEmbed("error", "", `Error! Tickets are already enabled.`, [], `${message.guild.name}`, message)
            .then((embed) => message.reply(embed))
            .catch((error) => bot.log.post("error", error));
        }

        config.tickets.enabled = true;
        bot.mutils.updateGuildById(message.guild.id, config);

        //Check for a category called tickets, if it does not exist create one
        function isCatTickets(element) {
          if (element.constructor.name != "CategoryChannel") {
            return false;
          }
          if (element.name != "Tickets") {
            return false;
          }
          return true;
        }
        if (!message.guild.channels.cache.some(isCatTickets)) {
          message.guild.channels.create("Tickets", {
            type: "category",
            reason: 'Category for StenBot Tickets'
          });
        }

        bot.createEmbed("success", "", `Tickets have been enabled.`, [], `${message.guild.name}`, message)
          .then((embed) => message.reply(embed))
          .catch((error) => bot.log.post("error", error));

        break;
      case "disable":
        if (config.tickets.enabled == false) {
          return bot.createEmbed("error", "", `Error! Tickets are already disabled.`, [], `${message.guild.name}`, message)
            .then((embed) => message.reply(embed))
            .catch((error) => bot.log.post("error", error));
        }
        config.tickets.enabled = false;
        bot.mutils.updateGuildById(message.guild.id, config);
        //Find and delete tickets category
        message.guild.channels.cache.find(c => c.name == "Tickets" && c.type == "category").delete();

        bot.createEmbed("success", "", `Tickets have been disabled.`, [], `${message.guild.name}`, message)
          .then((embed) => message.reply(embed))
          .catch((error) => bot.log.post("error", error));
        break;
      case "message":
        var tmessage = args.slice(1).join(" ");

        if (tmessage.length < 1 || tmessage == "None") {
          config.tickets.message = "**User:** ${user}\n**Reason:** ${reason}"
          bot.mutils.updateGuildById(message.guild.id, config);
          return bot.createEmbed("success", "", `The ticket message has been reset.`, [], `${message.guild.name}`, message)
            .then((embed) => message.reply(embed))
            .catch((error) => bot.log.post("error", error));
        }

        if (tmessage.length > 256) {
          return bot.createEmbed("error", "", `Error! The message you have provided is too long! Make sure it is less than **256** characters.`, [], `${message.guild.name}`, message)
            .then((embed) => message.reply(embed))
            .catch((error) => bot.log.post("error", error));
        }

        config.tickets.message = message;
        bot.mutils.updateGuildById(message.guild.id, config);
        bot.createEmbed("success", "", `Ticket message set!`, [], `${message.guild.name}`, message)
          .then((embed) => message.reply(embed))
          .catch((error) => bot.log.post("error", error));

        break;
      default:
        return bot.createEmbed("error", "", `Error! There is no ticket config setting called **${setting}**.`, [], `${message.guild.name}`, message)
          .then((embed) => message.reply(embed))
          .catch((error) => bot.log.post("error", error));
    }
  },
};