module.exports = async (bot, member) => {
  const Discord = require("discord.js");
  const fs = require("fs");
  const config = await bot.mutils.getGuildById(member.guild.id)
  var format = require("string-template");
  const efunctions = require("../functions/eventUtils.js");

  //Welcomer
  //Check if welcomer is enabled
  if (config.welcomer_enabled == true) {
      //Check if there is a channel set
      if (config.welcomer_channel != 0) {
          //Check if channel is valid
          let welcomerschannel = bot.channels.cache.get(config.welcomer_channel);
          if (welcomerschannel != undefined) {
              //Check if the bot has perms to welcome
              let botasmember = member.guild.members.cache.get(bot.user.id);
              if (
                  botasmember.permissionsIn(member.guild.channels.cache.get("" + config.welcomer_channel + "")).has("SEND_MESSAGES") == true
              ) {
                  //Get the current time
                  const date = new Date();
                  //Convert to a readable format
                  const dFormatter = new Intl.DateTimeFormat("en", {
                      dateStyle: "medium"
                  });
                  const tFormatter = new Intl.DateTimeFormat("en", {
                      timeStyle: "medium"
                  });
                  //Fill in place holders
                  let themsg = format(config.welcomer_message, {
                      user: member.user.tag,
                      usermention: member.user,
                      username: member.user.name,
                      usertag: member.user.discriminator,
                      server: member.guild.name,
                      date: dFormatter.format(date),
                      time: tFormatter.format(date),
                      posInMemberCount: member.guild.memberCount,
                      posInUserCount: member.guild.members.cache.filter(member => !member.user.bot).size
                  });

                  let welcomeEmbed = new Discord.MessageEmbed()
                      .setColor(bot.settings.color.yellow)
                      .setDescription(themsg);

                  //Send the message.
                  bot.channels.cache.get(config.welcomer_channel).send(welcomeEmbed);
              }
          }
      }
  }

  //Check if user settings are enabled
  if (config.userjoin_enabled == true) {
      //Check if Theres a role set
      if (config.userjoin_role != 0) {
          //Add the role to the member
          let toaddrole = member.guild.roles.cache.get(config.userjoin_role);
          member.roles.add(toaddrole).catch();
      }
  }

  //Check if user names are set
  if (config.userjoin_nickname != 0) {
	if(config.userjoin_nickname != "None") {
      //Changeeee
      member.setNickname(config.userjoin_nickname).catch();
  }
}

  if (config.logging_enabled == true) {
      if (config.logging_level == "low" || config.logging_level == "medium" || config.logging_level == "high") {
          if (efunctions.checkChannel(config.loggingchannel, bot) == true) {
              let lchannel = bot.channels.cache.get(config.loggingchannel);
              bot.eventEmbed("c9c600", member.user, "Member Joined", `**Name:** ${member.user.tag}\n**Id:** ${member.id}\n**Created At:** ${member.user.createdAt}`, [], `${lchannel.guild.name}`, bot)
                  .then(embed => lchannel.send(embed))
                  .catch(error => console.error(error))
          }
      }
  }

};