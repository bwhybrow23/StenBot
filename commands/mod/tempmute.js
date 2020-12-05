module.exports = {
    name: "tempmute",
    category: "mod",
    description: "Temporarily mute a user for a period of time.",
    usage: "<@USER> <TIME> [REASON]",
    example: "@Jess#8022 1d Being annoying",
    permission: "STAFF",
    run: async (bot, message, args) => {

      const Discord = require("discord.js");
      if (!message.guild) return;
      const ms = require("ms");
      const fs = require("fs");

    var config = await bot.mutils.getGuildById(message.guild.id);

    /*if (config.staff_role == false) {
      return bot.createEmbed("error","",`Error! A staff role has not been set. An owner or admin can set one using \`sb!config-staff role <@ROLE>\``,[],`${message.guild.name}`,bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }

    let staffrole = message.guild.roles.cache.find(
      (r) => r.id === config.staff_role
    );

    if (staffrole == undefined) {
      return bot.createEmbed("error","",`Error! The staff role that has been set is invalid. An owner or admin can set a new one using \`sb!config-staff role <@ROLE>\``,[],`${message.guild.name}`,bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }

    if (!message.member.roles.cache.has(config.staff_role)) {
      return bot.noPermsEmbed(`${message.guild.name}`, bot);
    }*/
    if (!message.member.permissions.has("MANAGE_MESSAGES")) {
      return bot.noPermsEmbed(`${message.guild.name}`, bot);
    }
      
    //Args Check
    var targetuser = message.mentions.members.first();
    if (!targetuser || args[0] == "help") {
      return bot.helpEmbed("tempmute", bot)
      .then((embed) => message.channel.send(embed))
      .catch((error) => bot.logger("error", error));
    }

    if (targetuser.roles.cache.has(config.staff_role)) {
        return bot.createEmbed("error","",`Error! You are not allowed to mute this person!`,[],`${message.guild.name}`,bot)
          .then((embed) => message.channel.send(embed))
          .catch((error) => bot.logger("error", error));
      }

      let reason = args.slice(2).join(" ");
      let msg = `Succesfully tempmuted **${targetuser.user.tag}** for **${reason}**`;
  
      if (reason.length < 1) {
        reason = "N/A";
        msg = `Succesfully tempmuted **${targetuser.user.tag}**`;
      }

      //Role Check
      let muteRole = message.guild.roles.cache.find(r=>r.name=="Muted")
      if(!muteRole){
        try{
            muteRole = await message.guild.roles.create({
            data: {
                name: "Muted",
                color: "#000000",
                permissions:[]
            },
            reason: "StenBot Muted Role"
          })
          message.guild.channels.cache.forEach(async (channel, id) => {
            await channel.createOverwrite(muteRole, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false
            });
          });
        }catch(e){
            message.reply("Error, check console");
            bot.logger("error", error);
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
        bot.createEmbed("success","",`${msg}`,[],`${message.guild.name}`,bot)
          .then((embed) => message.channel.send(embed))
          .catch((error) => bot.logger("error", error));
        //Logging
        const efunctions = require('../../main/functions/eventUtils.js');
        if (config.logging_enabled == true) {
              if (efunctions.checkChannel(config.logging_channel, bot) == true) {
                let lchannel = bot.channels.cache.get(config.logging_channel);
                bot.eventEmbed("c70011", targetuser.user, "Member Temporarily Muted", `**User tag:** ${targetuser.user.tag}\n**User ID:** ${targetuser.user.id}\n**Mute Date:** ${new Date()}\n**Muted By:** ${message.author.tag}\n\n**Reason:** ${reason}\n**Duration:** ${args[1]}`, [], `${message.guild.name}`, bot)
                .then(embed => lchannel.send(embed))
                .catch(error => console.error(error))
              }
          }
      });
    },
  };