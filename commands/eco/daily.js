module.exports = {
    name: "daily",
    category: "eco",
    description: "Claim your daily reward every 24 hours.",
    usage: "",
    example: "",
    permission: "EVERYONE",
    run: async (bot, message, args) => {

        const Discord = require("discord.js");
        const ecoUtils = require("../../main/functions/ecoUtils");

        const person = message.author;

        // Calculate random number
        function randomInteger(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        // Check if there is an ongoing daily
        let check = await bot.timeouts.check(person.id, "daily")
        if (check != false) {
            return bot.createEmbed("error", "", `You've already redeemed your daily money for today. \nCome back **${check}** and you'll be able to redeem it again.`, [], ``, bot)
                .then((embed) => message.channel.send(embed))
                .catch((error) => bot.logger("error", error));
        }

        //Add daily money to user's balance
        await ecoUtils.getUser(person.id).then(async (user) => {
            let reward = randomInteger(100, 1000)
            let newBal = user.balance + reward;
            ecoUtils.updateUser(person.id, newBal).then(async () => {
                // Create a new daily for the user
                await bot.timeouts.new(person.id, "daily");
                return bot.createEmbed("success", "", `You have claimed your daily reward of **reward}**. Come back in 24 hours to claim it again!`, [], ``, bot)
                    .then((embed) => message.channel.send(embed))
                    .catch((error) => bot.logger("error", error));
            })
        })


    }
}