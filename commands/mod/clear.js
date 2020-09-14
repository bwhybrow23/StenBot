module.exports = {
  name: "clear",
  category: "mod",
  description: "Clear a certain amount of messages from chat.",
  usage: "sb!clear <VALUE>",
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

    var amount = args[0];
    if (amount == undefined) {
      return bot.createEmbed("error","",`Error! You didn't include an amount of messages to clear!`,[],`${message.guild.name}`,bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }

    if (isNaN(amount)) {
      return bot.createEmbed("error","",`Error! The amount of messages you are clearing needs to be a number!`,[],`${message.guild.name}`,bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }

    if (amount > 100) {
      return bot.createEmbed("error","",`Error! You can't clear more than 100 messages at a time!`,[],`${message.guild.name}`,bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }

    if (amount < 1) {
      return bot.createEmbed("error","",`Error! You can't clear less than 1 message you silly goose!`,[],`${message.guild.name}`,bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }

    message.channel.messages.fetch({
      limit: amount,
  }).then((messages) => {
      message.delete();
      message.channel.bulkDelete(messages).catch(error => bot.logger("error", error.stack));
  });

  message.channel.send({
      embed: {
          color: bot.settings.color.green,
          description: `Successfully cleared **${amount}** messages in **${message.channel.name}**`
      }
  });

  },
};
