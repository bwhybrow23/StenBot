module.exports = {
    name: "eco",
    category: "eco",
    description: "Adjust a user's economy balance.",
    example: ".eco set @Steve 100",
    permission: "BOT OWNER",
    run: async (bot, message, args) => {

    const Discord = require("discord.js")
    const db = require('quick.db');

    if (!message.author.id === bot.settings.ids.botOwner) return message.reply("You do not have permission to run this command.");

    let subc = args[0];
    let user = message.mentions.members.first();
    let amount = args[2];

    if (subc === "give") {
        if (!user) return message.reply(`Please specify a user to give money to.`);
        if (!amount) return message.reply(`Please specify how much money you would like to give this person.`);

        message.reply('Successfully added ' + amount + ' to ' + user)
        db.add(`money_${user.id}`, amount)
    } else if (subc === "take") {
        if (!user) return message.reply(`Please specify a user to take money from.`);
        if (!amount) return message.reply(`Please specify how much money you would like to take from this person.`);

        message.reply(`Successfully removed ${amount} from ${user}'s account.`)
        db.subtract(`money_${user.id}`, amount);
    } else if (subc === "set") {
        if (!user) return message.reply(`Please specify a user to set money to.`);
        if (!amount) return message.reply(`Please specify how much money you would like to set this person's balance to.`);

        message.reply("This option currently doesn't work at the moment. Please use the Give or Take money command.")
    } else if (!subc) {
        message.reply(`Available Commands:\nGive, Take.`);
    }

}};
