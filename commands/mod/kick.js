const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick").setDescription("Kick a user from the server.")
    .addUserOption(option => option.setName("user").setDescription("The user to kick.").setRequired(true))
    .addStringOption(option => option.setName("reason").setDescription("The reason for the kick.")),
  category: "mod",
  options: { permission: "STAFF", enabled: true, guildOnly: true },
  run: async (bot, interaction) => {

    const config = await bot.mutils.getGuildById(interaction.guild.id);

    //Perm check
    if (!message.member.permissions.has("KICK_MEMBERS")) {
      return bot.noPermsEmbed(`${interaction.guild.name}`, bot);
    }

    //Args Check
    var targetuser = interaction.options.getUser("user");

    //Variables
    let reason = interaction.options.getString("reason");
    let msg = `Succesfully kicked **${targetuser.user.tag}**${reason ? ` with reason ${reason}.` : `.`}`;

    //Check if user is kickable
    if (!targetuser.kickable) {
      return bot.createEmbed("error", "", `Error! I do not have permission to kick this user!`, [], `${interaction.guild.name}`, interaction)
        .then((embed) => interaction.reply(embed))
        .catch((error) => bot.log.post("error", error));
    }

    //Kick the user
    targetuser.kick(`By ${interaction.user.tag}${reason? `\nReason: ${reason}` : ``}`)
      .then(async () => {

        //Log to database
        await bot.punishments.new("kick", interaction.guild.id, targetuser.id, interaction.user.id, reason);
      
        //Send Success message
        bot.createEmbed("success", "", `${msg}`, [], `${interaction.guild.name}`, interaction)
        .then((embed) => interaction.reply(embed))
        .catch((error) => bot.log.post("error", error))

        //Send User a message
        bot.eventEmbed("c70011", targetuser.user, "You have been kicked!", `**Kick Date:** ${new Date()}\n**Kicked By:** ${interaction.user.tag}${reason ? `\n**Reason:** ${reason}` : ``}`, [], `${interaction.guild.name}`, bot)
            .then((embed) => {
                try {
                  targetuser.send(embed);
                } catch (e) {
                  return;
                }
              })
            .catch(error => bot.log.post("error", error));

      })
      .catch(error => bot.log.post("error", error));

    //Logging
    if (config.logging.enabled === true) {
      if (config.logging.level === "low" || config.logging.level === "medium" || config.logging.level === "high") {
        if (bot.efunctions.checkChannel(config.logging.channel, bot) === true) {
          let lchannel = bot.channels.cache.get(config.logging.channel);
          bot.eventEmbed("c70011", targetuser.user, "Member Kicked", `**User tag:** ${targetuser.user.tag}\n**User ID:** ${targetuser.user.id}\n**Kick Date:** ${new Date()}\n**Kicked By:** ${interaction.user.tag}\n**Reason:** ${reason}`, [], `${interaction.guild.name}`, bot)
            .then(embed => lchannel.send(embed))
            .catch(error => bot.log.post("error", error));
        }
      }
    }
  },
};