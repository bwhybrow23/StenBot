module.exports = {
  name: "mute",
  category: "mod",
  description: "Mute a user to block them from sending messages.",
  usage: "<@USER> [REASON]",
  example: "@Lucy#5012 Spamming",
  options: { permission: "STAFF", enabled: true, guildOnly: true },
  run: async (bot, message, args) => {

    const Discord = require("discord.js");

    var config = await bot.mutils.getGuildById(message.guild.id);

    if (!message.member.permissions.has("MANAGE_MESSAGES")) {
      return bot.noPermsEmbed(`${message.guild.name}`, bot);
    }

    //Args Check
    var targetuser = message.mentions.members.first();
    if (!targetuser || args[0] == "help") {
      return bot.helpEmbed("mute", bot)
        .then((embed) => message.reply(embed))
        .catch((error) => bot.log.post("error", error));
    }

    if (targetuser.roles.cache.has(config.moderation.staff_role)) {
      return bot.createEmbed("error", "", `Error! You are not allowed to mute this person!`, [], `${message.guild.name}`, message)
        .then((embed) => message.reply(embed))
        .catch((error) => bot.log.post("error", error));
    }

    let reason = args.slice(1).join(" ");
    let msg = `Succesfully muted **${targetuser.user.tag}** for **${reason}**`;

    if (reason.length < 1) {
      reason = "N/A";
      msg = `Succesfully muted **${targetuser.user.tag}**`;
    }

    //Role Check
    let muteRole = message.guild.roles.cache.find(r => r.name == "Muted")
    if (!muteRole) {
      try {
        muteRole = await message.guild.roles.create({
          name: "Muted",
          color: "#000000",
          permissions: [],
          reason: "StenBot Muted Role"
        })
        message.guild.channels.cache.forEach(async (channel, id) => {
          await channel.permissionOverwrites.create(muteRole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          });
        });
      } catch (e) {
        message.reply("Error, check console");
        bot.log.post("error", error);
      }
    }

    //Mute them
    bot.moderator.mute(message.guild.members.cache.get(targetuser.id), {
      reason: reason,
      author: message.member,
      mutedRoleID: muteRole
    }).then((muteData) => {
      //Response
      bot.createEmbed("success", "", `${msg}`, [], `${message.guild.name}`, message)
        .then((embed) => message.reply(embed))
        .catch((error) => bot.log.post("error", error));
      //DM User
      bot.eventEmbed("c70011", targetuser.user, "You have been muted!", `**Mute Date:** ${new Date()}\n**Muted By:** ${message.author.tag}\n\n**Reason:** ${reason}`, [], `${message.guild.name}`, bot)
            .then(embed => targetuser.send(embed))
            .catch(error => console.error(error))
      //Logging
      const efunctions = require('../../main/functions/eventUtils.js');
      if (config.logging.enabled == true) {
        if (efunctions.checkChannel(config.logging.channel, bot) == true) {
          let lchannel = bot.channels.cache.get(config.logging.channel);
          bot.eventEmbed("c70011", targetuser.user, "Member Muted", `**User tag:** ${targetuser.user.tag}\n**User ID:** ${targetuser.user.id}\n**Mute Date:** ${new Date()}\n**Muted By:** ${message.author.tag}\n\n**Reason:** ${reason}`, [], `${message.guild.name}`, bot)
            .then(embed => lchannel.send(embed))
            .catch(error => console.error(error))
        }
      }
    });
  },
};