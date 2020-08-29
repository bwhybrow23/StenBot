module.exports = {
    name: "tempmute",
    category: "mod",
    description: "Temporarily mute a user for a period of time.",
    usage: "sb!tempmute <@USER> <TIME> <REASON>",
    permission: "STAFF",
    run: async (bot, message, args) => {

      const Discord = require("discord.js");
      if (!message.guild) return;
      const ms = require("ms");

      //Permission Check
      const fs = require("fs");

    var config = JSON.parse(
      fs.readFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`,"utf8")
    );

    if (config.staffrole == false) {
      return bot.createEmbed("error","",`Error! A staff role has not been set. An owner or admin can set one using \`sb!config-staff role <@ROLE>\``,[],`${message.guild.name}`,bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }

    let staffrole = message.guild.roles.cache.find(
      (r) => r.id === config.staffrole
    );

    if (staffrole == undefined) {
      return bot.createEmbed("error","",`Error! The staff role that has been set is invalid. An owner or admin can set a new one using \`sb!config-staff role <@ROLE>\``,[],`${message.guild.name}`,bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }

    if (!message.member.roles.cache.has(config.staffrole)) {
      return bot.noPermsEmbed(`${message.guild.name}`, bot);
    }
      
    //Args Check
    var targetuser = message.mentions.members.first();

    if (targetuser == undefined) {
      return bot.createEmbed("error","",`Error! You forgot to mention a user!`,[],`${message.guild.name}`,bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }

    if (targetuser.roles.cache.has(config.staffrole)) {
        return bot.createEmbed("error","",`Error! You are not allowed to mute this person!`,[],`${message.guild.name}`,bot)
          .then((embed) => message.channel.send(embed))
          .catch((error) => bot.logger("error", error));
      }

    var reason = args.slice(2).join(" ");

    if (reason.length < 1) {
      return bot.createEmbed("error","",`Error! You forgot to include a reason!`,[],`${message.guild.name}`,bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
    }

      //Role Check
      let muteRole = message.guild.roles.cache.find(r=>r.name=="muted")
      if(!muteRole){
        try{
            muteRole = await message.guild.roles.create({
            data: {
                name: "muted",
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
        bot.createEmbed("success","",`Succesfully tempmuted **${targetuser.user.tag}** for **${args[1]}** for **${reason}**`,[],`${message.guild.name}`,bot)
          .then((embed) => message.channel.send(embed))
          .catch((error) => bot.logger("error", error));
        //Logging
        const efunctions = require('../../main/functions/eventUtils.js');
        if (config.loggingenabled == true) {
              if (efunctions.checkChannel(config.loggingchannel, bot) == true) {
                let lchannel = bot.channels.cache.get(config.loggingchannel);
                lchannel.send({
                  embed: {
                    color: bot.settings.color.yellow,
                    description: `**Member Tempmuted**\n**User tag:** ${targetuser.user.tag}\n**User ID:** ${targetuser.id}\n**Mute Date:** ${new Date()}\n**Reason:** ${reason}\n**Duration:** ${args[1]}`,
                    footer: { icon_url: targetuser.avatarURL, text: "Member Tempmuted" },
                    timestamp: new Date(),
                  },
                });
              }
          }
      });
    },
  };