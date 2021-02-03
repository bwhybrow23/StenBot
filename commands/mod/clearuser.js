module.exports = {
  name: "clearuser",
  category: "mod",
  description: "Clear a certain number of messages from a specific user.",
  usage: "<@USER> <VALUE>",
  example: "@Haydn#3329 50",
  options: { permission: "STAFF", aliases: ["cuser"], enabled: true, guildOnly: true },
  run: async (bot, message, args) => {

    const Discord = require("discord.js");

    var config = await bot.mutils.getGuildById(message.guild.id);

    if (!message.member.permissions.has("MANAGE_MESSAGES")) {
      return bot.noPermsEmbed(`${message.guild.name}`, bot);
    }

    var amount = args[1];
    if (!amount || amount == undefined || isNaN(amount) || args[0] == "help") {
      return bot.helpEmbed("clearuser", bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }

    if (amount > 100) {
      return message.channel.send({
        embed: {
          color: bot.settings.color.red,
          description: `Error! You cant clear more than 100 messsages at a time!`
        }
      });
    };

    if (amount < 1) {
      return message.channel.send({
        embed: {
          color: bot.settings.color.red,
          description: `Error! You cant clear less than 1 message!`
        }
      });
    };

    var targetuser = message.mentions.members.first();

    if (targetuser == undefined) {
      return bot.createEmbed("error", "", `Error! You need to include someone to clear the messages of!`, [], `${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }

    message.channel.messages.fetch({
      limit: amount,
    }).then((messages) => {
      const filterBy = targetuser ? targetuser.id : bot.user.id;
      messages = messages.filter(m => m.author.id == filterBy).array().slice(0, amount);
      message.channel.bulkDelete(messages).catch(error => bot.log.post("error", error.stack));
    });

    message.channel.send({
      embed: {
        color: bot.settings.color.green,
        description: `Successfully cleared **${amount}** messages from **${targetuser.user.tag}**`
      }
    });

    //Logging
    const efunctions = require('../../main/functions/eventUtils.js');
    if (config.logging.enabled == true) {
      if (config.logging.level == "low" || config.logging.level == "medium" || config.logging.level == "high") {
        if (efunctions.checkChannel(config.logging.channel, bot) == true) {
          let lchannel = bot.channels.cache.get(config.logging.channel);
          bot.eventEmbed("c70011", message.author, "Bulk Delete", `**Amount:** ${amount}\n**Channel:** ${message.channel.name}\n**Filter:** From ${targetuser.user.tag}`, [], `${message.guild.name}`, bot)
            .then(embed => lchannel.send(embed))
            .catch(error => console.error(error))
        }
      }
    }

  },
};