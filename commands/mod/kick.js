module.exports = {
  name: "kick",
  category: "mod",
  description: "Kick a user from the server.",
  usage: "<@USER> [REASON]",
  example: "@Dan#9124 Rude Name",
  options: { permission: "STAFF", enabled: true, guildOnly: true },
  run: async (bot, message, args) => {

    const Discord = require("discord.js");
    const config = await bot.mutils.getGuildById(message.guild.id);

    //Perm check
    if (!message.member.permissions.has("KICK_MEMBERS")) {
      return bot.noPermsEmbed(`${message.guild.name}`, bot);
    }

    //Args Check
    var targetuser = message.mentions.members.first();
    if (!targetuser || args[0] === "help") {
      return bot.helpEmbed("kick", bot)
        .then((embed) => message.reply(embed))
        .catch((error) => bot.log.post("error", error));
    }

    //Variables
    let reason = args.slice(1).join(" ");
    let msg = `Succesfully kicked **${targetuser.user.tag}**${reason ? ` with reason ${reason}.` : `.`}`;

    //Check if user is kickable
    if (!targetuser.kickable) {
      return bot.createEmbed("error", "", `Error! I do not have permission to kick this user!`, [], `${message.guild.name}`, message)
        .then((embed) => message.reply(embed))
        .catch((error) => bot.log.post("error", error));
    }

    //Kick the user
    targetuser.kick(`By ${message.author.tag}${reason? `\nReason: ${reason}` : ``}`)
      .then(async () => {

        //Log to database
        await bot.punishments.new("kick", message.guild.id, targetuser.id, message.author.id, reason);
      
        //Send Success message
        bot.createEmbed("success", "", `${msg}`, [], `${message.guild.name}`, message)
        .then((embed) => message.reply(embed))
        .catch((error) => bot.log.post("error", error))

        //Send User a message
        bot.eventEmbed("c70011", targetuser.user, "You have been kicked!", `**Kick Date:** ${new Date()}\n**Kicked By:** ${message.author.tag}${reason ? `\n**Reason:** ${reason}` : ``}`, [], `${message.guild.name}`, bot)
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
          bot.eventEmbed("c70011", targetuser.user, "Member Kicked", `**User tag:** ${targetuser.user.tag}\n**User ID:** ${targetuser.user.id}\n**Kick Date:** ${new Date()}\n**Kicked By:** ${message.author.tag}\n**Reason:** ${reason}`, [], `${message.guild.name}`, bot)
            .then(embed => lchannel.send(embed))
            .catch(error => bot.log.post("error", error));
        }
      }
    }
  },
};