module.exports = {
  name: "tempmute",
  category: "mod",
  description: "Temporarily mute a user for a period of time.",
  usage: "<@USER> <TIME> [REASON]",
  example: "@Jess#8022 1d Being annoying",
  options: { permission: "STAFF", aliases: ["tmute"], enabled: true, guildOnly: true },
  run: async (bot, message, args) => {

    const Discord = require("discord.js");
    const ms = require("ms");

    var config = await bot.mutils.getGuildById(message.guild.id);

    if (!message.member.permissions.has("MANAGE_MESSAGES")) {
      return bot.noPermsEmbed(`${message.guild.name}`, bot);
    }

    //Args Check
    var targetuser = message.mentions.members.first();
    if (!targetuser || args[0] == "help") {
      return bot.helpEmbed("tempmute", bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }

    if (targetuser.roles.cache.has(config.moderation.staff_role)) {
      return bot.createEmbed("error", "", `Error! You are not allowed to mute this person!`, [], `${message.guild.name}`, message)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }

    let reason = args.slice(2).join(" ");
    let msg = `Succesfully tempmuted **${targetuser.user.tag}** for **${args[1]}** for **${reason}**`;

    if (reason.length < 1) {
      reason = "N/A";
      msg = `Succesfully tempmuted **${targetuser.user.tag}** for **${args[1]}**`;
    }

    //Role Check
    let muteRole = message.guild.roles.cache.find(r => r.name == "Muted")
    if (!muteRole) {
      try {
        muteRole = await message.guild.roles.create({
          data: {
            name: "Muted",
            color: "#000000",
            permissions: []
          },
          reason: "StenBot Muted Role"
        })
        message.guild.channels.cache.forEach(async (channel, id) => {
          await channel.createOverwrite(muteRole, {
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
      time: ms(args[1]),
      reason: reason,
      author: message.member,
      mutedRoleID: muteRole
    }).then((muteData) => {
      //Response
      bot.createEmbed("success", "", `${msg}`, [], `${message.guild.name}`, message)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
      //DM User
      bot.eventEmbed("c70011", targetuser.user, "You have been temporarily muted!", `**Mute Date:** ${new Date()}\n**Muted By:** ${message.author.tag}\n\n**Reason:** ${reason}\n**Duration:** ${args[1]}`, [], `${message.guild.name}`, bot)
            .then(embed => targetuser.send(embed))
            .catch(error => console.error(error))
      //Logging
      const efunctions = require('../../main/functions/eventUtils.js');
      if (config.logging.enabled == true) {
        if (efunctions.checkChannel(config.logging.channel, bot) == true) {
          let lchannel = bot.channels.cache.get(config.logging.channel);
          bot.eventEmbed("c70011", targetuser.user, "Member Temporarily Muted", `**User tag:** ${targetuser.user.tag}\n**User ID:** ${targetuser.user.id}\n**Mute Date:** ${new Date()}\n**Muted By:** ${message.author.tag}\n\n**Reason:** ${reason}\n**Duration:** ${args[1]}`, [], `${message.guild.name}`, bot)
            .then(embed => lchannel.send(embed))
            .catch(error => console.error(error))
        }
      }
    });
  },
};