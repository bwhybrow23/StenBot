module.exports = async (bot, oldMember, newMember) => {

  const Discord = require("discord.js");
	const efunctions = require("../functions/eventfunctions.js")
	
  let config = efunctions.getConfig(newMember.guild.id)
  if (config.loggingenabled == true) {
    if (config.logginglevel == "high") {
      if (efunctions.checkChannel(config.loggingchannel, bot) == true) {
        let lchannel = bot.channels.get(config.loggingchannel);
        if (oldMember.nickname !== newMember.nickname) {
          lchannel.send({embed: {color: bot.settings.color.yellow, description: `**${newMember.user.username}**'s nickname got changed to **${newMember.nickname == null ? newMember.user.username : newMember.nickname}**\nBefore it was **${oldMember.nickname == null ? oldMember.user.username : oldMember.nickname}**`, footer: {icon_url: newMember.user.avatarURL, text: 'Nickname Changed'}, timestamp: new Date()}})
        } else if (efunctions.compare(oldMember.roles, newMember.roles) !== [] && oldMember.roles.size < newMember.roles.size) {
          let diffarr = efunctions.compare(oldMember.roles, newMember.roles)
          let newrole = diffarr[0]
          //This if statement only works when the old member roles are less than new member roles which means a role got added
          lchannel.send({embed: {color: bot.settings.color.yellow, description: `**${newMember.guild.roles.get(newrole.toString())}** has been added to ${newMember.user}`, footer: {icon_url: newMember.user.avatarURL, text: 'Member role added'}, timestamp: new Date()}})
        } else if (efunctions.compare(oldMember.roles, newMember.roles) !== [] && oldMember.roles.size > newMember.roles.size) {
          let diffarr = efunctions.compare(oldMember.roles, newMember.roles)
          let newrole = diffarr[0]
          //This if statement only works when the old member roles are greater than new member roles which means a role got removed
          lchannel.send({embed: {color: bot.settings.color.yellow, description: `**${newMember.guild.roles.get(newrole.toString())}** has been removed from ${newMember.user}`, footer: {icon_url: newMember.user.avatarURL, text: 'Member role removed'}, timestamp: new Date()}})
        }
      }
    }
  }
};
