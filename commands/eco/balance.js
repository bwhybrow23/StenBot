const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("balance").setDescription("Check yours or another user's balance.")
    .addUserOption(option => option.setName("user").setDescription("The user to check the balance of.")),
  category: "eco",
  usage: "[@USER]",
  example: "@Steve#1234",
  options: { permission: "EVERYONE", aliases: ["bal", "money"], enabled: true, cooldown: 5, guildOnly: false },
  run: async (bot, interaction) => {

    const ecoUtils = require("../../main/functions/ecoUtils");

    let person = interaction.options.getUser("user") || interaction.user;

    await ecoUtils.getUser(person.id).then(async (user) => {
      console.log(user)
      return bot.createEmbed("info", "", `${person} has **${user.balance}** credits.`, [], ``, interaction)
        .then((embed) => interaction.reply(embed))
        .catch((error) => bot.log.post("error", error));
    })

  }
};