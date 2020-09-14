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
          //Fill in place holders
          let themsg = format(config.welcomer_message, {
            user: member.user.tag,
            usermention: member.user,
            userdiscrim: member.user.discriminator,
            server: member.guild.name,
            date: new Date(),
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
  if (config.userjoinenabled == true) {
    //Check if Theres a role set
    if (config.userjoinedrole != 0) {
      //Add the role to the member
      let toaddrole = member.guild.roles.cache.get(config.userjoinedrole);
      member.roles.add(toaddrole).catch();
    }
  }

  //Chek if user names are set
  if (config.userjoinedname != 0) {
    //Changeeee
    member.setNickname(config.userjoinedname).catch();
  }

  if (config.loggingenabled == true) {
    if (config.logginglevel == "low" || config.logginglevel == "medium" || config.logginglevel == "high") {
    if (efunctions.checkChannel(config.loggingchannel, bot) == true) {
      let lchannel = bot.channels.cache.get(config.loggingchannel);
      bot.createEmbed("warning", "", `**Member Joined**\n**User:** ${member.user.tag}\n**User ID:** ${member.id}`, [], `${lchannel.guild.name}`, bot)
              .then(embed => lchannel.send(embed))
              .catch(error => console.error(error))
    }
  }}
};
