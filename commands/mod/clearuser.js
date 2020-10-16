module.exports = {
  name: "clearuser",
  category: "mod",
  description: "Clear all messages from a specific user.",
  usage: "<@USER> <VALUE>",
  example: "@Hayden#5150 50",
  permission: "STAFF",
  run: async (bot, message, args) => {
    const Discord = require("discord.js");
    if (!message.guild) return;
    const fs = require("fs");

    var config = await bot.mutils.getGuildById(message.guild.id);

    if (config.staff_role == false) {
      return bot.createEmbed("error","",`Error! A staff role has not been set. An owner or admin can set one using \`sb!config-staff role <@ROLE>\``,[],`${message.guild.name}`,bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }

    let staffrole = message.guild.roles.cache.find(
      (r) => r.id === config.staff_role
    );

    if (staffrole == undefined) {
      return bot.createEmbed("error","",`Error! The staff role that has been set is invalid. An owner or admin can set a new one using \`sb!config-staff role <@ROLE>\``,[],`${message.guild.name}`,bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }

    if (!message.member.roles.cache.has(config.staff_role)) {
      return bot.noPermsEmbed(`${message.guild.name}`, bot);
    }

    var amount = args[1];
    if (!amount || amount == undefined || isNaN(amount) || args[0] == "help") {
      return bot.helpEmbed("clear", bot)
      .then((embed) => message.channel.send(embed))
      .catch((error) => bot.logger("error", error));
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
      return bot.createEmbed("error","",`Error! You need to include someone to clear the messages of!`,[],`${message.guild.name}`,bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }

    message.channel.messages.fetch({
      limit: amount,
  }).then((messages) => {
      const filterBy = targetuser ? targetuser.id : bot.user.id;
      messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
      message.channel.bulkDelete(messages).catch(error => bot.logger("error", error.stack));
  });

  message.channel.send({
      embed: {
          color: bot.settings.color.green,
          description: `Successfully cleared **${amount}** messages from **${targetuser.user.tag}**`
      }
  });

          //Logging
          const efunctions = require('../../main/functions/eventUtils.js');
      if (config.logging_enabled == true) {
        if (config.logging_level == "low" || config.logging_level == "medium" || config.logging_level == "high") {
          if (efunctions.checkChannel(config.logging_channel, bot) == true) {
            let lchannel = bot.channels.cache.get(config.logging_channel);
            bot.eventEmbed("c70011", message.author, "Bulk Delete", `**Amount:** ${amount}\n**Channel:** ${message.channel.name}\n**Filter:** From ${targetuser.user.tag}`, [], `${message.guild.name}`, bot)
                  .then(embed => lchannel.send(embed))
                  .catch(error => console.error(error))
          }
        }
      }

  },
};
