module.exports = {
    name: "eco",
    category: "botowner",
    description: "Adjust a user's economy balance.",
    usage: "<ADD | SUBTRACT | SET> <@USER> <VALUE>",
    example: "set @Steve#1234 69000",
    options: { permission: "BOTOWNER", enabled: true, guildOnly: true },
    run: async (bot, message, args) => {
  
      const Discord = require("discord.js");
      const ecoUtils = require("../../main/functions/ecoUtils");
  
      if (message.author.id !== bot.settings.ids.botOwner) return;
  
      let person = message.mentions.members.first();
      if (!person) return message.reply("Please specify a user");
  
      let amount = args[2];
      if (!amount) return message.reply("Please specify an amount.");
  
      switch (args[0]) {
  
        case "add":
          await ecoUtils.getUser(person.id).then(async (user) => {
            let IntAmount = parseInt(amount);
            let value = user.balance + IntAmount;
            await ecoUtils.updateUser(person.id, value).then((user) => {
              return bot.createEmbed("info", "", `${amount} has now been added to ${person}'s balance. Their new balance is ${user.balance}.`, [], ``, message)
                .then((embed) => message.channel.send(embed))
                .catch((error) => bot.log.post("error", error));
            })
          })
          break;
  
        case "subtract":
          await ecoUtils.getUser(person.id).then(async (user) => {
            let IntAmount = parseInt(amount);
            let value = user.balance - IntAmount;
            if (value < 0) return message.reply("I cannot do this as the user will go into a negative balance.");
            await ecoUtils.updateUser(person.id, value).then((user) => {
              return bot.createEmbed("info", "", `${amount} has now been subtracted from ${person}'s balance. Their new balance is ${user.balance}.`, [], ``, message)
                .then((embed) => message.channel.send(embed))
                .catch((error) => bot.log.post("error", error));
            })
          })
          break;
  
        case "set":
          await ecoUtils.updateUser(person.id, amount).then((user) => {
            return bot.createEmbed("info", "", `${person}'s balance has now been set to ${user.balance}.`, [], ``, message)
              .then((embed) => message.channel.send(embed))
              .catch((error) => bot.log.post("error", error));
          })
          break;
  
        default:
          message.reply("Provide a subcommand. `add`, `subtract` or `set`");
          break;
      }
    }
  };