const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear").setDescription("Clear a certain amount of messages from chat.")
    .addIntegerOption(option => option.setName("amount").setDescription("The amount of messages to clear.").setRequired(true)),
  category: "mod",
  usage: "<VALUE>",
  example: "69",
  options: { permission: "STAFF", enabled: true, guildOnly: true },
  run: async (bot, interaction) => {

    const config = await bot.mutils.getGuildById(interaction.guild.id);

    //Perm Check
    if (!interaction.member.permissions.has("MANAGE_MESSAGES")) {
      return bot.noPermsEmbed(`${interaction.guild.name}`, bot);
    }

    //Args check
    let amount = interaction.options.getInteger("amount");

    if (amount > 100 || amount < 1) {
      return bot.createEmbed("error", "", `The amount of messages to clear must be in-between 1 and 100.`, [], `${interaction.guild.name}`, interaction)
        .then((embed) => interaction.reply({ embeds: embed }))
        .catch((error) => bot.log.post("error", error));
    }

    //Fetch the messages
    interaction.channel.messages.fetch({
      limit: amount,
    }).then((messages) => {
      //Bulk delete them
      interaction.channel.bulkDelete(messages).catch(error => bot.log.post("error", error.stack));
    });

    //Send success message
    bot.createEmbed("success", "", `Successfully cleared **${amount}** messages.`, [], `${interaction.guild.name}`, interaction)
          .then((embed) => interaction.reply({ embeds: embed }))
          .catch((error) => bot.log.post("error", error));

    //Logging
    if (config.logging.enabled === true) {
      if (config.logging.level === "low" || config.logging.level === "medium" || config.logging.level === "high") {
        if (bot.efunctions.checkChannel(config.logging.channel, bot) === true) {
          let lchannel = bot.channels.cache.get(config.logging.channel);
          bot.eventEmbed("c70011", interaction.user, "Bulk Delete", `**Amount:** ${amount}\n**Channel:** ${interaction.channel.name}`, [], `${interaction.guild.name}`, bot)
            .then(embed => lchannel.send(embed))
            .catch(error => bot.log.post("error", error));
        }
      }
    }

  },
};