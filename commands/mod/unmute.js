module.exports = {
    name: "unmute",
    category: "mod",
    description: "Unute a user that has previously been muted by StenBot.",
    usage: "sb!unmute <@USER> <REASON>",
    permission: "STAFF",
    run: async (bot, message, args) => {
      const Discord = require("discord.js");

      //Permission Check
      const fs = require("fs");

    var config = JSON.parse(
      fs.readFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`,"utf8")
    );

    if (config.staffrole == false) {
      return bot.createEmbed("error","",`Error! A staff role has not been set. An owner or admin can set one using \`sb!config-staff role <@ROLE>\``,[],`${message.guild.name}`,bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => console.error(error));
    }

    let staffrole = message.guild.roles.cache.find(
      (r) => r.id === config.staffrole
    );

    if (staffrole == undefined) {
      return bot.createEmbed("error","",`Error! The staff role that has been set is invalid. An owner or admin can set a new one using \`sb!config-staff role <@ROLE>\``,[],`${message.guild.name}`,bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => console.error(error));
    }

    if (!message.member.roles.cache.has(config.staffrole)) {
      return bot.noPermsEmbed(`${message.guild.name}`, bot);
    }
      
    //Args Check
    var targetuser = message.mentions.members.first();

    if (targetuser == undefined) {
      return bot.createEmbed("error","",`Error! You forgot to mention a user!`,[],`${message.guild.name}`,bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => console.error(error));
    }

    if (targetuser.roles.cache.has(config.staffrole)) {
        return bot.createEmbed("error","",`Error! You are not allowed to mute this person!`,[],`${message.guild.name}`,bot)
          .then((embed) => message.channel.send(embed))
          .catch((error) => console.error(error));
      }

    var reason = args.slice(1).join(" ");

    if (reason.length < 1) {
      return bot.createEmbed("error","",`Error! You forgot to include a reason!`,[],`${message.guild.name}`,bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => console.error(error));
    }

      //Role Check
      let muteRole = message.guild.roles.cache.find(r=>r.name=="muted")
      if (!muteRole) {
        return bot.createEmbed("error","",`Error! There is no valid "Muted" role which means that the role has been deleted or was never created. In order for the role to be created, a user has to be muted by StenBot.`,[],`${message.guild.name}`,bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => console.error(error));
      }

      //Unmute them
      bot.moderator.unmute(message.guild.members.cache.get(targetuser.id), {
          reason: reason,
          author: message.member,
          mutedRoleID: muteRole
      }).then((muteData) => {
        //Response
        bot.createEmbed("success","",`Succesfully unmuted **${targetuser.user.tag}** for **${reason}**`,[],`${message.guild.name}`,bot)
          .then((embed) => message.channel.send(embed))
          .catch((error) => console.error(error));
        //Logging
        const efunctions = require('../../main/functions/eventfunctions.js');
        if (config.loggingenabled == true) {
              if (efunctions.checkChannel(config.loggingchannel, bot) == true) {
                let lchannel = bot.channels.cache.get(config.loggingchannel);
                lchannel.send({
                  embed: {
                    color: bot.settings.color.yellow,
                    description: `**Member Unmuted**\n**User tag:** ${targetuser.user.tag}\n**User ID:** ${targetuser.id}\n**Unmute Date:** ${new Date()}\n**Reason:** ${reason}`,
                    footer: { icon_url: targetuser.avatarURL, text: "Member Unmuted" },
                    timestamp: new Date(),
                  },
                });
              }
          }
      });
    },
  };