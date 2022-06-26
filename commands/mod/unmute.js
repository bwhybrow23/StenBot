const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unmute").setDescription("Unmute a user.")
    .addUserOption(option => option.setName("user").setDescription("The user to unmute.").setRequired(true))
    .addStringOption(option => option.setName("reason").setDescription("The reason for unmuting the user.")),
  category: "mod",
  options: { permission: "STAFF", enabled: true, guildOnly: true},
  run: async (bot, interaction) => {

    var config = await bot.mutils.getGuildById(interaction.guild.id);

    if (!interaction.member.permissions.has("MANAGE_MESSAGES")) {
      return bot.noPermsEmbed(`${interaction.guild.name}`, bot);
    }

    //Args Check
    var targetuser = interaction.options.getUser("user");

    let reason = interaction.options.getString("reason");
    let msg = `Succesfully unmuted **${targetuser.user.tag}** for **${reason}**`;

    if (reason.length < 1) {
      reason = "N/A";
      msg = `Succesfully unmuted **${targetuser.user.tag}**`;
    }

    //Role Check
    let muteRole = interaction.guild.roles.cache.find(r => r.name === "Muted");
    if (!muteRole) {
      return bot.createEmbed("error", "", `Error! There is no valid "Muted" role which means that the role has been deleted or was never created. In order for the role to be created, a user has to be muted by StenBot.`, [], `${interaction.guild.name}`, interaction)
        .then((embed) => interaction.reply(embed))
        .catch((error) => bot.log.post("error", error));
    }

    //Unmute them
    bot.moderator.unmute(interaction.guild.members.cache.get(targetuser.id), {
      reason: reason,
      author: interaction.member,
      mutedRoleID: muteRole
    }).then((muteData) => {
      //Response
      bot.createEmbed("success", "", `${msg}`, [], `${interaction.guild.name}`, interaction)
        .then((embed) => interaction.reply(embed))
        .catch((error) => bot.log.post("error", error));
      //Logging
      if (config.logging.enabled === true) {
        if (config.logging.level === "low" || config.logging.level === "medium" || config.logging.level === "high") {
          if (bot.efunctions.checkChannel(config.logging.channel, bot) === true) {
            let lchannel = bot.channels.cache.get(config.logging.channel);
            bot.eventEmbed("7ae727", targetuser.user, "Member Unmuted", `**User tag:** ${targetuser.user.tag}\n**User ID:** ${targetuser.user.id}\n**Unmute Date:** ${new Date()}\n**Unmuted By:** ${interaction.user.tag}\n**Reason:** ${reason}`, [], `${interaction.guild.name}`, bot)
              .then(embed => lchannel.send(embed))
              .catch(error => bot.log.post("error", error));
          }
        }
      }
    });
  },
};