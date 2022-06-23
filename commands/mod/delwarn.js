const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("delwarn").setDescription("Clear a specific warning from a user.")
    .addUserOption(option => option.setName("user").setDescription("The user to clear the warning from.").setRequired(true))
    .addIntegerOption(option => option.setName("warning-id").setDescription("The ID of the warning to clear. (Can be gathered from /warnings)").setRequired(true)),
  category: "mod",
  options: { permission: "STAFF", enabled: true, cooldown: 0, guildOnly: true },
  run: async (bot, interaction) => {
    
    const config = await bot.mutils.getGuildById(interaction.guild.id);
    
    //Perm Check
    if (!message.member.permissions.has("MANAGE_MESSAGES")) {
      return bot.noPermsEmbed(`${interaction.guild.name}`, bot);
    };
    
    //Args Check
    var targetuser = interaction.options.getUser("user");
    
    //Fetch warnings
    let warnings;
    await bot.punishments.fetch(interaction.guild.id, targetuser.id)
    .then((punishments) => {
      warnings = punishments.warns;
    });
    
    //If no warnings
    if (Object.keys(warnings).length < 0) {
      return bot.createEmbed("error", "", "Error! This user has no warnings.", [], `${interaction.guild.name}`, interaction)
        .then((embed) => interaction.reply(embed))
        .catch((error) => bot.log.post("error", error));
    }

    //More args check
    let removedID = interaction.options.getInteger("warning-id");
    if (!warnings[removedID - 1]) {
      return bot.createEmbed("error", "", "Error! The ID you have provided doesn't exist as a warning on this user.", [], `${interaction.guild.name}`, interaction)
        .then((embed) => interaction.reply(embed))
        .catch((error) => bot.log.post("error", error));
    }

    //Remove ID from config
    await bot.punishments.removeSync("warn", removedID - 1, interaction.guild.id)
    .then(() => {

    //Post success embed to user
    bot.createEmbed("success", "", `Successfully removed warning ID ${removedID} from **${targetuser.user.tag}**. They now have ${Object.keys(warnings).length} warnings.`, [], `${interaction.guild.name}`, interaction)
    .then((embed) => interaction.reply(embed))
    .catch((error) => bot.log.post("error", error));

    //Logging
    if (config.logging.enabled === true) {
      if (bot.efunctions.checkChannel(config.logging.channel, bot) === true) {
        let lchannel = bot.channels.cache.get(config.logging.channel);
        bot.eventEmbed("c70011", targetuser.user, "Warning Removed", `**User tag:** ${targetuser.user.tag}\n**User ID:** ${targetuser.user.id}\n**Warning ID:** ${removedID}\n\n**Removed on:** ${new Date()}\n**Removed by:** ${interaction.user.tag}`, [], `${interaction.guild.name}`, bot)
          .then(embed => lchannel.send(embed))
          .catch(error => bot.log.post("error", error));
      }
    };

    })


  },
}