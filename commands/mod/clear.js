module.exports = {
  name: "clear",
  category: "mod",
  description: "Clear a certain amount of messages from chat.",
  usage: "<VALUE>",
  example: "69",
  options: { permission: "STAFF", enabled: true, guildOnly: true },
  run: async (bot, message, args) => {

    const Discord = require("discord.js");

    var config = await bot.mutils.getGuildById(message.guild.id);

    if (!message.member.permissions.has("MANAGE_MESSAGES")) {
      return bot.noPermsEmbed(`${message.guild.name}`, bot);
    }

    var amount = args[0];
    if (!amount || amount == undefined || isNaN(amount) || args[0] == "help") {
      return bot.helpEmbed("clear", bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }

    if (amount > 100) {
      return bot.createEmbed("error", "", `Error! You can't clear more than 100 messages at a time!`, [], `${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }

    if (amount < 1) {
      return bot.createEmbed("error", "", `Error! You can't clear less than 1 message you silly goose!`, [], `${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }

    message.channel.messages.fetch({
      limit: amount,
    }).then((messages) => {
      message.delete();
      message.channel.bulkDelete(messages).catch(error => bot.log.post("error", error.stack));
    });

    message.channel.send({
      embed: {
        color: bot.settings.color.green,
        description: `Successfully cleared **${amount}** messages in **${message.channel.name}**`
      }
    });

    //Logging
    const efunctions = require('../../main/functions/eventUtils.js');
    if (config.logging.enabled === true) {
      if (config.logging.level === "low" || config.logging.level === "medium" || config.logging.level === "high") {
        if (efunctions.checkChannel(config.logging.channel, bot) == true) {
          let lchannel = bot.channels.cache.get(config.logging.channel);
          bot.eventEmbed("c70011", message.author, "Bulk Delete", `**Amount:** ${amount}\n**Channel:** ${message.channel.name}`, [], `${message.guild.name}`, bot)
            .then(embed => lchannel.send(embed))
            .catch(error => console.error(error))
        }
      }
    }

  },
};