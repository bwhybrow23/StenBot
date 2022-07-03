const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clearuser").setDescription("Clear a certain number of messages from a specific user")
    .addUserOption(option => option.setName("user").setDescription("The user to clear messages from.").setRequired(true))
    .addIntegerOption(option => option.setName("amount").setDescription("The amount of messages to clear.").setRequired(true)),
  category: "mod",
  usage: "<@USER> <VALUE>",
  example: "@Haydn#3329 50",
  options: { permission: "STAFF", aliases: ["cuser"], enabled: true, guildOnly: true },
  run: async (bot, interaction) => {

    const config = await bot.mutils.getGuildById(interaction.guild.id);

    //Perm Check
    if (!interaction.member.permissions.has("MANAGE_MESSAGES")) {
      return bot.noPermsEmbed(`${interaction.guild.name}`, bot);
    }

    //Arg Check
    let amount = interaction.options.getInteger("amount");

    if (amount > 100 || amount < 1) {
      return bot.createEmbed("error", "", `The amount of messages to clear must be in-between 1 and 100.`, [], `${interaction.guild.name}`, interaction)
        .then((embed) => interaction.reply(embed))
        .catch((error) => bot.log.post("error", error));
    };

    let targetuser = interaction.options.getUser("user");

    //Fetch messages
    interaction.channel.messages.fetch({
      limit: amount,
    }).then((messages) => {
      //Filter them
      const filterBy = targetuser ? targetuser.id : bot.user.id;
      messages = messages.filter(m => m.author.id == filterBy).slice(0, amount);
      //Bulk delete
      interaction.channel.bulkDelete(messages).catch(error => bot.log.post("error", error.stack));
    });

    //Success message
    bot.createEmbed("success", "", `Successfully cleared **${amount}** messages from **${targetuser.user.tag}**`, [], `${interaction.guild.name}`, interaction)
          .then((embed) => interaction.reply(embed))
          .catch((error) => bot.log.post("error", error));

    //Logging
    if (config.logging.enabled === true) {
      if (config.logging.level === "low" || config.logging.level === "medium" || config.logging.level === "high") {
        if (bot.efunctions.checkChannel(config.logging.channel, bot) === true) {
          let lchannel = bot.channels.cache.get(config.logging.channel);
          bot.eventEmbed("c70011", interaction.user, "Bulk Delete", `**Amount:** ${amount}\n**Channel:** ${message.channel.name}\n**Filter:** From ${targetuser.user.tag}`, [], `${interaction.guild.name}`, bot)
            .then(embed => lchannel.send(embed))
            .catch(error => bot.log.post("error", error));
        }
      }
    }

  },
};