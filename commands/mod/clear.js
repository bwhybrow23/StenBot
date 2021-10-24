module.exports = {
  name: "clear",
  category: "mod",
  description: "Clear a certain amount of messages from chat.",
  usage: "<VALUE>",
  example: "69",
  options: { permission: "STAFF", enabled: true, guildOnly: true },
  run: async (bot, message, args) => {

    const Discord = require("discord.js");
    const config = await bot.mutils.getGuildById(message.guild.id);

    //Perm Check
    if (!message.member.permissions.has("MANAGE_MESSAGES")) {
      return bot.noPermsEmbed(`${message.guild.name}`, bot);
    }

    //Args check
    let amount = args[0];
    if (!amount || amount === undefined || isNaN(amount) || args[0] === "help") {
      return bot.helpEmbed("clear", bot)
        .then((embed) => message.reply(embed))
        .catch((error) => bot.log.post("error", error));
    }

    if (amount > 100 || amount < 1) {
      return bot.createEmbed("error", "", `The amount of messages to clear must be in-between 1 and 100.`, [], `${message.guild.name}`, message)
        .then((embed) => message.reply(embed))
        .catch((error) => bot.log.post("error", error));
    }

    //Fetch the messages
    message.channel.messages.fetch({
      limit: amount,
    }).then((messages) => {
      //Bulk delete them
      message.delete();
      message.channel.bulkDelete(messages).catch(error => bot.log.post("error", error.stack));
    });

    //Send success message
    bot.createEmbed("success", "", `Successfully cleared **${amount}** messages.`, [], `${message.guild.name}`, message)
          .then((embed) => message.reply(embed))
          .catch((error) => bot.log.post("error", error));

    //Logging
    if (config.logging.enabled === true) {
      if (config.logging.level === "low" || config.logging.level === "medium" || config.logging.level === "high") {
        if (bot.efunctions.checkChannel(config.logging.channel, bot) === true) {
          let lchannel = bot.channels.cache.get(config.logging.channel);
          bot.eventEmbed("c70011", message.author, "Bulk Delete", `**Amount:** ${amount}\n**Channel:** ${message.channel.name}`, [], `${message.guild.name}`, bot)
            .then(embed => lchannel.send(embed))
            .catch(error => bot.log.post("error", error));
        }
      }
    }

  },
};