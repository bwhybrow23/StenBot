module.exports = {
  name: "eco",
  category: "eco",
  description: "Adjust a user's economy balance.",
  usage: "<GIVE | SET | TAKE> <@USER> <VALUE>",
  example: "set @Steve#1234 69000",
  permission: "BOT OWNER",
  run: async (bot, message, args) => {

    const Discord = require("discord.js");
    if (!message.guild) return;
    const db = require("quick.db");

    if (message.author.id !== bot.settings.ids.botOwner)
      return;

    let subc = args[0];
    let user = message.mentions.members.first();
    let amount = args[2];

    if (subc === "give") {
      if (!user)
        return message.reply(`Please specify a user to give money to.`);
      if (!amount)
        return message.reply(
          `Please specify how much money you would like to give this person.`
        );

      message.reply("Successfully added " + amount + " to " + user);
      db.add(`money_${user.id}`, amount);
    } else if (subc === "take") {
      if (!user)
        return message.reply(`Please specify a user to take money from.`);
      if (!amount)
        return message.reply(
          `Please specify how much money you would like to take from this person.`
        );

      message.reply(`Successfully removed ${amount} from ${user}'s account.`);
      db.subtract(`money_${user.id}`, amount);
    } else if (subc === "set") {
      if (!user) return message.reply(`Please specify a user to set money to.`);
      if (!amount)
        return message.reply(
          `Please specify how much money you would like to set this person's balance to.`
        );

      message.reply(
        "This option currently doesn't work at the moment. Please use the Give or Take money command."
      );
    } else if (!subc || subc == "help") {
        return bot.helpEmbed("eco", bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }
  },
};
