module.exports = {
    name: "rob",
    category: "eco",
    description: "Attempt to rob a user of some of their money.",
    usage: "<@USER>",
    example: "@Melissa#1391",
    permission: "EVERYONE",
    enabled: false,
    run: async (bot, message, args) => {
  
      const Discord = require("discord.js");
      const ecoUtils = require("../../main/functions/ecoUtils");
  
      const robber = message.author;
      const victim = message.mentions.users.first();
      if (!victim) {
        return bot.createEmbed("error", "", `You forgot to mention a user.`, [], ``, bot)
          .then((embed) => message.channel.send(embed))
          .catch((error) => bot.log.post("error", error));
      }
  
      // Check if still on cooldown
      let check = await bot.timeouts.check(robber.id, "rob")
      if (check != false) {
        return bot.createEmbed("error", "", `Woah! Calm down there, you're gonna get ahead of yourself. You've still got another **${check}** left until you can rob someone. Be patient.`, [], ``, bot)
          .then((embed) => message.channel.send(embed))
          .catch((error) => bot.log.post("error", error));
      }
  
      //Check balance of victim
      let victimUser = await ecoUtils.getUser(victim.id);
      if (victimUser.balance < 0) {
        return bot.createEmbed("error", "", `This user doesn't have enough money in their balance to be robbed. Try another user.`, [], ``, bot)
          .then((embed) => message.channel.send(embed))
          .catch((error) => bot.log.post("error", error));
      }
  
      // Function to test chance
      function testChance(successPercentage) {
        let random = Math.random() * 100;
        return ((random -= successPercentage) < 0);
      }
  
      // Calculate random number
      function randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
  
      let victimBal = await ecoUtils.getUser(victim.id).balance;
      if (!victimBal) {
        await ecoUtils.createUser(victim.id, 500);
      }
      let robberBal = await ecoUtils.getUser(robber.id).balance;
      if (!robberBal) {
        await ecoUtils.createUser(robber.id, 500);
      }
  
      //Test chance and do stuff
      if (testChance(50)) {
        let amountRobbed = randomInteger(1, victimBal);
        await ecoUtils.updateUser(victim.id, parseInt(victimBal - amountRobbed));
        await ecoUtils.updateUser(robber.id, parseInt(robberBal + amountRobbed));
        let rNewBalance = await ecoUtils.getUser(robber.id);
        return bot.createEmbed("success", "", `${message.author}, you robbed ${victim} of **${amountRobbed} credits**. Your balance is now **${rNewBalance}**.`, [], ``, bot)
          .then((embed) => message.channel.send(embed))
          .catch((error) => bot.log.post("error", error));
      } else {
        await ecoUtils.updateUser(victim.id, parseInt(victimBal + 500));
        await ecoUtils.updateUser(robber.id, parseInt(robberBal - 500));
        let rNewBalance = await ecoUtils.getUser(robber.id);
        return bot.createEmbed("error", "", `${message.author}, you got caught and you had to pay ${victim} **500 credits**. Your balance is now **${rNewBalance}**.`, [], ``, bot)
          .then((embed) => message.channel.send(embed))
          .catch((error) => bot.log.post("error", error));
      }
  
  
    }
  }