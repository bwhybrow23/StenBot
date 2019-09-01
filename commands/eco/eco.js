exports.run = (bot, message, args) => {

    const Discord = require("discord.js")
    const eco = require("stenbot-economy");

    if (!message.author.id === bot.settings.ids.botOwner) return message.reply("You do not have permission to run this command.");

    let subc = args[0];
    let user = message.mentions.members.first();
    let amount = args[2];

    if (subc === "give") {
        eco.AddToBalance(user.id, amount);
        message.reply(`**${amount}** coins has been added to ${user}'s account.`);
    } else if (subc === "take") {
        eco.SubstractFromBalance(user.id, amount);
        message.reply(`**${amount} coins have been taken away from ${user}'s account`);
    } else if (subc === "set") {
        eco.SetBalance(user.id, amount);
        message.reply(`${user}'s balance has been set to **${amount}** coins`);
    } else if (!subc) {
        message.reply(`Available Commands:\nGive, Take, Set.`);
    }

}