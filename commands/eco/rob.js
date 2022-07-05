const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rob").setDescription("Attempt to rob a user of some money.")
    .addUserOption(option => option.setName("user").setDescription("The user to rob.").setRequired(true)),
  category: "eco",
  usage: "<@USER>",
  example: "@Jessica#1391",
  options: { permission: "EVERYONE", enabled: false, guildOnly: true },
  run: async (bot, interaction) => {

    const ecoUtils = require("../../Main/Functions/ecoUtils");

    const robber = interaction.user;
    const victim = interaction.options.getUser("user");

    // Check if still on cooldown
    let check = await bot.timeouts.check(robber.id, "rob");
    if (check != false) {
      return bot.createEmbed("error", "", `Woah! Calm down there, you're gonna get ahead of yourself. You've still got another **${check}** left until you can rob someone. Be patient.`, [], ``, interaction)
        .then((embed) => interaction.reply({ embeds: embed }))
        .catch((error) => bot.log.post("error", error));
    }

    //Check balance of victim
    let victimUser = await ecoUtils.getUser(victim.id);
    let victimBal = victimUser.balance;
    if (victimUser.balance < 0) {
      return bot.createEmbed("error", "", `This user doesn't have enough money in their balance to be robbed. Try another user.`, [], ``, interaction, true)
        .then((embed) => interaction.reply({ embeds: embed }))
        .catch((error) => bot.log.post("error", error));
    }
    if (!victimUser) {
      let userCreate = await ecoUtils.createUser(victim.id, 500);
      victimBal = userCreate.balance;
    }

    //Robber
    let robberUser = await ecoUtils.getUser(robber.id);
    let robberBal = robberUser.balance;
    if (!robberUser) {
      let userCreate = await ecoUtils.createUser(robber.id, 500);
      robberBal = userCreate.balance;
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

    //Test chance and do stuff
    if (testChance(50)) {
      let amountRobbed = randomInteger(1, victimBal);
      await ecoUtils.updateUser(victim.id, parseInt(victimBal - amountRobbed));
      await ecoUtils.updateUser(robber.id, parseInt(robberBal + amountRobbed));
      let rNewBalance = await ecoUtils.getUser(robber.id);
      await bot.timeouts.new(robber.id, "rob");
      return bot.createEmbed("success", "", `${interaction.user}, you robbed ${victim} of **${amountRobbed} credits**. Your balance is now **${rNewBalance.balance}**.`, [], ``, interaction)
        .then((embed) => interaction.reply({ embeds: embed }))
        .catch((error) => bot.log.post("error", error));
    } else {
      await ecoUtils.updateUser(victim.id, parseInt(victimBal + 500));
      await ecoUtils.updateUser(robber.id, parseInt(robberBal - 500));
      let rNewBalance = await ecoUtils.getUser(robber.id);
      await bot.timeouts.new(robber.id, "rob");
      return bot.createEmbed("error", "", `${interaction.user}, you got caught and you had to pay ${victim} **500 credits**. Your balance is now **${rNewBalance.balance}**.`, [], ``, interaction)
        .then((embed) => interaction.reply({ embeds: embed }))
        .catch((error) => bot.log.post("error", error));
    }


  }
}