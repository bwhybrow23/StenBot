module.exports = {
  name: "config-reset",
  category: "config",
  description: "Reset all config variables for your server.",
  usage: "sb!config-reset",
  permission: "ADMIN",
  run: (bot, message, args) => {
      const Discord = require("discord.js");
      const fs = require("fs");

      const ownersid = message.guild.ownerID;
      const adminperm = message.member.hasPermission("ADMINISTRATOR");

      //Check if they have required permissions
      if (adminperm != true) {
          return bot.createEmbed("error", "", `Error! You are not the owner or admin of this guild.`, [], `${message.guild.name}`, bot)
              .then((embed) => message.channel.send(embed))
              .catch((error) => console.error(error));
      }

      let defaultContent = {
          welcomerenabled: false,
          welcomerchannel: 0,
          welcomermessage: "Welcome {user} to {server}!",
          userjoinenabled: false,
          userjoinedrole: 0,
          userjoinedname: 0,
          staffrole: false,
          staffadminenabled: false,
          stafflinkblocker: false,
          stafffilter: [],
          staffautoban: 0,
          loggingenabled: false,
          loggingchannel: 0,
          logginglevel: "medium",
          ticketsenabled: false,
          ticketsmsg: 0,
          economyenabled: false,
          economyrobbing: false,
          economypay: true,
          economysymbol: 0,
          musicenabled: false,
          selfroleslist: [],
          levellingenabled: false,
      };

      //Confirmation
      bot.createEmbed("warning", "", `Are you sure you would like to reset the config of this server?\n React with :white_check_mark: if you are sure, or :x: to cancel resetting. \nThis will automatically cancel if there isn't a response in 30 seconds.`, [], `${message.guild.name}`, bot)
          .then((embed) => message.channel.send(embed).then((m) => {
              m.react('✅').then(r => {
                  m.react('❌');
              });

              m.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '✅' || reaction.emoji.name == '❌'), {max: 1,time: 30000}).then(collected => { 
                                
                if (collected.first().emoji.name == '✅') {
                      fs.unlinkSync(`./data/servers/server-${message.guild.id}/serverconfig.json`);
                      fs.writeFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, JSON.stringify(defaultContent, null, 4),
                          (err) => {
                              if (err) return;
                          }
                      );

                      bot.createEmbed("success", "", `Server Config has been reset.`, [], `${message.guild.name}`, bot)
                          .then((embed) => message.channel.send(embed))
                          .catch((error) => console.error(error));
                  } 
                if (collected.first().emoji.name == '❌') {
                      message.reply('Reset Cancelled.');
                }
              }).catch(() => {
                  message.reply('No reaction after 30 seconds, reset cancelled');
              });
          }))
          .catch((error) => console.error(error));
  },
};