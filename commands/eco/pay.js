module.exports = {
  name: "pay",
  category: "eco",
  description: "Give some money to another user.",
  usage: "<@USER> <VALUE>",
  example: "@Steve#6942 100",
  options: { permission: "EVERYONE", enabled: true, cooldown: 10, guildOnly: true },
  run: async (bot, message, args) => {

    const Discord = require("discord.js");
    const ecoUtils = require("../../main/functions/ecoUtils");

    let toBePaid = await ecoUtils.getUser(message.mentions.users.first().id);
    let payee = await ecoUtils.getUser(message.author.id);
    let amount;
    try {
      amount = parseInt(args[1]);
    } catch (error) {
      return bot.helpEmbed("pay", bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }

    if (!toBePaid || !amount || args[0] == "help") {
      return bot.helpEmbed("pay", bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }

    if (message.content.includes("-")) {
      // if the message includes "-" do this.
      return message.channel.send("Negative money can not be paid.");
    }

    if (payee.balance < amount) {
      return message.reply(
        `That's more money than you've got in your balance.`
      );
    }

    await ecoUtils.updateUser(payee.discordId, payee.balance - amount).then(async () => {
      await ecoUtils.updateUser(toBePaid.discordId, toBePaid.balance + amount).then(async (user) => {
        return bot.createEmbed("success", "", `${amount} has now been transferred to ${message.mentions.users.first()}'s balance. Their new balance is ${user.balance}.`, [], ``, message)
          .then((embed) => message.channel.send(embed))
          .catch((error) => bot.log.post("error", error));
      })
    })

  },
};