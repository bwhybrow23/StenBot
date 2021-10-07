module.exports = {
  name: "clearuser",
  category: "mod",
  description: "Clear a certain number of messages from a specific user.",
  usage: "<@USER> <VALUE>",
  example: "@Haydn#3329 50",
  options: { permission: "STAFF", aliases: ["cuser"], enabled: true, guildOnly: true },
  run: async (bot, message, args) => {

    const Discord = require("discord.js");
    const config = await bot.mutils.getGuildById(message.guild.id);

    //Perm Check
    if (!message.member.permissions.has("MANAGE_MESSAGES")) {
      return bot.noPermsEmbed(`${message.guild.name}`, bot);
    }

    //Arg Check
    let amount = args[1];
    if (!amount || isNaN(amount) || args[0] === "help") {
      return bot.helpEmbed("clearuser", bot)
        .then((embed) => message.reply(embed))
        .catch((error) => bot.log.post("error", error));
    }

    if (amount > 100 || amount < 1) {
      return bot.createEmbed("error", "", `The amount of messages to clear must be in-between 1 and 100.`, [], `${message.guild.name}`, message)
        .then((embed) => message.reply(embed))
        .catch((error) => bot.log.post("error", error));
    };

    let targetuser = message.mentions.members.first();
    if (!targetuser) {
      return bot.createEmbed("error", "", `Error! You need to include someone to clear the messages of!`, [], `${message.guild.name}`, message)
        .then((embed) => message.reply(embed))
        .catch((error) => bot.log.post("error", error));
    }

    //Fetch messages
    message.channel.messages.fetch({
      limit: amount,
    }).then((messages) => {
      //Filter them
      const filterBy = targetuser ? targetuser.id : bot.user.id;
      messages = messages.filter(m => m.author.id == filterBy).slice(0, amount);
      //Bulk delete
      message.channel.bulkDelete(messages).catch(error => bot.log.post("error", error.stack));
    });

    //Success message
    bot.createEmbed("success", "", `Successfully cleared **${amount}** messages from **${targetuser.user.tag}**`, [], `${message.guild.name}`, message)
          .then((embed) => message.reply(embed))
          .catch((error) => bot.log.post("error", error));

    //Logging
    if (config.logging.enabled === true) {
      if (config.logging.level === "low" || config.logging.level === "medium" || config.logging.level === "high") {
        if (bot.efunctions.checkChannel(config.logging.channel, bot) === true) {
          let lchannel = bot.channels.cache.get(config.logging.channel);
          bot.eventEmbed("c70011", message.author, "Bulk Delete", `**Amount:** ${amount}\n**Channel:** ${message.channel.name}\n**Filter:** From ${targetuser.user.tag}`, [], `${message.guild.name}`, bot)
            .then(embed => lchannel.send(embed))
            .catch(error => bot.log.post("error", error));
        }
      }
    }

  },
};