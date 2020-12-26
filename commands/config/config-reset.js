module.exports = {
  name: "config-reset",
  category: "config",
  description: "Reset all config variables for your server.",
  usage: "",
  example: "",
  permission: "ADMIN",
  run: async (bot, message, args) => {

      const Discord = require("discord.js");
      if (!message.guild) return;
      const fs = require("fs");

      const ownersid = message.guild.ownerID;
      const adminperm = message.member.hasPermission("ADMINISTRATOR");

      //Check if they have required permissions
      if (adminperm != true) {
          return bot.createEmbed("error", "", `Error! You are not the owner or admin of this guild.`, [], `${message.guild.name}`, bot)
              .then((embed) => message.channel.send(embed))
              .catch((error) => bot.log.post("error", error));
      }

      //Confirmation
      bot.createEmbed("warning", "", `Are you sure you would like to reset the config of this server?\n React with :white_check_mark: if you are sure, or :x: to cancel resetting. \nThis will automatically cancel if there isn't a response in 30 seconds.`, [], `${message.guild.name}`, bot)
          .then((embed) => message.channel.send(embed).then((m) => {
              m.react('✅').then(r => {
                  m.react('❌');
              });

              m.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '✅' || reaction.emoji.name == '❌'), {max: 1,time: 30000}).then(collected => { 
                                
                if (collected.first().emoji.name == '✅') {

                    bot.mutils.updateGuildById(message.guild.id, {
                        guild_id: message.guild.id,
                        guild_name: message.guild.name,
                        guild_owner_id: message.guild.owner.id,
                        blacklisted: false,
                        welcomer_enabled: false,
                        welcomer_channel: "0",
                        welcomer_message: "Welcome {user} to {server}!",
                        userjoin_enabled: false,
                        userjoin_role: "0",
                        userjoin_nickname: "None",
                        staff_role: "0",
                        staff_admin: false,
                        staff_linkblock: false,
                        staff_filter: [],
                        staff_autoban: "",
                        logging_enabled: false,
                        logging_channel: "0",
                        logging_level: "medium",
                        tickets_enabled: false,
                        tickets_message: "None",
                        music_enabled: false,
                        levelling_enabled: false
                        });

                    bot.createEmbed("success", "", `Server Config has been reset.`, [], `${message.guild.name}`, bot)
                          .then((embed) => message.channel.send(embed))
                          .catch((error) => bot.log.post("error", error));
                  } 
                if (collected.first().emoji.name == '❌') {
                      message.reply('Reset Cancelled.');
                }
              }).catch(() => {
                  message.reply('No reaction after 30 seconds, reset cancelled');
              });
          }))
          .catch((error) => bot.log.post("error", error));
  },
};