module.exports = async (bot, oldMember, newMember) => {

    const Discord = require("discord.js");
    const efunctions = require("../functions/eventUtils.js");
  
    if (newMember.user == bot.user) return;
  
    let config = await bot.mutils.getGuildById(newMember.guild.id);
  
    if (config.logging.enabled == true) {
      if (config.logging.level == "high") {
        if (efunctions.checkChannel(config.logging.channel, bot) == true) {
  
          let lchannel = bot.channels.cache.get(config.logging.channel);
  
          //Role Added
          if (oldMember.roles.cache.size < newMember.roles.cache.size) {
            // let diffarr = efunctions.compare(oldMember.roles, newMember.roles);
            // let newrole = diffarr[0];
            //This if statement only works when the old member roles are less than new member roles which means a role got added
            for (const role of newMember.roles.cache.map((x) => x.id)) {
              if (!oldMember.roles.cache.has(role)) {
                if (newMember.guild.roles.cache.get(role).name == "muted") return;
                bot.eventEmbed("006187", newMember.user, "Role Added to User", `**Role:** ${newMember.guild.roles.cache.get(role)}\n**Name:** \`${newMember.guild.roles.cache.get(role).name}\`\n**ID:** ${newMember.guild.roles.cache.get(role).id}`, [], `${lchannel.guild.name}`, bot)
                  .then(embed => lchannel.send(embed))
                  .catch(error => console.error(error))
              }
            }
          };
  
          //Role Removed
          if (oldMember.roles.cache.size > newMember.roles.cache.size) {
            // let diffarr = efunctions.compare(oldMember.roles, newMember.roles);
            // let newrole = diffarr[0];
            //This if statement only works when the old member roles are greater than new member roles which means a role got removed
            for (const role of oldMember.roles.cache.map((x) => x.id)) {
              if (!newMember.roles.cache.has(role)) {
                if (newMember.guild.roles.cache.get(role).name == "muted") {
                  return bot.eventEmbed("7ae727", newMember.user, "Member Automatically Unmuted", `**User tag:** ${newMember.user.tag}\n**User ID:** ${newMember.user.id}\n**Unmute Date:** ${new Date()}`, [], `${lchannel.guild.name}`, bot)
                    .then(embed => lchannel.send(embed))
                    .catch(error => console.error(error))
                }
                bot.eventEmbed("006187", newMember.user, "Role Removed from User", `**Role:** ${newMember.guild.roles.cache.get(role)}\n**Name:** \`${newMember.guild.roles.cache.get(role).name}\`\n**ID:** ${newMember.guild.roles.cache.get(role).id}`, [], `${lchannel.guild.name}`, bot)
                  .then(embed => lchannel.send(embed))
                  .catch(error => console.error(error))
              }
            }
          }
  
          //Nickname Change
          if (oldMember.nickname !== newMember.nickname) {
            bot.eventEmbed("006187", newMember.user, "Nickname Changed", `**Old Nickname:** ${oldMember.nickname == null ? oldMember.user.username : oldMember.nickname}\n**New Nickname:** ${newMember.nickname == null ? newMember.user.username : newMember.nickname}`, [], `${lchannel.guild.name}`, bot)
              .then(embed => lchannel.send(embed))
              .catch(error => console.error(error))
          }
  
        }
      }
    }
  };