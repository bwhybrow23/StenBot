module.exports = {
  name: "clearuser",
  category: "mod",
  description: "Clear all messages from a specific user.",
  usage: "sb!clearuser <@USER> <VALUE>",
  permission: "STAFF",
  run: async (bot, message, args) => {
    const Discord = require("discord.js");
    if (!message.guild) return;
    const fs = require("fs");

    var config = JSON.parse(fs.readFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`,"utf8"));

    if (config.staffrole == false) {
      return bot.createEmbed("error","",`Error! A staff role has not been set. An owner or admin can set one using \`sb!config-staff role <@ROLE>\``,[],`${message.guild.name}`,bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }

    let staffrole = message.guild.roles.cache.find(
      (r) => r.id === config.staffrole
    );

    if (staffrole == undefined) {
      return bot.createEmbed("error","",`Error! The staff role that has been set is invalid. An owner or admin can set a new one using \`sb!config-staff role <@ROLE>\``,[],`${message.guild.name}`,bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }

    if (!message.member.roles.cache.has(config.staffrole)) {
      return bot.noPermsEmbed(`${message.guild.name}`, bot);
    }

    var amount = args[1];
    if (amount == undefined) {
        return message.channel.send({
            embed: {
                color: bot.settings.color.red,
                description: `Error! You didn't include an amount of messages to clear!`
            }
        });
    };

    if (isNaN(amount)) {
        return message.channel.send({
            embed: {
                color: bot.settings.color.red,
                description: `Error! The amount of messages you are clearing needs to be a number!`
            }
        });
    };


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

  },
};
